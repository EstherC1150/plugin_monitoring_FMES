/**
 * FEMS Total Management System - Hierarchical Navigation Version (Deploy Mode)
 * This entry point uses static imports for bundling support.
 */

import { WindowManager } from "./utils/WindowManager.js";
import { menuConfig, sidebarItems } from "./config/menuConfig.js";
import { renderExternalShell, SHELL_STYLES } from "./components/layout/ExternalShell.js";
import { renderOverviewPage } from "./components/pages/OverviewPage.js";
import { renderNoticePage } from "./components/pages/NoticePage.js";
import { renderEnergyPage } from "./components/pages/EnergyPage.js";
import { log } from "./utils/Logger.js";
import { initializePlugin } from "./core.js";

/**
 * @param {import("./index.js").RunParams} params
 * @returns {Promise<() => void> | (() => void)}
 */
export function Run(params) {
    // Map component strings to actual functions
    const componentsMap = {
        renderOverviewPage,
        renderNoticePage,
        renderEnergyPage,
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
