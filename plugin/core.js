/**
 * Core Plugin Logic
 * This file contains the shared logic for both development and production modes.
 */

export function initializePlugin(params, deps) {
    const { 
        WindowManager, 
        menuConfig, 
        sidebarItems, 
        renderExternalShell, 
        SHELL_STYLES, 
        componentsMap, 
        log 
    } = deps;

    let currentState = {
        sidebarItems,
        currentMainId: "dashboard",
        currentSubTabs: menuConfig.dashboard.subTabs,
        currentSubId: menuConfig.dashboard.defaultTab,
        mainTitle: menuConfig.dashboard.title
    };

    const hintId = "FEMS_External_Hint_Board";
    params.element.innerHTML = `
        <div id="${hintId}" style="background: white; color: #1D3A6F; padding: 15px 25px; border-radius: 12px; font-weight: 600; 
                    position: absolute; left: 50px; top: 60px; border: 2px solid #0072CE; 
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 1000; display: flex; align-items: center; gap: 12px; pointer-events: none;">
            <div style="width:10px; height:10px; border-radius:50%; background:#00C7B1;"></div>
            <span>FEMS 통합 관제 시스템이 새 창에서 실행 중입니다.</span>
        </div>
    `;

    const winManager = new WindowManager({
        onClose: () => {
            log("Dashboard window closed.");
            params.pluginParams.close(); 
        }
    });

    const popup = winManager.open();
    let clockTimer = null;
    if (popup) {
        initUI();
        startClock();
    }

    function initUI() {
        const shellHtml = renderExternalShell(currentState);
        winManager.injectTemplate(shellHtml, SHELL_STYLES);
        renderPage();
        bindEvents();
    }

    function renderPage() {
        const config = menuConfig[currentState.currentMainId];
        if (!config) return;
        const tab = config.subTabs.find(t => t.id === currentState.currentSubId);
        const rendererName = tab ? tab.component : config.subTabs[0].component;
        
        const contentViewport = popup.document.getElementById("ContentViewport");
        if (contentViewport) {
            const renderer = componentsMap[rendererName];
            if (typeof renderer === "function") {
                contentViewport.innerHTML = renderer();
            } else {
                contentViewport.innerHTML = `<div style="padding:50px; text-align:center; color:#999;">Renderer [${rendererName}] not found.</div>`;
            }
        }
    }

    function bindEvents() {
        const sideNav = popup.document.getElementById("MainSideNav");
        if (sideNav) {
            sideNav.addEventListener("click", (e) => {
                const icon = e.target.closest(".sidebar-icon");
                if (icon) {
                    const mainId = icon.getAttribute("data-main-id");
                    switchMainCategory(mainId);
                }
            });
        }

        const tabList = popup.document.getElementById("SubTabBar");
        if (tabList) {
            tabList.addEventListener("click", (e) => {
                const tab = e.target.closest(".sub-tab");
                if (tab) {
                    const subId = tab.getAttribute("data-sub-id");
                    switchSubTab(subId);
                }
            });
        }

        const searchButton = popup.document.getElementById("DashboardSearchButton");
        if (searchButton) {
            searchButton.addEventListener("click", () => requestRefresh("search_button"));
        }

        const headerRefreshButton = popup.document.getElementById("HeaderRefreshButton");
        if (headerRefreshButton) {
            headerRefreshButton.addEventListener("click", () => requestRefresh("header_refresh"));
        }
    }

    function requestRefresh(source) {
        if (!popup || popup.closed) return;
        const icon = popup.document.querySelector("#HeaderRefreshButton .header-icon");
        if (icon) icon.classList.add("spin");

        updateHeaderClock();
        setDefaultDateFilter();

        const site = popup.document.getElementById("SiteFilterSelect")?.value || "all";
        const date = popup.document.getElementById("DateFilterInput")?.value || "";

        log("Dashboard refresh requested", { source, site, date, tab: currentState.currentSubId });
        renderPage();

        if (icon) setTimeout(() => icon.classList.remove("spin"), 700);
    }

    function formatCurrentKst() {
        const now = new Date();
        const datePart = now.toLocaleDateString("ko-KR", {
            year: "numeric", month: "2-digit", day: "2-digit"
        }).replace(/\.$/, "").replace(/\.\s/g, "-").replace(/\./g, "");
        const timePart = now.toLocaleTimeString("ko-KR", { hour12: false });
        return `${datePart} ${timePart} 기준`;
    }

    function updateHeaderClock() {
        if (!popup || popup.closed) return;
        const clockEl = popup.document.getElementById("CurrentDateTime");
        if (clockEl) clockEl.textContent = formatCurrentKst();
    }

    function setDefaultDateFilter() {
        const dateInput = popup.document.getElementById("DateFilterInput");
        if (!dateInput || dateInput.value) return;
        const now = new Date();
        const y = now.getFullYear();
        const m = `${now.getMonth() + 1}`.padStart(2, "0");
        const d = `${now.getDate()}`.padStart(2, "0");
        dateInput.value = `${y}-${m}-${d}`;
    }

    function clearClockTimer() {
        if (!clockTimer) return;
        try {
            if (popup && !popup.closed) popup.clearInterval(clockTimer);
            else clearInterval(clockTimer);
        } catch (_) {
            try { clearInterval(clockTimer); } catch (_) { /* noop */ }
        }
        clockTimer = null;
    }

    function startClock() {
        if (!popup || popup.closed) return;
        updateHeaderClock();
        setDefaultDateFilter();
        clearClockTimer();
        clockTimer = popup.setInterval(() => {
            updateHeaderClock();
            setDefaultDateFilter();
        }, 1000);
    }

    function switchMainCategory(mainId) {
        if (currentState.currentMainId === mainId) return;
        const config = menuConfig[mainId];
        if (!config) return;

        currentState.currentMainId = mainId;
        currentState.currentSubTabs = config.subTabs;
        currentState.currentSubId = config.defaultTab;
        currentState.mainTitle = config.title;

        initUI();
        log(`Switched to Main Category: ${config.title}`);
    }

    function switchSubTab(subId) {
        if (currentState.currentSubId === subId) return;
        currentState.currentSubId = subId;
        
        const tabs = popup.document.querySelectorAll(".sub-tab");
        tabs.forEach(t => {
            t.classList.toggle("active", t.getAttribute("data-sub-id") === subId);
        });

        renderPage();
        log(`Switched to Sub Tab: ${subId}`);
    }

    return () => {
        log("Disposing FEMS Plugin Core.");
        clearClockTimer();
        const hint = params.element.querySelector(`#${hintId}`);
        if (hint) hint.remove();
    };
}
