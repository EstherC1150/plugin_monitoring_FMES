/**
 * FEMS Dashboard Menu Configuration
 * This central map defines the sidebar icons and their associated sub-tabs.
 */

export const menuConfig = {
  dashboard: {
    id: "dashboard",
    title: "안녕 모니터링",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11.5L12 4l9 7.5"></path><path d="M5.5 10.5V20h13V10.5"></path></svg>`,
    subTabs: [
      { id: "overview", title: "종합 현황", component: "renderOverviewPage" },
      { id: "notice", title: "공지사항", component: "renderNoticePage" },
    ],
    defaultTab: "overview",
  },
  energy: {
    id: "energy",
    title: "에너지 모니터링",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
    subTabs: [
      { id: "electricity", title: "전력 분석", component: "renderEnergyPage" },
      { id: "lng", title: "LNG 통계", component: "renderEnergyPage" },
    ],
    defaultTab: "electricity",
  },
};

export const sidebarItems = Object.values(menuConfig);
