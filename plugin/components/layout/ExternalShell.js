/**
 * High-fidelity External Shell for the Dashboard.
 * Includes root styles and a simplified 1:1 structure.
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
    }

    .sidebar-icon {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background: rgba(255,255,255,0.15);
        border-radius: 10px;
        cursor: pointer;
    }

    /* 메인 컨테이너 */
    .main-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .top-header {
        height: 60px;
        background: white;
        padding: 0 25px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--border-color);
    }

    .main-category-name {
        font-size: 18px;
        font-weight: 700;
        color: var(--hyundai-navy);
    }

    .sub-tab-bar {
        height: 45px;
        background: white;
        padding: 0 25px;
        display: flex;
        gap: 35px;
        border-bottom: 1px solid var(--border-color);
    }

    .sub-tab {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        color: var(--hyundai-navy);
        position: relative;
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

export function renderExternalShell() {
    return `
        <div id="PluginDashboardContainer">
            <!-- 사이드바: 교육용으로 아이콘 하나만 배치 -->
            <div class="sidebar">
                <div class="sidebar-icon active" title="종합 모니터링">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                </div>
            </div>

            <!-- 메인 영역 -->
            <div class="main-wrapper">
                <div class="top-header">
                    <div class="main-category-name">FEMS 통합 관제 시스템</div>
                </div>
                
                <!-- 상단 탭: 교육용으로 탭 하나만 배치 -->
                <div class="sub-tab-bar">
                    <div class="sub-tab active">종합 현황</div>
                </div>

                <div class="content-viewport" id="ContentViewport">
                    <!-- 페이지 컨텐츠 주입 영역 -->
                </div>
            </div>
        </div>
    `;
}
