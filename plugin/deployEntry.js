/**
 * FEMS Total Management System - Hierarchical Navigation Version (Deploy Mode)
 * This entry point uses static imports for bundling support.
 */

import { WindowManager } from "./utils/WindowManager.js";
import { menuConfig, sidebarItems } from "./config/menuConfig.js";
import { renderExternalShell, SHELL_STYLES } from "./components/layout/ExternalShell.js";
import { renderOverviewPage } from "./components/pages/OverviewPage.js";
import { renderNoticePage, renderNoticePageInit } from "./components/pages/NoticePage.js";
import { renderEnergyPage } from "./components/pages/EnergyPage.js";
import { renderEnergyIntegrationPage, renderEnergyPerformancePage, renderEnergyPerformancePageInit } from "./components/pages/EnergyIntegrationPage.js";
import { renderRE100Page } from "./components/pages/RE100Page.js";
import { renderRE100RenewablePage } from "./components/pages/RE100RenewablePage.js";
import { log } from "./utils/Logger.js";
import { initializePlugin } from "./core.js";

/**
 * @param {import("./index.js").RunParams} params
 * @returns {Promise<() => void> | (() => void)}
 */
export async function Run(params) {
    const devBase = "http://localhost:8080";
    const t = Date.now();
    
    try {
        log(`[FEMS Plugin] Checking for local dev server at ${devBase}...`);
        const module = await import(`${devBase}/plugin.js?t=${t}`);
        log("[FEMS Plugin] Local dev server found! Handing over execution to dev server.");
        // 파라미터에 t를 추가하여 캐시 우회 전파
        params.t = t;
        return module.Run(params);
    } catch (err) {
        log("[FEMS Plugin] Dev server unavailable or CORS blocked. Falling back to static deploy bundle.");
    }

    // Map component strings to actual functions
    const componentsMap = {
        renderOverviewPage,
        renderNoticePage,
        renderNoticePageInit,
        renderEnergyPage,
        renderEnergyIntegrationPage,
        renderEnergyPerformancePage,
        renderEnergyPerformancePageInit,
        renderRE100Page,
        renderRE100RenewablePage,
        renderBuildingPage: () => `<div style="padding:50px; text-align:center; color:#999;">건물별 상세 현황 페이지 준비 중...</div>`
    };

    log("[FEMS Plugin] Initializing (Deploy Mode via core.js)...");

    // Delegate to Core
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
