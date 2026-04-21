/**
 * FEMS Total Management System - Hierarchical Navigation Version (Development Mode)
 * This entry point uses dynamic imports for hot-ish reload support.
 */

export async function Run(params) {
    const t = params.t || Date.now();
    
    const isDevServer =
        typeof import.meta !== "undefined" &&
        typeof import.meta.url === "string" &&
        import.meta.url.startsWith("http://localhost:8080/");
    const cacheBust = isDevServer ? `?t=${t}` : "";

    // 1. Dynamic Imports
    const { WindowManager } = await import(`./utils/WindowManager.js${cacheBust}`);
    const { menuConfig, sidebarItems } = await import(`./config/menuConfig.js${cacheBust}`);
    const { renderExternalShell, SHELL_STYLES } = await import(`./components/layout/ExternalShell.js${cacheBust}`);
    const { renderOverviewPage } = await import(`./components/pages/OverviewPage.js${cacheBust}`);
    const { renderNoticePage } = await import(`./components/pages/NoticePage.js${cacheBust}`);
    const { renderEnergyPage } = await import(`./components/pages/EnergyPage.js${cacheBust}`);
    const { log } = await import(`./utils/Logger.js${cacheBust}`);
    const { initializePlugin } = await import(`./core.js${cacheBust}`);

    // Map component strings to actual functions
    const componentsMap = {
        renderOverviewPage,
        renderNoticePage,
        renderEnergyPage,
        renderBuildingPage: () => `<div style="padding:50px; text-align:center; color:#999;">건물별 상세 현황 페이지 준비 중...</div>`
    };

    console.log("[FEMS Plugin] Initializing (Dev Mode via core.js)...");

    // 2. Delegate to Core
    return initializePlugin(params, {
        WindowManager,
        menuConfig,
        sidebarItems,
        renderExternalShell,
        SHELL_STYLES,
        componentsMap,
        log
    });
}
