/**
 * FEMS Dashboard Menu Configuration
 * This central map defines the sidebar icons and their associated sub-tabs.
 */

export const menuConfig = {
  dashboard: {
    id: "dashboard",
    title: "FEMS 모니터링",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11.5L12 4l9 7.5"></path><path d="M5.5 10.5V20h13V10.5"></path></svg>`,
    subTabs: [
      { id: "overview", title: "종합 현황", component: "renderOverviewPage" },
      { id: "notice", title: "공지사항", component: "renderNoticePage" },
    ],
    defaultTab: "overview",
  },
  re100: {
    id: "re100",
    title: "RE100",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c-.6 0-3 3.4-3 7s1 5.3 3 8c2-2.7 3-4.4 3-8s-2.4-7-3-7z"></path><path d="M12 17v5"></path><path d="M12 12c-2.8 0-5 1.5-5 3 0 1.5 2.2 3 5 3"></path></svg>`,
    subTabs: [
      { id: "re100_status", title: "RE100 이행", component: "renderRE100Page" },
      { id: "re100_renewable", title: "재생에너지 사용량", component: "renderRE100RenewablePage" }
    ],
    defaultTab: "re100_status",
  },
  energy: {
    id: "energy",
    title: "에너지 모니터링",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
    subTabs: [
      { id: "energy_integration", title: "통합", component: "renderEnergyIntegrationPage" },
      { id: "energy_performance", title: "실적관리", component: "renderEnergyPerformancePage" }
    ],
    defaultTab: "energy_integration",
  },
};

export const sidebarItems = Object.values(menuConfig);
