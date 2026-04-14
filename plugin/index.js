/**
 * @typedef {import("cesium")} Cesium
 * @typedef {import("bruce-models")} BModels
 * @typedef {import("bruce-cesium")} BEngine
 * @typedef {import("cesium").Viewer} Viewer
 * @typedef {import("bruce-cesium").MenuItemManager.Manager} Manager
 * @typedef {import("bruce-cesium").VisualsRegister.Register} Register
 */

/**
 * @typedef {{
*     Cesium: Cesium,
*     BModels: BModels,
*     BEngine: BEngine,
*     viewer: Viewer,
*     manager: Manager,
*     visualRegister: Register,
*     close: () => void,
*     select: (params: { entityIds: string[] }) => void
* }} PluginParams
*/

/**
* @typedef {{
*     element: HTMLElement,
*     container: HTMLElement,
*     pluginParams: PluginParams,
*     t: number
* }} RunParams
*/

const DEV_SERVER_BASE_URL = "http://localhost:8080";

/**
* @param {RunParams} params
* @returns {() => void}
*/
function Run(params) {
    console.log("[Loader] Initializing Anti-Cache Dynamic Loading...");

    let remoteDispose = null;
    let isDisposed = false;
    const t = Date.now();
    params.t = t; // Pass timestamp to the remote script

    // 1. Fetch and Inject HTML/CSS
    fetch(`${DEV_SERVER_BASE_URL}/index.html?t=${t}`)
        .then(response => response.text())
        .then(html => {
            if (isDisposed) return;
            console.log("[Loader] HTML structure loaded.");
            params.element.innerHTML = html;

            // 2. Load the Remote JS Logic
            return import(`${DEV_SERVER_BASE_URL}/plugin.js?t=${t}`);
        })
        .then(module => {
            if (isDisposed || !module) return;
            console.log("[Loader] Remote script loaded. Initializing logic...");
            
            // Call Run. It might be async now.
            const result = module.Run(params);
            
            if (result instanceof Promise) {
                result.then(dispose => {
                    if (isDisposed) dispose?.();
                    else remoteDispose = dispose;
                });
            } else {
                remoteDispose = result;
            }
        })
        .catch(err => {
            console.error("[Loader] Failed to load remote resources. Is serve.py running?", err);
            params.element.innerHTML = `
                <div style="color: red; padding: 10px; background: white; border: 2px solid red; border-radius: 8px;">
                    <strong style="display: block; margin-bottom: 5px;">[Loader Connection Error]</strong>
                    <div style="font-size: 11px;">
                        Failed to fetch from <code style="background: #eee;">${DEV_SERVER_BASE_URL}</code><br/><br/>
                        1. Run <b>py serve.py</b> in terminal.<br/>
                        2. Check Browser Console (F12) for CORS/Mixed Content issues.
                    </div>
                </div>
            `;
        });

    // Return the wrapper dispose function
    return () => {
        console.log("[Loader] Disposing loader.");
        isDisposed = true;
        if (remoteDispose) {
            remoteDispose();
        } else {
            if (params.element?.parentElement) {
                params.element.parentElement.removeChild(params.element);
            }
        }
    };
}