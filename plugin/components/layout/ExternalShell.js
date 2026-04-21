/**
 * High-fidelity External Shell for the Dashboard.
 * Now dynamic and data-driven for hierarchical navigation.
 */

export const SHELL_STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700&display=swap');

    :root {
        --hyundai-navy: #1D3A6F;
        --hyundai-blue: #002C5F;
        --accent-blue: #0072CE;
        --accent-green: #00C7B1;
        --bg-main: #F4F7FA;
        --bg-card: #FFFFFF;
        --text-main: #1A1A1A;
        --text-secondary: #555555;
        --border-color: #E6E9EF;
    }

    body {
        margin: 0;
        padding: 0;
        background: var(--bg-main);
        font-family: 'Pretendard', sans-serif;
        color: var(--text-main);
    }

    #PluginDashboardContainer {
        width: 100vw;
        height: 100vh;
        display: flex;
    }

    /* 사이드바 */
    .sidebar {
        width: 70px;
        background: var(--hyundai-navy);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px 0;
        flex-shrink: 0;
    }

    .sidebar-icon {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255,255,255,0.4);
        border-radius: 10px;
        cursor: pointer;
        margin-bottom: 20px;
        transition: all 0.2s;
    }

    .sidebar-icon.active {
        color: white;
        background: rgba(255,255,255,0.15);
    }

    .sidebar-icon:hover {
        color: white;
    }

    /* 메인 컨테이너 */
    .main-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
    }

    .top-header {
        height: 60px;
        background: white;
        padding: 0 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-color);
    }

    .main-category-name {
        font-size: 18px;
        font-weight: 700;
        color: var(--hyundai-navy);
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .header-icon-button {
        width: 34px;
        height: 34px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        border: 1px solid var(--border-color);
        background: #fff;
        color: #6b7280;
        cursor: pointer;
        transition: background 0.15s, color 0.15s, border-color 0.15s;
    }

    .header-icon-button:hover {
        background: #f8fafc;
        color: #374151;
        border-color: #d2d8e2;
    }

    .header-icon {
        width: 18px;
        height: 18px;
        display: block;
    }

    .header-icon.spin {
        animation: headerIconSpin 0.7s linear infinite;
    }

    @keyframes headerIconSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .header-time {
        font-size: 14px;
        font-weight: 500;
        color: #6b7280;
    }

    .sub-tab-bar {
        height: 45px;
        background: white;
        padding: 0 25px;
        display: flex;
        gap: 35px;
        border-bottom: 1px solid var(--border-color);
    }

    .dashboard-filter-bar {
        min-height: 58px;
        background: white;
        border-bottom: 1px solid var(--border-color);
        padding: 10px 25px;
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    .filter-input {
        height: 38px;
        border: 1px solid #d2d8e2;
        border-radius: 19px;
        font-size: 14px;
        color: var(--text-main);
        padding: 0 14px;
        background: #fff;
    }

    select.filter-input {
        min-width: 170px;
    }

    .filter-input[type="date"] {
        min-width: 150px;
    }

    .filter-search-button {
        height: 38px;
        min-width: 76px;
        border: none;
        border-radius: 19px;
        background: var(--hyundai-blue);
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        padding: 0 18px;
    }

    .sub-tab {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        color: #888;
        cursor: pointer;
        position: relative;
        transition: color 0.2s;
    }

    .sub-tab.active {
        color: var(--hyundai-navy);
    }

    .sub-tab.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--accent-green);
        border-radius: 3px 3px 0 0;
    }

    .content-viewport {
        flex: 1;
        padding: 25px;
        overflow-y: auto;
    }
`;

export function renderExternalShell(state) {
    const { sidebarItems, currentMainId, currentSubTabs, currentSubId, mainTitle } = state;

    // Sidebar HTML
    const sidebarHtml = sidebarItems.map(item => `
        <div class="sidebar-icon ${item.id === currentMainId ? 'active' : ''}" 
             data-main-id="${item.id}" title="${item.title}">
            ${item.icon}
        </div>
    `).join("");

    // Sub Tabs HTML
    const tabsHtml = currentSubTabs.map(tab => `
        <div class="sub-tab ${tab.id === currentSubId ? 'active' : ''}" 
             data-sub-id="${tab.id}">
            ${tab.title}
        </div>
    `).join("");

    return `
        <div id="PluginDashboardContainer">
            <div class="sidebar" id="MainSideNav">
                ${sidebarHtml}
            </div>

            <div class="main-wrapper">
                <div class="top-header">
                    <div class="main-category-name" id="MainCategoryTitle">${mainTitle}</div>
                    <div class="header-right">
                        <button class="header-icon-button" id="HeaderRefreshButton" title="최신 기준으로 새로고침">
                            <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 12a9 9 0 1 1-2.64-6.36"></path>
                                <path d="M21 3v6h-6"></path>
                            </svg>
                        </button>
                        <div class="header-time" id="CurrentDateTime">--:--:-- 기준</div>
                    </div>
                </div>
                
                <div class="sub-tab-bar" id="SubTabBar">
                    ${tabsHtml}
                </div>

                <div class="dashboard-filter-bar" id="DashboardFilterBar">
                    <select class="filter-input" id="SiteFilterSelect">
                        <option value="all">전체 사업장</option>
                        <option value="ulsan">울산 사업장</option>
                        <option value="seosan">서산 사업장</option>
                        <option value="seongnam">성남 사업장</option>
                    </select>
                    <input class="filter-input" id="DateFilterInput" type="date" />
                    <button class="filter-search-button" id="DashboardSearchButton">조회</button>
                </div>

                <div class="content-viewport" id="ContentViewport">
                    <!-- 페이지 컨텐츠 주입 영역 -->
                </div>
            </div>
        </div>
    `;
}
