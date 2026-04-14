/**
 * FEMS Total Management System - Secondary Window Version
 */

/**
* @param {import("../index.js").RunParams} params
* @returns {Promise<() => void>}
*/
export async function Run(params) {
    const t = params.t || Date.now();
    console.log("[FEMS Plugin] Launching External Dashboard...");

    // 1. Dynamic Imports
    const { WindowManager } = await import(`./utils/WindowManager.js?t=${t}`);
    const { renderExternalShell, SHELL_STYLES } = await import(`./components/layout/ExternalShell.js?t=${t}`);
    const { renderOverviewPage } = await import(`./components/pages/OverviewPage.js?t=${t}`);
    const { log } = await import(`./utils/Logger.js?t=${t}`);

    // 2. Main Window Hint UI
    const hintId = "FEMS_External_Hint_Board";
    params.element.innerHTML = `
        <div id="${hintId}" style="background: white; color: #1D3A6F; padding: 15px 25px; border-radius: 12px; font-weight: 600; 
                    position: absolute; left: 50px; top: 60px; border: 2px solid #0072CE; 
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 1000; display: flex; align-items: center; gap: 12px; pointer-events: none;">
            <div style="width:10px; height:10px; border-radius:50%; background:#00C7B1;"></div>
            <span>FEMS 통합 관제 시스템이 새 창에서 실행 중입니다.</span>
        </div>
    `;

    // 3. Launch Secondary Window
    const winManager = new WindowManager({
        onClose: () => {
            log("Dashboard window closure detected.");
            // Notify the Navigator to deactivate the tool icon
            params.pluginParams.close(); 
        }
    });

    const popup = winManager.open();
    if (popup) {
        // Construct the modular UI inside the new window
        const shellHtml = renderExternalShell();
        winManager.injectTemplate(shellHtml, SHELL_STYLES);

        // Inject the default page
        const contentViewport = popup.document.getElementById("ContentViewport");
        if (contentViewport) {
            contentViewport.innerHTML = renderOverviewPage();
        }
        
        log("External Dashboard synchronized.");
    }

    // Return dispose function (triggered by Navigator when tool is deactivated)
    return () => {
        log("Disposing FEMS Plugin and cleaning up UI.");
        
        // Remove the hint UI from the main viewer
        const hint = params.element.querySelector(`#${hintId}`);
        if (hint) {
            hint.remove();
        }

        // Optional: Close the window if we WANT it to close on deactivation
        // winManager.close(); 
    };
}
