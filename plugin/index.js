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
 *     t: number,
 *     devServerBaseUrl?: string
 * }} RunParams
 */

const DEFAULT_DEV_SERVER_BASE_URL = "http://localhost:8080";

function log(message, data) {
  const timestamp = new Date().toLocaleTimeString();
  if (data) console.log(`[PluginLoader ${timestamp}] ${message}:`, data);
  else console.log(`[PluginLoader ${timestamp}] ${message}`);
}

function getDevServerBaseUrl(params) {
  const fromParams = params && params.devServerBaseUrl;
  if (typeof fromParams === "string" && fromParams.trim()) {
    return fromParams.replace(/\/$/, "");
  }
  const g = typeof globalThis !== "undefined" && globalThis.__FEMS_DEV_SERVER__;
  if (typeof g === "string" && g.trim()) {
    return g.replace(/\/$/, "");
  }
  return DEFAULT_DEV_SERVER_BASE_URL;
}

/**
 * 개발 서버 또는 로컬 번들에서 플러그인을 동적으로 메모리에 로드합니다.
 */
async function loadPluginModule(params) {
  const t = Date.now();
  const devBase = getDevServerBaseUrl(params);
  
  // 1. 개발 서버 시도 (타임스탬프로 강력한 캐시 방지)
  try {
    log(`Attempting to load from dev server: ${devBase}`);
    const module = await import(`${devBase}/plugin.js?t=${t}`);
    log("Successfully loaded from dev server.");
    return { module, mode: "development" };
  } catch (devErr) {
    log("Dev server unavailable, trying local fallback bundle...");
  }

  // 2. 로컬 고정 번들 시도 (npm run build 로 생성된 파일)
  try {
    // NextSpace 호스트에서 index.js 위치를 기준으로 상대 경로 계산 시도
    // 보통 import.meta.url이 지원되지 않는 레거시 환경일 수 있으므로 
    // 호스트가 제공하는 경로 규칙에 맞춰 ./dist/index.bundle.js 를 시도합니다.
    const module = await import(`./dist/index.bundle.js?t=${t}`);
    log("Successfully loaded from local fallback bundle.");
    return { module, mode: "standalone" };
  } catch (localErr) {
    console.error("[PluginLoader] All load attempts failed.", localErr);
    throw localErr;
  }
}

/**
 * NextSpace 메인 엔트리 포인트
 * @param {RunParams} params
 */
function Run(params) {
  log("Initializing Hybrid Loader...");
  
  let currentDispose = null;
  let isDisposed = false;

  (async () => {
    try {
      const { module, mode } = await loadPluginModule(params);
      if (isDisposed) return;

      const result = module.Run(params);
      if (result instanceof Promise) {
        currentDispose = await result;
      } else {
        currentDispose = result;
      }
      
      if (isDisposed && typeof currentDispose === "function") {
        currentDispose();
      }
    } catch (err) {
      params.element.innerHTML = `
        <div style="color: #1D3A6F; padding: 20px; background: white; border: 2px solid #0072CE; border-radius: 12px; font-family: sans-serif;">
          <strong style="display: block; margin-bottom: 10px; color: #d32f2f;">[FEMS Plugin Load Error]</strong>
          <div style="font-size: 13px; line-height: 1.6;">
            플러그인을 불러오지 못했습니다.<br/>
            - 개발 중: <b>py serve.py</b> 실행 확인<br/>
            - 미사용/오프라인: <b>npm run build</b> 실행 확인<br/><br/>
            <small style="color: #666;">Error: ${err.message}</small>
          </div>
        </div>
      `;
    }
  })();

  return () => {
    log("Disposing loader.");
    isDisposed = true;
    if (typeof currentDispose === "function") {
      currentDispose();
    }
  };
}

// Global scope export for NextSpace host
if (typeof window !== "undefined") {
  window.FemsPlugin = { Run };
}

export { Run };
