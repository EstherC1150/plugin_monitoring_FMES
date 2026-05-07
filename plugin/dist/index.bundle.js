// plugin/utils/WindowManager.js
var WindowManager = class {
  constructor(options) {
    this.popup = null;
    this.options = options;
    this.popupName = "Hyundai_Transys_FEMS_Dashboard";
    this.checkInterval = null;
  }
  open() {
    if (this.popup && !this.popup.closed) {
      this.popup.focus();
      return this.popup;
    }
    const width = 1280;
    const height = 920;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    this.popup = window.open(
      "",
      this.popupName,
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes`
    );
    if (!this.popup) {
      alert("\uD31D\uC5C5\uCC3D\uC774 \uCC28\uB2E8\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD31D\uC5C5 \uD5C8\uC6A9\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
      return null;
    }
    this.startClosePolling();
    return this.popup;
  }
  startClosePolling() {
    if (this.checkInterval) clearInterval(this.checkInterval);
    this.checkInterval = setInterval(() => {
      if (this.popup && this.popup.closed) {
        clearInterval(this.checkInterval);
        if (this.options.onClose) this.options.onClose();
      }
    }, 1e3);
  }
  injectTemplate(templateHtml, styles) {
    if (!this.popup) return;
    const doc = this.popup.document;
    doc.open();
    doc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>HYUNDAI TRANSYS FEMS DASHBOARD</title>
                <style>${styles}</style>
            </head>
            <body style="margin:0; padding:0; overflow:hidden; background:#F4F7FA;">
                ${templateHtml}
            </body>
            </html>
        `);
    doc.close();
    this.popup.onbeforeunload = () => {
      if (this.options.onClose) this.options.onClose();
    };
  }
  close() {
    if (this.checkInterval) clearInterval(this.checkInterval);
    if (this.popup && !this.popup.closed) {
      this.popup.close();
    }
  }
};

// plugin/config/menuConfig.js
var menuConfig = {
  dashboard: {
    id: "dashboard",
    title: "\uC548\uB155 \uBAA8\uB2C8\uD130\uB9C1",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11.5L12 4l9 7.5"></path><path d="M5.5 10.5V20h13V10.5"></path></svg>`,
    subTabs: [
      { id: "overview", title: "\uC885\uD569 \uD604\uD669", component: "renderOverviewPage" },
      { id: "notice", title: "\uACF5\uC9C0\uC0AC\uD56D", component: "renderNoticePage" }
    ],
    defaultTab: "overview"
  },
  energy: {
    id: "energy",
    title: "\uC5D0\uB108\uC9C0 \uBAA8\uB2C8\uD130\uB9C1",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
    subTabs: [
      { id: "electricity", title: "\uC804\uB825 \uBD84\uC11D", component: "renderEnergyPage" },
      { id: "lng", title: "LNG \uD1B5\uACC4", component: "renderEnergyPage" }
    ],
    defaultTab: "electricity"
  }
};
var sidebarItems = Object.values(menuConfig);

// plugin/components/layout/ExternalShell.js
var SHELL_STYLES = `
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

    /* \uC0AC\uC774\uB4DC\uBC14 */
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

    /* \uBA54\uC778 \uCEE8\uD14C\uC774\uB108 */
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
function renderExternalShell(state) {
  const { sidebarItems: sidebarItems2, currentMainId, currentSubTabs, currentSubId, mainTitle } = state;
  const sidebarHtml = sidebarItems2.map((item) => `
        <div class="sidebar-icon ${item.id === currentMainId ? "active" : ""}" 
             data-main-id="${item.id}" title="${item.title}">
            ${item.icon}
        </div>
    `).join("");
  const tabsHtml = currentSubTabs.map((tab) => `
        <div class="sub-tab ${tab.id === currentSubId ? "active" : ""}" 
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
                        <button class="header-icon-button" id="HeaderRefreshButton" title="\uCD5C\uC2E0 \uAE30\uC900\uC73C\uB85C \uC0C8\uB85C\uACE0\uCE68">
                            <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 12a9 9 0 1 1-2.64-6.36"></path>
                                <path d="M21 3v6h-6"></path>
                            </svg>
                        </button>
                        <div class="header-time" id="CurrentDateTime">--:--:-- \uAE30\uC900</div>
                    </div>
                </div>
                
                <div class="sub-tab-bar" id="SubTabBar">
                    ${tabsHtml}
                </div>

                <div class="dashboard-filter-bar" id="DashboardFilterBar">
                    <select class="filter-input" id="SiteFilterSelect">
                        <option value="all">\uC804\uCCB4 \uC0AC\uC5C5\uC7A5</option>
                        <option value="ulsan">\uC6B8\uC0B0 \uC0AC\uC5C5\uC7A5</option>
                        <option value="seosan">\uC11C\uC0B0 \uC0AC\uC5C5\uC7A5</option>
                        <option value="seongnam">\uC131\uB0A8 \uC0AC\uC5C5\uC7A5</option>
                    </select>
                    <input class="filter-input" id="DateFilterInput" type="date" />
                    <button class="filter-search-button" id="DashboardSearchButton">\uC870\uD68C</button>
                </div>

                <div class="content-viewport" id="ContentViewport">
                    <!-- \uD398\uC774\uC9C0 \uCEE8\uD150\uCE20 \uC8FC\uC785 \uC601\uC5ED -->
                </div>
            </div>
        </div>
    `;
}

// plugin/components/pages/OverviewPage.js
var PAGE_STYLES = `
    .overview-page {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    .card-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
    }

    .panel {
        background: white;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        box-shadow: 0 2px 5px rgba(0,0,0,0.02);
    }

    .stat-card {
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        position: relative;
        overflow: hidden;
    }

    .stat-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        font-size: 13px;
        color: #4b5563;
        font-weight: 600;
    }

    .stat-icon {
        width: 28px;
        height: 28px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
    }

    .stat-value-row {
        display: flex;
        align-items: baseline;
        gap: 6px;
    }

    .stat-value {
        font-size: 30px;
        font-weight: 800;
        color: var(--hyundai-navy);
        letter-spacing: -0.5px;
    }

    .stat-unit {
        font-size: 13px;
        color: #6b7280;
        font-weight: 600;
    }

    .stat-sub {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #6b7280;
    }

    .delta {
        font-weight: 700;
    }

    .delta.up {
        color: #dc2626;
    }

    .delta.down {
        color: #16a34a;
    }

    .content-block {
        padding: 18px 18px;
    }

    .block-title {
        font-size: 14px;
        font-weight: 800;
        color: var(--hyundai-navy);
        margin-bottom: 12px;
    }

    .data-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
    }

    .data-table thead th {
        text-align: left;
        padding: 11px 12px;
        background: #f8fafc;
        color: #4b5563;
        font-weight: 800;
        border-bottom: 1px solid var(--border-color);
    }

    .data-table tbody td {
        padding: 12px 12px;
        border-bottom: 1px solid var(--border-color);
        color: #111827;
    }

    .data-table tbody tr:last-child td {
        border-bottom: none;
    }

    .row-label {
        font-weight: 800;
        color: #0f172a;
    }

    .row-label.emph {
        color: #2563eb;
    }

    .num {
        text-align: right;
        font-variant-numeric: tabular-nums;
    }

    .chart-wrap {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .chart-subtitle {
        font-size: 12px;
        color: #6b7280;
        font-weight: 600;
        margin-top: -6px;
    }

    .chart-card {
        border-radius: 12px;
        border: 1px solid var(--border-color);
        background: #fff;
        padding: 12px 12px 10px 12px;
    }

    .legend {
        display: flex;
        align-items: center;
        gap: 14px;
        justify-content: flex-end;
        font-size: 12px;
        color: #4b5563;
        font-weight: 700;
        margin-bottom: 6px;
    }

    .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .legend-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
    }

    .legend-dot.weekday {
        background: #1f4c8f;
    }

    .legend-dot.weekend {
        background: #f59e0b;
    }

    .chart-axis-labels {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 0;
        margin-top: 6px;
        font-size: 11px;
        color: #6b7280;
        font-weight: 600;
        text-align: center;
    }

    .chart-svg {
        width: 100%;
        height: 160px;
        display: block;
    }

    @media (max-width: 1100px) {
        .card-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;
function renderOverviewPage(filters = {}) {
  const { site = "all", date = "" } = filters;
  let modifier = 1;
  if (site !== "all") {
    const siteHash = site.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    modifier = 0.3 + siteHash % 30 / 100;
  }
  if (date) {
    const day = parseInt(date.split("-")[2] || "1", 10);
    const dateSwing = (day % 15 - 7) / 10;
    modifier += dateSwing;
    if (modifier < 0.1) modifier = 0.1;
  }
  const formatNum = (num, maxFrac = 0) => (num * modifier).toLocaleString(void 0, { maximumFractionDigits: maxFrac });
  const siteMap = {
    "all": "\uC804\uCCB4 \uC0AC\uC5C5\uC7A5",
    "ulsan": "\uC6B8\uC0B0 \uC0AC\uC5C5\uC7A5",
    "seosan": "\uC11C\uC0B0 \uC0AC\uC5C5\uC7A5",
    "seongnam": "\uC131\uB0A8 \uC0AC\uC5C5\uC7A5"
  };
  const siteName = siteMap[site] || site;
  const kpis = [
    {
      title: "\uC804\uB825 \uC0AC\uC6A9\uD604\uD669",
      value: formatNum(12450),
      unit: "kWh",
      subLabel: "\uC804\uC77C",
      subValue: formatNum(11890) + " kWh",
      deltaText: "4.7%",
      deltaDir: "up",
      iconBg: "#1f4c8f",
      iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`
    },
    {
      title: "LNG \uC0AC\uC6A9\uD604\uD669",
      value: formatNum(850),
      unit: "m\xB3",
      subLabel: "\uC804\uC77C",
      subValue: formatNum(890) + " m\xB3",
      deltaText: "4.5%",
      deltaDir: "down",
      iconBg: "#f97316",
      iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2s4 4 4 8a4 4 0 1 1-8 0c0-4 4-8 4-8z"></path><path d="M8.5 14.5c.5 2.5 2.5 4 3.5 4s3-1.5 3.5-4"></path></svg>`
    },
    {
      title: "\uC2A4\uD300 \uC0AC\uC6A9\uD604\uD669",
      value: formatNum(42.5, 1),
      unit: "Ton",
      subLabel: "\uC804\uC77C",
      subValue: formatNum(41.8, 1) + " Ton",
      deltaText: "0.7%",
      deltaDir: "up",
      iconBg: "#14b8a6",
      iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12c2.5-3 5.5-3 8 0s5.5 3 10 0"></path><path d="M3 18c2.5-3 5.5-3 8 0s5.5 3 10 0"></path><path d="M3 6c2.5-3 5.5-3 8 0s5.5 3 10 0"></path></svg>`
    },
    {
      title: "\uC555\uCD95\uACF5\uAE30 \uC0AC\uC6A9\uD604\uD669",
      value: formatNum(2150),
      unit: "Nm\xB3",
      subLabel: "\uC804\uC77C",
      subValue: formatNum(2200) + " Nm\xB3",
      deltaText: "2.3%",
      deltaDir: "down",
      iconBg: "#64748b",
      iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16"></path><path d="M6 7h12"></path><path d="M6 17h12"></path><path d="M10 7v10"></path><path d="M14 7v10"></path></svg>`
    }
  ];
  const tableRows = [
    {
      label: "\uC804\uC6D4 \uC2E4\uC801 (2\uC6D4)",
      labelClass: "row-label",
      cells: [formatNum(45200), formatNum(125400), formatNum(350200), formatNum(12500), formatNum(185.4, 1)]
    },
    {
      label: "\uAE08\uB144 \uB204\uACC4 (1~3\uC6D4)",
      labelClass: "row-label emph",
      cells: [formatNum(128500), formatNum(365800), formatNum(1020500), formatNum(38200), formatNum(542.8, 1)]
    }
  ];
  const months = [
    "1\uC6D4",
    "2\uC6D4",
    "3\uC6D4",
    "4\uC6D4",
    "5\uC6D4",
    "6\uC6D4",
    "7\uC6D4",
    "8\uC6D4",
    "9\uC6D4",
    "10\uC6D4",
    "11\uC6D4",
    "12\uC6D4"
  ];
  const weekday = [120, 115, 118, 110, 105, 108, 125, 130, 118, 112, 114, 122].map((v) => v * modifier);
  const weekend = [95, 92, 90, 86, 82, 84, 98, 102, 96, 90, 92, 97].map((v) => v * modifier);
  const makeLinePath = (values, w, h, pad2) => {
    const min = Math.min(...weekday, ...weekend) - 5;
    const max = Math.max(...weekday, ...weekend) + 5;
    const xStep = (w - pad2 * 2) / (values.length - 1);
    const yScale = (h - pad2 * 2) / (max - min || 1);
    const pts = values.map((v, i) => {
      const x = pad2 + xStep * i;
      const y = h - pad2 - (v - min) * yScale;
      return [x, y];
    });
    const d = pts.map(
      ([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    ).join(" ");
    return { d, min, max };
  };
  const chartW = 920;
  const chartH = 160;
  const pad = 18;
  const { d: weekdayD } = makeLinePath(weekday, chartW, chartH, pad);
  const {
    d: weekendD,
    min: yMin,
    max: yMax
  } = makeLinePath(weekend, chartW, chartH, pad);
  const yGrid = [0, 0.33, 0.66, 1].map((t) => {
    const y = pad + (chartH - pad * 2) * t;
    const val = (yMax - (yMax - yMin) * t).toFixed(0);
    return { y, val };
  });
  return `
        <style>${PAGE_STYLES}</style>
        <div class="overview-page">
            <div class="card-grid">
                ${kpis.map(
    (k) => `
                    <div class="panel stat-card">
                        <div class="stat-title-row">
                            <div>${k.title}</div>
                            <div class="stat-icon" style="background:${k.iconBg};">${k.iconSvg}</div>
                        </div>
                        <div class="stat-value-row">
                            <div class="stat-value">${k.value}</div>
                            <div class="stat-unit">(${k.unit})</div>
                        </div>
                        <div class="stat-sub">
                            <span>${k.subLabel}: ${k.subValue}</span>
                            <span class="delta ${k.deltaDir}">${k.deltaText}</span>
                        </div>
                    </div>
                `
  ).join("")}
            </div>

            <div class="panel content-block">
                <div class="block-title">\uC804\uC6D4 / \uB204\uACC4 \uC2E4\uC801 \uD604\uD669 <span style="color:#6b7280; font-size:12px; font-weight:600; margin-left:8px;">[\uC870\uD68C: ${siteName} / ${date || "\uC624\uB298"}]</span></div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width:170px;">\uAD6C\uBD84</th>
                            <th class="num">\uC0AC\uC5C5\uC7A5 \uC0DD\uC0B0\uB7C9 (EA)</th>
                            <th class="num">\uC5D0\uB108\uC9C0 \uBE44\uC6A9 (\uCC9C\uC6D0)</th>
                            <th class="num">\uC804\uB825 \uC0AC\uC6A9\uB7C9 (kWh)</th>
                            <th class="num">LNG \uC0AC\uC6A9\uB7C9 (m\xB3)</th>
                            <th class="num">\uC628\uC2E4\uAC00\uC2A4 (tCO\u2082)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows.map(
    (r) => `
                            <tr>
                                <td class="${r.labelClass}">${r.label}</td>
                                ${r.cells.map((v) => `<td class="num">${v}</td>`).join("")}
                            </tr>
                        `
  ).join("")}
                    </tbody>
                </table>
            </div>

            <div class="panel content-block">
                <div class="chart-wrap">
                    <div class="block-title" style="margin-bottom:0;">\uC5F0\uAC04 \uC6D4\uB2E8\uC704 \uB300\uAE30\uC804\uB825 \uD604\uD669 (\uD3C9\uC77C\uC2E4\uC544 vs \uD734\uC77C)</div>

                    <div class="chart-card">
                        <div class="legend">
                            <span class="legend-item"><span class="legend-dot weekday"></span>\uD3C9\uC77C \uC2E4\uC544 (kW)</span>
                            <span class="legend-item"><span class="legend-dot weekend"></span>\uD734\uC77C (kW)</span>
                        </div>
                        <svg class="chart-svg" viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="none">
                            ${yGrid.map(
    (g) => `
                                <line x1="${pad}" x2="${chartW - pad}" y1="${g.y}" y2="${g.y}" stroke="#e5e7eb" stroke-width="1" />
                                <text x="${pad - 8}" y="${g.y + 4}" text-anchor="end" font-size="11" fill="#6b7280" font-weight="600">${g.val}</text>
                            `
  ).join("")}
                            <path d="${weekdayD}" fill="none" stroke="#1f4c8f" stroke-width="3" />
                            <path d="${weekendD}" fill="none" stroke="#f59e0b" stroke-width="3" />
                        </svg>
                        <div class="chart-axis-labels">
                            ${months.map((m) => `<div>${m}</div>`).join("")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// plugin/components/pages/NoticePage.js
var noticeState = {
  viewMode: "grid",
  // "grid" | "category" | "detail"
  searchTerm: "",
  selectedCategory: null,
  // "blue" | "orange" | "green" | "purple"
  selectedNoticeId: null,
  fromCategoryView: false
  // To remember where the detail view came from
};
var categoryNames = {
  "blue": "\uC5D0\uB108\uC9C0 \uAD50\uC721",
  "orange": "\uD64D\uBCF4 \uBC0F \uCEA0\uD398\uC778",
  "green": "\uAC1C\uC120\uC694\uCCAD \uBC0F \uC81C\uC548",
  "purple": "\uD0C4\uC18C\uC911\uB9BD \uC815\uBCF4 (\uBC95\uB839/\uADDC\uC81C)"
};
var noticeData = [
  // Blue - 에너지 교육
  { id: 1, category: "blue", title: "2026\uB144 \uC0C1\uBC18\uAE30 \uC5D0\uB108\uC9C0 \uC808\uAC10 \uC2E4\uBB34\uC790 \uAD50\uC721", meta: "\uC77C\uC815: 2026.04.15 ~ 04.16 | \uC7A5\uC18C: \uBCF8\uC0AC \uB300\uAC15\uB2F9", badgeHtml: `<div class="badge blue">\uBAA8\uC9D1\uC911</div>`, content: "\uBCF8\uC0AC \uB300\uAC15\uB2F9\uC5D0\uC11C \uC9C4\uD589\uB418\uB294 \uC0C1\uBC18\uAE30 \uC5D0\uB108\uC9C0 \uC808\uAC10 \uC2E4\uBB34\uC790 \uD544\uC218 \uAD50\uC721\uC785\uB2C8\uB2E4.<br><br><b>[\uAD50\uC721 \uC548\uB0B4]</b><br>- \uB0B4\uC6A9: \uACF5\uC7A5 \uB0B4 \uCD5C\uC2E0 \uC5D0\uB108\uC9C0 \uC808\uAC10 \uAE30\uBC95 \uBC0F \uD574\uC678 \uC6B0\uC218 \uC0AC\uB840 \uACF5\uC720<br>- \uAC15\uC0AC: \uC678\uBD80 \uCD08\uBE59 \uC804\uBB38\uAC00 \uBC0F \uC0AC\uB0B4 \uB9C8\uC2A4\uD130<br>- \uC900\uBE44\uBB3C: \uAC1C\uC778 \uB178\uD2B8\uBD81 \uBC0F \uC0AC\uC6D0\uC99D \uC9C0\uCC38<br><br>\uAD50\uC721 \uBBF8\uC774\uC218 \uC2DC \uD558\uBC18\uAE30 \uC778\uC0AC \uD3C9\uAC00\uC5D0 \uBD88\uC774\uC775\uC774 \uC788\uC744 \uC218 \uC788\uC73C\uB2C8 \uBD80\uC11C\uBCC4 \uB2F4\uB2F9\uC790\uB294 \uBC18\uB4DC\uC2DC \uAE30\uD55C \uB0B4\uC5D0 \uCC38\uC11D\uD558\uC5EC \uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4." },
  { id: 2, category: "blue", title: "\uD0C4\uC18C\uC911\uB9BD \uAE30\uCD08 \uBC0F RE100 \uC774\uD589 \uC804\uB7B5 (\uC628\uB77C\uC778)", meta: "\uAE30\uAC04: \uC0C1\uC2DC \uC218\uAC15 \uAC00\uB2A5 | \uC218\uAC15\uB960: 85%", badgeHtml: `<div class="badge green">\uC218\uAC15\uC911</div>`, content: "RE100 \uB2EC\uC131\uC744 \uC704\uD55C \uC0AC\uB0B4 \uD544\uC218 \uC628\uB77C\uC778 \uAD50\uC721 \uACFC\uC815\uC785\uB2C8\uB2E4.<br><br>\uC0AC\uB0B4 LMS \uC2DC\uC2A4\uD15C\uC744 \uD1B5\uD574 \uBAA8\uBC14\uC77C\uB85C\uB3C4 \uC790\uC720\uB86D\uAC8C \uC218\uAC15\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC544\uC9C1 \uC218\uAC15\uC744 \uC644\uB8CC\uD558\uC9C0 \uC54A\uC73C\uC2E0 \uBD84\uB4E4\uC740 \uAC00\uAE09\uC801 \uC774\uB2EC \uB9D0\uAE4C\uC9C0 \uC644\uB8CC\uD574 \uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4." },
  { id: 3, category: "blue", title: "\uC5D0\uB108\uC9C0 \uC124\uBE44 \uC6B4\uC601 \uD6A8\uC728\uD654 \uAC00\uC774\uB4DC \uAD50\uC721", meta: "\uC77C\uC815: 2026.03.10 | \uB300\uC0C1: \uC124\uBE44 \uB2F4\uB2F9\uC790", badgeHtml: `<div class="badge gray">\uC885\uB8CC</div>`, content: "\uC9C0\uB09C \uB2EC \uC9C4\uD589\uB418\uC5C8\uB358 \uC124\uBE44 \uC6B4\uC601 \uAC00\uC774\uB4DC \uAD50\uC721\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uB9C8\uBB34\uB9AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.<br><br>\uAD50\uC721 \uC790\uB8CC \uBC0F \uBC1C\uD45C \uC601\uC0C1\uC740 \uC0AC\uB0B4 \uC9C0\uC2DD\uD3EC\uD138(Knowledge Center) \uBE44\uB514\uC624 \uC790\uB8CC\uC2E4\uC5D0 \uC5C5\uB85C\uB4DC\uB418\uC5B4 \uC788\uC73C\uB2C8, \uBD80\uB4DD\uC774\uD558\uAC8C \uCC38\uC11D\uD558\uC9C0 \uBABB\uD558\uC2E0 \uBD84\uB4E4\uC740 \uD574\uB2F9 \uC790\uB8CC\uB97C \uCC38\uACE0\uD574 \uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4." },
  { id: 13, category: "blue", title: "\uC2A4\uB9C8\uD2B8 \uD329\uD1A0\uB9AC \uC5D0\uB108\uC9C0 \uC808\uAC10 \uAE30\uCD08", meta: "\uAE30\uAC04: 2026.05.01 ~ 05.31 | \uC218\uAC15\uB960: 12%", badgeHtml: `<div class="badge blue">\uC218\uAC15\uC911</div>`, content: "\uC2A4\uB9C8\uD2B8 \uD329\uD1A0\uB9AC \uB3C4\uC785\uC5D0 \uB530\uB978 \uD544\uC218 \uC628\uB77C\uC778 \uACFC\uC815\uC785\uB2C8\uB2E4." },
  // Orange - 홍보 및 캠페인
  { id: 4, category: "orange", title: "[\uC6B0\uC218\uC0AC\uB840] 1\uACF5\uC7A5 \uC555\uCD95\uACF5\uAE30 \uB204\uC124 \uAC1C\uC120\uC73C\uB85C \uC5F0 5\uCC9C\uB9CC\uC6D0 \uC808\uAC10", meta: "\uB4F1\uB85D\uC77C: 2026.03.28 | \uC870\uD68C\uC218: 1,245", badgeHtml: `<div style="font-size:16px;">\u{1F3C6}</div>`, content: "1\uACF5\uC7A5 \uC720\uD2F8\uB9AC\uD2F0\uD300\uC5D0\uC11C \uC81C\uC548\uD55C \uB178\uD6C4 \uC555\uCD95\uACF5\uAE30 \uBC30\uAD00 \uBC38\uBE0C \uAD50\uCCB4 \uBC0F \uCD08\uC74C\uD30C \uB204\uC124 \uD0D0\uC9C0 \uD65C\uB3D9\uC744 \uD1B5\uD574 \uC5F0\uAC04 \uC57D 5\uCC9C\uB9CC \uC6D0 \uC0C1\uB2F9\uC758 \uC804\uB825\uBE44\uB97C \uC808\uAC10\uD55C \uC6B0\uC218 \uC0AC\uB840\uC785\uB2C8\uB2E4.<br><br>\uD574\uB2F9 \uC0AC\uB840\uB97C \uBC14\uD0D5\uC73C\uB85C \uD0C0 \uACF5\uC7A5\uC5D0\uC11C\uB3C4 \uC989\uAC01\uC801\uC778 \uC218\uD3C9 \uC804\uAC1C\uB97C \uC9C0\uC2DC\uD558\uC600\uC73C\uBA70, \uC131\uACFC\uB97C \uB0B8 1\uACF5\uC7A5 \uB2F4\uB2F9 \uD30C\uD2B8\uC5D0\uB294 \uB2E4\uC74C \uB2EC '\uC774\uB2EC\uC758 \uC6B0\uC218 \uD300' \uD3EC\uC0C1\uC774 \uC218\uC5EC\uB420 \uC608\uC815\uC785\uB2C8\uB2E4." },
  { id: 5, category: "orange", title: "3\uC6D4 '\uC5D0\uB108\uC9C0 \uC9C0\uD0B4\uC774' \uCEA0\uD398\uC778 \uACB0\uACFC \uBC1C\uD45C", meta: "\uB4F1\uB85D\uC77C: 2026.03.25 | \uBD80\uC11C\uBCC4 \uCC38\uC5EC\uC728 \uACF5\uAC1C", badgeHtml: `<div class="badge red-text">NEW</div>`, content: "\uC0AC\uB0B4 PC \uC808\uC804 \uBC0F \uC810\uC2EC\uC2DC\uAC04 \uC18C\uB4F1 \uCEA0\uD398\uC778\uC5D0 \uC801\uADF9\uC801\uC73C\uB85C \uCC38\uC5EC\uD574\uC8FC\uC2E0 \uC784\uC9C1\uC6D0 \uC5EC\uB7EC\uBD84\uAED8 \uAC10\uC0AC\uB4DC\uB9BD\uB2C8\uB2E4.<br><br><b>\uC6B0\uC218 \uCC38\uC5EC \uBD80\uC11C</b><br>1\uC704: \uC0DD\uC0B0\uAD00\uB9AC\uD300 (98%)<br>2\uC704: \uD488\uC9C8\uBCF4\uC99D\uD300 (92%)<br>3\uC704: \uACBD\uC601\uC9C0\uC6D0\uD300 (89%)<br><br>\uC6B0\uC218 \uBD80\uC11C\uC5D0\uB294 \uC18C\uC815\uC758 \uAC04\uC2DD\uBE44\uAC00 \uC9C0\uC6D0\uB420 \uC608\uC815\uC785\uB2C8\uB2E4." },
  { id: 6, category: "orange", title: "2026\uB144 \uC5D0\uB108\uC9C0 \uC808\uC57D \uB274\uC2A4\uB808\uD130 Vol.3 \uBC1C\uAC04", meta: "\uB4F1\uB85D\uC77C: 2026.03.15 | \uCCA8\uBD80\uD30C\uC77C \uB2E4\uC6B4\uB85C\uB4DC", badgeHtml: `<div style="color:#dc2626;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>`, content: "\uAD6D\uB0B4\uC678 \uC5D0\uB108\uC9C0 \uC2DC\uC7A5 \uB3D9\uD5A5\uACFC \uB2F9\uC0AC\uC758 \uC808\uC57D \uD65C\uB3D9\uC744 \uC815\uB9AC\uD55C \uB274\uC2A4\uB808\uD130 Vol.3 \uAC00 \uBC1C\uAC04\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uBCF8 \uAE00\uC758 \uCCA8\uBD80\uD30C\uC77C\uC744 \uD074\uB9AD\uD558\uC5EC PDF \uBC84\uC804\uC744 \uB2E4\uC6B4\uB85C\uB4DC\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4." },
  { id: 14, category: "orange", title: "\uC810\uC2EC\uC2DC\uAC04 \uC644\uC804 \uC18C\uB4F1 \uCEA0\uD398\uC778 \uC5F0\uC7A5 \uC548\uB0B4", meta: "\uB4F1\uB85D\uC77C: 2026.04.10 | \uCD1D\uBB34\uD300", badgeHtml: `<div class="badge orange">\uC548\uB0B4</div>`, content: "\uD558\uC808\uAE30 \uC804\uB825\uD53C\uD06C \uB300\uBE44 \uC810\uC2EC\uC2DC\uAC04 \uC644\uC804 \uC18C\uB4F1 \uCEA0\uD398\uC778\uC744 8\uC6D4\uAE4C\uC9C0 \uC5F0\uC7A5\uD569\uB2C8\uB2E4." },
  // Green - 개선요청 및 제안
  { id: 7, category: "green", title: "2\uACF5\uC7A5 \uACF5\uC870\uAE30 \uC778\uBC84\uD130 \uC81C\uC5B4 \uBC29\uC2DD \uAC1C\uC120 \uC81C\uC548", meta: "\uC81C\uC548\uC790: \uAE40\uCCA0\uC218 | \uC81C\uC548\uC77C: 2026.03.30", badgeHtml: `<div class="badge orange">\uAC80\uD1A0\uC911</div>`, content: "\uAE30\uC874 \uB310\uD37C \uC81C\uC5B4 \uBC29\uC2DD\uC758 2\uACF5\uC7A5 AHU(\uACF5\uAE30\uC870\uD654\uAE30)\uC5D0 \uC778\uBC84\uD130\uB97C \uB3C4\uC785\uD558\uC5EC \uD68C\uC804\uC218 \uC81C\uC5B4 \uBC29\uC2DD\uC73C\uB85C \uBCC0\uACBD\uD558\uB294 \uC81C\uC548\uC785\uB2C8\uB2E4.<br><br>\uD604\uC7AC \uC2DC\uC124\uD300\uC5D0\uC11C \uCD08\uAE30 \uD22C\uC790\uBE44 \uBC0F \uC608\uC0C1 \uC804\uB825 \uC808\uAC10\uC561\uC5D0 \uB300\uD55C ROI(\uD22C\uC790\uC218\uC775\uB960)\uB97C \uC2EC\uB3C4 \uC788\uAC8C \uAC80\uD1A0 \uC911\uC785\uB2C8\uB2E4. \uAE0D\uC815\uC801\uC778 \uBC29\uD5A5\uC73C\uB85C \uACB0\uB860\uC774 \uB0A0 \uACBD\uC6B0 \uB0B4\uB144\uB3C4 \uC608\uC0B0\uC5D0 \uBC18\uC601\uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4." },
  { id: 8, category: "green", title: "\uC870\uB9BD\uB77C\uC778 LED \uC870\uBA85 \uAD50\uCCB4 \uBC0F \uC13C\uC11C \uC124\uCE58 \uC694\uCCAD", meta: "\uC81C\uC548\uC790: \uBC15\uC601\uD76C | \uC81C\uC548\uC77C: 2026.03.20", badgeHtml: `<div class="badge blue">\uC9C4\uD589\uC911</div>`, content: "\uADFC\uBB34\uC790\uAC00 \uC5C6\uB294 \uD734\uC2DD \uC2DC\uAC04 \uBC0F \uC57C\uAC04\uC5D0 \uBD88\uD544\uC694\uD558\uAC8C \uCF1C\uC838 \uC788\uB294 \uC870\uBA85\uC744 \uC790\uB3D9\uC73C\uB85C \uB044\uAE30 \uC704\uD574, \uACE0\uD6A8\uC728 LED \uC870\uBA85 \uAD50\uCCB4\uC640 \uB354\uBD88\uC5B4 \uC7AC\uC2E4 \uC13C\uC11C \uC124\uCE58 \uC791\uC5C5\uC774 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4.<br><br>\uD604\uC7AC \uC790\uC7AC \uBC1C\uC8FC\uAC00 \uC644\uB8CC\uB418\uC5C8\uC73C\uBA70 \uC774\uBC88 \uC8FC \uC8FC\uB9D0\uC744 \uC774\uC6A9\uD558\uC5EC \uAD50\uCCB4 \uACF5\uC0AC\uAC00 \uC2DC\uC791\uB420 \uC608\uC815\uC785\uB2C8\uB2E4. \uC791\uC5C5 \uAE30\uAC04 \uC911 \uC77C\uBD80 \uAD6C\uC5ED \uD1B5\uD589\uC774 \uC81C\uD55C\uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4." },
  { id: 9, category: "green", title: "\uB178\uD6C4 \uBCF4\uC77C\uB7EC \uD3D0\uC5F4 \uD68C\uC218 \uC7A5\uCE58 \uC124\uCE58 \uAC74", meta: "\uC81C\uC548\uC790: \uC2DC\uC124\uD300 | \uC81C\uC548\uC77C: 2026.02.15", badgeHtml: `<div class="badge green">\uC644\uB8CC</div>`, content: "\uC81C\uC548\uD574\uC8FC\uC2E0 \uBCF4\uC77C\uB7EC \uC5F0\uB3C4 \uD3D0\uC5F4 \uD68C\uC218\uAE30(Economizer) \uC124\uCE58 \uACF5\uC0AC\uAC00 2\uC6D4 \uB9D0 \uC131\uACF5\uC801\uC73C\uB85C \uB9C8\uBB34\uB9AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.<br><br>\uD55C \uB2EC\uAC04 \uAC00\uB3D9 \uB370\uC774\uD130\uB97C \uBAA8\uB2C8\uD130\uB9C1\uD55C \uACB0\uACFC, \uAE09\uC218 \uC608\uC5F4\uC744 \uD1B5\uD574 \uC804\uB144 \uB3D9\uC6D4 \uB300\uBE44 \uAC00\uC2A4 \uC0AC\uC6A9\uB7C9\uC774 \uC57D 15% \uC774\uC0C1 \uC808\uAC10\uB418\uB294 \uD6CC\uB96D\uD55C \uC131\uACFC\uB97C \uAC70\uB450\uC5C8\uC2B5\uB2C8\uB2E4." },
  { id: 15, category: "green", title: "3\uACF5\uC7A5 \uC2A4\uD06C\uB7EC\uBC84 \uC6A9\uC218 \uC7AC\uD65C\uC6A9 \uC2DC\uC2A4\uD15C \uB3C4\uC785", meta: "\uC81C\uC548\uC790: \uC774\uC601\uD638 | \uC81C\uC548\uC77C: 2026.04.05", badgeHtml: `<div class="badge orange">\uAC80\uD1A0\uC911</div>`, content: "\uC2A4\uD06C\uB7EC\uBC84 \uC6A9\uC218\uB97C \uC815\uC218 \uCC98\uB9AC\uD558\uC5EC \uC7AC\uD65C\uC6A9\uD558\uB294 \uC2DC\uC2A4\uD15C \uB3C4\uC785 \uC81C\uC548\uC785\uB2C8\uB2E4." },
  // Purple - 탄소중립 정보
  { id: 10, category: "purple", title: "[\uBC95\uB839] \uD0C4\uC18C\uC911\uB9BD\uAE30\uBCF8\uBC95 \uC2DC\uD589\uB839 \uAC1C\uC815\uC548 \uC785\uBC95\uC608\uACE0", meta: "\uCE74\uD14C\uACE0\uB9AC: \uBC95\uB839 | \uB4F1\uB85D\uC77C: 2026.03.20", badgeHtml: `<div class="badge red-text">\uC911\uC694</div>`, content: "\uC815\uBD80\uC5D0\uC11C \uBC1C\uD45C\uD55C \uD0C4\uC18C\uC911\uB9BD\uAE30\uBCF8\uBC95 \uC2DC\uD589\uB839 \uC77C\uBD80\uAC1C\uC815\uC548\uC5D0 \uB300\uD55C \uC548\uB0B4\uC785\uB2C8\uB2E4.<br><br>\uBC30\uCD9C\uAD8C \uAC70\uB798\uC81C \uD560\uB2F9 \uB300\uC0C1 \uC5C5\uCCB4\uC758 \uC758\uBB34 \uAC10\uCD95\uB7C9\uC774 \uC0C1\uD5A5 \uC870\uC815\uB420 \uC218 \uC788\uB294 \uB0B4\uC6A9\uC774 \uD3EC\uD568\uB418\uC5B4 \uC788\uC5B4, \uB2F9\uC0AC ESG \uACBD\uC601\uD300\uC5D0\uC11C \uC2EC\uCE35 \uBD84\uC11D\uC744 \uC9C4\uD589\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4. \uAD00\uB828 \uBD80\uC11C\uC7A5\uB4E4\uAED8\uC11C\uB294 \uCCA8\uBD80\uB41C \uBC95\uB839 \uC6D0\uBB38\uC744 \uBC18\uB4DC\uC2DC \uC219\uC9C0\uD574 \uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4." },
  { id: 11, category: "purple", title: "[\uC6A9\uC5B4] Scope 3 \uBC30\uCD9C\uB7C9 \uC0B0\uC815 \uAC00\uC774\uB4DC\uB77C\uC778 \uBC0F \uC8FC\uC694 \uC6A9\uC5B4 \uD574\uC124", meta: "\uCE74\uD14C\uACE0\uB9AC: \uAC00\uC774\uB4DC | \uB4F1\uB85D\uC77C: 2026.03.10", badgeHtml: `<div class="badge purple-text">Update</div>`, content: "\uC9C1\uC811 \uBC30\uCD9C(Scope 1) \uBC0F \uAC04\uC811 \uBC30\uCD9C(Scope 2) \uC678\uC5D0, \uD611\uB825\uC0AC \uBC0F \uBB3C\uB958\uB9DD\uC744 \uD3EC\uD568\uD55C \uAE30\uD0C0 \uAC04\uC811 \uBC30\uCD9C(Scope 3) \uC0B0\uC815\uC5D0 \uB300\uD55C \uCD5C\uC2E0 \uAE00\uB85C\uBC8C \uAC00\uC774\uB4DC\uB77C\uC778 \uC694\uC57D\uBCF8\uC785\uB2C8\uB2E4.<br><br>\uD2B9\uD788 \uACF5\uAE09\uB9DD ESG \uD3C9\uAC00\uAC00 \uAC15\uD654\uB428\uC5D0 \uB530\uB77C \uAD6C\uB9E4/\uBB3C\uB958 \uBD80\uC11C\uC758 \uC138\uBD80 \uB370\uC774\uD130 \uD655\uBCF4\uAC00 \uC911\uC694\uD574\uC84C\uC2B5\uB2C8\uB2E4." },
  { id: 12, category: "purple", title: "[FAQ] RE100 \uC774\uD589 \uC218\uB2E8\uBCC4 \uC778\uC815 \uAE30\uC900 \uC790\uC8FC \uBB3B\uB294 \uC9C8\uBB38", meta: "\uCE74\uD14C\uACE0\uB9AC: FAQ | \uB4F1\uB85D\uC77C: 2026.02.28", badgeHtml: `<div style="color:#2563eb;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>`, content: "\uB179\uC0C9\uD504\uB9AC\uBBF8\uC5C4 \uC694\uAE08\uC81C, REC(\uC2E0\uC7AC\uC0DD\uC5D0\uB108\uC9C0 \uACF5\uAE09\uC778\uC99D\uC11C) \uAD6C\uB9E4, \uC81C3\uC790 PPA(\uC804\uB825\uAD6C\uB9E4\uACC4\uC57D), \uC790\uAC00 \uBC1C\uC804 \uB4F1 \uAE30\uC5C5\uC758 RE100 \uC774\uD589\uC744 \uC704\uD55C \uAC01 \uC218\uB2E8\uBCC4 \uC7A5\uB2E8\uC810\uACFC \uC778\uC815 \uAE30\uC900\uC5D0 \uB300\uD574 \uC790\uC8FC \uBB3B\uB294 \uC9C8\uBB38(FAQ)\uC744 \uC815\uB9AC\uD588\uC2B5\uB2C8\uB2E4." },
  { id: 16, category: "purple", title: "[\uACF5\uC9C0] 2026\uB144 \uC9C0\uC18D\uAC00\uB2A5\uACBD\uC601\uBCF4\uACE0\uC11C \uCD08\uC548 \uAC80\uD1A0 \uC694\uCCAD", meta: "\uCE74\uD14C\uACE0\uB9AC: \uACF5\uC9C0 | \uB4F1\uB85D\uC77C: 2026.04.18", badgeHtml: `<div class="badge red-text">\uC911\uC694</div>`, content: "\uC62C\uD574 \uBC1C\uAC04 \uC608\uC815\uC778 \uC9C0\uC18D\uAC00\uB2A5\uACBD\uC601\uBCF4\uACE0\uC11C \uCD08\uC548\uC785\uB2C8\uB2E4. \uAC01 \uBD80\uC11C\uBCC4 \uB370\uC774\uD130 \uD655\uC778 \uC694\uB9DD." }
];
var NOTICE_STYLES = `
    .notice-page {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 20px;
    }

    .notice-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 12px 24px;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        border: 1px solid var(--border-color);
    }

    .notice-title {
        font-size: 18px;
        font-weight: 700;
        color: var(--hyundai-navy);
    }

    .notice-header-right {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .notice-search-wrap {
        position: relative;
        display: flex;
        align-items: center;
    }

    .notice-search-input {
        width: 240px;
        height: 38px;
        border: 1px solid #d2d8e2;
        border-radius: 19px;
        padding: 0 40px 0 16px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .notice-search-input:focus {
        border-color: var(--accent-blue);
        box-shadow: 0 0 0 2px rgba(0,114,206,0.1);
    }

    .notice-search-icon {
        position: absolute;
        right: 12px;
        color: #888;
        cursor: pointer;
    }

    .notice-admin {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        font-weight: 600;
        color: #4b5563;
        cursor: pointer;
    }

    .notice-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 20px;
        flex: 1;
        min-height: 0;
    }

    .notice-card {
        background: #fff;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .notice-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.06);
    }

    .card-header {
        padding: 14px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,0.05);
    }

    .card-title-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 700;
    }

    .card-more {
        font-size: 13px;
        color: #6b7280;
        font-weight: 500;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background 0.2s, color 0.2s;
    }

    .card-more:hover {
        background: rgba(0,0,0,0.05);
        color: var(--hyundai-navy);
    }

    /* Theme Colors */
    .theme-blue .card-header { background: #f0f7ff; }
    .theme-blue .card-title-wrap { color: #005bb5; }
    
    .theme-orange .card-header { background: #fff5eb; }
    .theme-orange .card-title-wrap { color: #d95d00; }

    .theme-green .card-header { background: #f0fdf4; }
    .theme-green .card-title-wrap { color: #047857; }

    .theme-purple .card-header { background: #f9f5ff; }
    .theme-purple .card-title-wrap { color: #6d28d9; }

    .card-list {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0 20px;
        overflow-y: auto;
    }

    .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid var(--border-color);
        cursor: pointer;
    }
    
    .list-item:last-child {
        border-bottom: none;
    }

    .list-item:hover .item-title {
        color: var(--accent-blue);
        text-decoration: underline;
    }

    .item-content {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .item-title {
        font-size: 14px;
        font-weight: 600;
        color: #1f2937;
    }

    .item-meta {
        font-size: 12px;
        color: #8c98a4;
    }

    /* Badges */
    .badge {
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
    }
    .badge.blue { color: #2563eb; background: #eff6ff; }
    .badge.green { color: #059669; background: #ecfdf5; }
    .badge.gray { color: #4b5563; background: #f3f4f6; }
    .badge.orange { color: #d97706; background: #fffbeb; }
    .badge.red-text { color: #dc2626; font-weight: 700; }
    .badge.purple-text { color: #7c3aed; font-weight: 700; }

    .empty-state {
        padding: 40px 20px;
        text-align: center;
        color: #9ca3af;
        font-size: 14px;
        font-weight: 500;
    }

    /* Shared Detail & Category View Styles */
    .panel-view {
        background: #fff;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 30px 40px;
        overflow-y: auto;
    }

    .back-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #6b7280;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 25px;
        transition: color 0.2s;
    }

    .back-btn:hover {
        color: var(--hyundai-navy);
    }

    .detail-header {
        border-bottom: 2px solid var(--border-color);
        padding-bottom: 25px;
        margin-bottom: 30px;
    }

    .detail-title {
        font-size: 24px;
        font-weight: 700;
        color: var(--hyundai-navy);
        margin-bottom: 12px;
        line-height: 1.4;
    }

    .detail-meta-wrap {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .detail-content {
        font-size: 16px;
        color: #374151;
        line-height: 1.8;
    }

    .category-list-wrap {
        display: flex;
        flex-direction: column;
    }
`;
function getFilteredListHtml(category, limit = null) {
  const term = noticeState.searchTerm.toLowerCase();
  let items = noticeData.filter((d) => d.category === category && d.title.toLowerCase().includes(term));
  if (limit) items = items.slice(0, limit);
  if (items.length === 0) {
    return `<div class="empty-state">"${noticeState.searchTerm}" \uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>`;
  }
  return items.map((item) => `
        <div class="list-item" data-id="${item.id}">
            <div class="item-content">
                <div class="item-title">${item.title}</div>
                <div class="item-meta">${item.meta}</div>
            </div>
            ${item.badgeHtml}
        </div>
    `).join("");
}
function renderNoticePage() {
  if (noticeState.viewMode === "detail" && noticeState.selectedNoticeId) {
    const item = noticeData.find((d) => d.id === noticeState.selectedNoticeId);
    if (item) {
      return `
                <style>${NOTICE_STYLES}</style>
                <div class="notice-page">
                    <div class="panel-view">
                        <div>
                            <div class="back-btn" id="NoticeDetailBackBtn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                \uBAA9\uB85D\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30
                            </div>
                        </div>
                        <div class="detail-header">
                            <div class="detail-title">${item.title}</div>
                            <div class="detail-meta-wrap">
                                ${item.badgeHtml}
                                <span class="item-meta">${item.meta}</span>
                            </div>
                        </div>
                        <div class="detail-content">
                            ${item.content}
                        </div>
                    </div>
                </div>
            `;
    }
  }
  if (noticeState.viewMode === "category" && noticeState.selectedCategory) {
    const catName = categoryNames[noticeState.selectedCategory] || "\uACF5\uC9C0\uC0AC\uD56D";
    return `
            <style>${NOTICE_STYLES}</style>
            <div class="notice-page">
                <!-- \uC0C1\uB2E8 \uAC80\uC0C9\uBC14 \uC601\uC5ED (\uCE74\uD14C\uACE0\uB9AC \uB0B4 \uAC80\uC0C9) -->
                <div class="notice-header">
                    <div class="notice-title">${catName}</div>
                    <div class="notice-header-right">
                        <div class="notice-search-wrap">
                            <input type="text" class="notice-search-input" id="NoticeSearchInput" placeholder="'${catName}' \uB0B4 \uAC80\uC0C9..." value="${noticeState.searchTerm}" />
                            <svg class="notice-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div class="panel-view" style="padding: 20px 40px;">
                    <div>
                        <div class="back-btn" id="NoticeCategoryBackBtn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            \uC804\uCCB4 \uCE74\uD14C\uACE0\uB9AC\uB85C \uB3CC\uC544\uAC00\uAE30
                        </div>
                    </div>
                    <div class="category-list-wrap">
                        ${getFilteredListHtml(noticeState.selectedCategory)}
                    </div>
                </div>
            </div>
        `;
  }
  return `
        <style>${NOTICE_STYLES}</style>
        <div class="notice-page">
            <!-- \uC0C1\uB2E8 \uAC80\uC0C9\uBC14 \uC601\uC5ED -->
            <div class="notice-header">
                <div class="notice-title">\uACF5\uC9C0\uC0AC\uD56D \uBC0F \uAD50\uC721</div>
                <div class="notice-header-right">
                    <div class="notice-search-wrap">
                        <input type="text" class="notice-search-input" id="NoticeSearchInput" placeholder="\uC804\uCCB4 \uAC80\uC0C9\uC5B4 \uC785\uB825..." value="${noticeState.searchTerm}" />
                        <svg class="notice-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <div class="notice-admin" id="NoticeAdminBtn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        \uAD00\uB9AC\uC790(New)
                    </div>
                </div>
            </div>

            <!-- 4\uBD84\uD560 \uADF8\uB9AC\uB4DC -->
            <div class="notice-grid">
                
                <!-- 1. \uC5D0\uB108\uC9C0 \uAD50\uC721 -->
                <div class="notice-card theme-blue">
                    <div class="card-header">
                        <div class="card-title-wrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                            \uC5D0\uB108\uC9C0 \uAD50\uC721
                        </div>
                        <div class="card-more" data-category="blue">\uB354\uBCF4\uAE30 ></div>
                    </div>
                    <div class="card-list">
                        ${getFilteredListHtml("blue", 3)}
                    </div>
                </div>

                <!-- 2. \uD64D\uBCF4 \uBC0F \uCEA0\uD398\uC778 -->
                <div class="notice-card theme-orange">
                    <div class="card-header">
                        <div class="card-title-wrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            \uD64D\uBCF4 \uBC0F \uCEA0\uD398\uC778
                        </div>
                        <div class="card-more" data-category="orange">\uB354\uBCF4\uAE30 ></div>
                    </div>
                    <div class="card-list">
                        ${getFilteredListHtml("orange", 3)}
                    </div>
                </div>

                <!-- 3. \uAC1C\uC120\uC694\uCCAD \uBC0F \uC81C\uC548 -->
                <div class="notice-card theme-green">
                    <div class="card-header">
                        <div class="card-title-wrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
                            \uAC1C\uC120\uC694\uCCAD \uBC0F \uC81C\uC548
                        </div>
                        <div class="card-more" data-category="green">\uB354\uBCF4\uAE30 ></div>
                    </div>
                    <div class="card-list">
                        ${getFilteredListHtml("green", 3)}
                    </div>
                </div>

                <!-- 4. \uD0C4\uC18C\uC911\uB9BD \uC815\uBCF4 -->
                <div class="notice-card theme-purple">
                    <div class="card-header">
                        <div class="card-title-wrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                            \uD0C4\uC18C\uC911\uB9BD \uC815\uBCF4 (\uBC95\uB839/\uADDC\uC81C)
                        </div>
                        <div class="card-more" data-category="purple">\uB354\uBCF4\uAE30 ></div>
                    </div>
                    <div class="card-list">
                        ${getFilteredListHtml("purple", 3)}
                    </div>
                </div>

            </div>
        </div>
    `;
}
function bindListItemClicks(container) {
  const listItems = container.querySelectorAll(".list-item");
  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      if (id) {
        noticeState.selectedNoticeId = parseInt(id, 10);
        noticeState.fromCategoryView = noticeState.viewMode === "category";
        noticeState.viewMode = "detail";
        reRenderLocal(container);
      }
    });
  });
}
function updateSearchResults(container) {
  if (noticeState.viewMode === "grid") {
    const cards = [
      { cat: "blue", node: container.querySelector(".theme-blue .card-list") },
      { cat: "orange", node: container.querySelector(".theme-orange .card-list") },
      { cat: "green", node: container.querySelector(".theme-green .card-list") },
      { cat: "purple", node: container.querySelector(".theme-purple .card-list") }
    ];
    cards.forEach((c) => {
      if (c.node) c.node.innerHTML = getFilteredListHtml(c.cat, 3);
    });
  } else if (noticeState.viewMode === "category" && noticeState.selectedCategory) {
    const wrap = container.querySelector(".category-list-wrap");
    if (wrap) {
      wrap.innerHTML = getFilteredListHtml(noticeState.selectedCategory);
    }
  }
  bindListItemClicks(container);
}
function renderNoticePageInit(container) {
  const searchInput = container.querySelector("#NoticeSearchInput");
  if (searchInput) {
    searchInput.focus();
    const val = searchInput.value;
    searchInput.value = "";
    searchInput.value = val;
    searchInput.addEventListener("input", (e) => {
      noticeState.searchTerm = e.target.value;
      updateSearchResults(container);
    });
  }
  const moreBtns = container.querySelectorAll(".card-more");
  moreBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-category");
      if (cat) {
        noticeState.viewMode = "category";
        noticeState.selectedCategory = cat;
        noticeState.searchTerm = "";
        reRenderLocal(container);
      }
    });
  });
  bindListItemClicks(container);
  const catBackBtn = container.querySelector("#NoticeCategoryBackBtn");
  if (catBackBtn) {
    catBackBtn.addEventListener("click", () => {
      noticeState.viewMode = "grid";
      noticeState.selectedCategory = null;
      noticeState.searchTerm = "";
      reRenderLocal(container);
    });
  }
  const detailBackBtn = container.querySelector("#NoticeDetailBackBtn");
  if (detailBackBtn) {
    detailBackBtn.addEventListener("click", () => {
      noticeState.viewMode = noticeState.fromCategoryView ? "category" : "grid";
      noticeState.selectedNoticeId = null;
      reRenderLocal(container);
    });
  }
  const adminBtn = container.querySelector("#NoticeAdminBtn");
  if (adminBtn) {
    adminBtn.addEventListener("click", () => {
      let info = "=== NextSpace Context ===\n\n";
      if (typeof window.nextspace !== "undefined") {
        info += "\u2705 window.nextspace (\uC874\uC7AC\uD568)\n";
        info += "Keys: " + Object.keys(window.nextspace).join(", ") + "\n\n";
      } else {
        info += "\u274C window.nextspace (\uC5C6\uC74C)\n\n";
      }
      let lsAuthInfo = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.toLowerCase().includes("user") || key.toLowerCase().includes("auth") || key.toLowerCase().includes("token") || key.toLowerCase().includes("role") || key.toLowerCase().includes("profile")) {
          lsAuthInfo.push(key + ": " + localStorage.getItem(key));
        }
      }
      info += "\u2705 LocalStorage \uAD00\uB828 \uB370\uC774\uD130:\n" + (lsAuthInfo.length > 0 ? lsAuthInfo.join("\n") : "\uC5C6\uC74C") + "\n\n";
      let ssAuthInfo = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key.toLowerCase().includes("user") || key.toLowerCase().includes("auth") || key.toLowerCase().includes("token") || key.toLowerCase().includes("role") || key.toLowerCase().includes("profile")) {
          ssAuthInfo.push(key + ": " + sessionStorage.getItem(key));
        }
      }
      info += "\u2705 SessionStorage \uAD00\uB828 \uB370\uC774\uD130:\n" + (ssAuthInfo.length > 0 ? ssAuthInfo.join("\n") : "\uC5C6\uC74C");
      alert(info);
    });
  }
}
function reRenderLocal(container) {
  container.innerHTML = renderNoticePage();
  renderNoticePageInit(container);
}

// plugin/components/pages/EnergyPage.js
function renderEnergyPage() {
  return `
        <div class="energy-page">
            <div style="background: white; border-radius: 12px; border: 1px solid var(--border-color); padding: 25px; margin-bottom: 25px;">
                <h3 style="margin-top:0; color:var(--hyundai-navy);">\uC5D0\uB108\uC9C0 \uC2E4\uC2DC\uAC04 \uBD84\uC11D</h3>
                <p style="color:#666; font-size:14px;">\uC120\uD0DD\uB41C \uACC4\uD1B5\uC758 \uC2E4\uC2DC\uAC04 \uC5D0\uB108\uC9C0 \uD750\uB984 \uBC0F \uC0AC\uC6A9 \uD328\uD134\uC744 \uBD84\uC11D\uD569\uB2C8\uB2E4.</p>
            </div>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                <div style="background: white; border-radius: 12px; border: 1px solid var(--border-color); height: 200px; padding:20px;">
                    <div style="font-weight:700; font-size:14px; margin-bottom:15px;">\uBD80\uD558 \uD328\uD134</div>
                    <div style="height:120px; background:#f8f9fa; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#ccc;">Chart Area</div>
                </div>
                <div style="background: white; border-radius: 12px; border: 1px solid var(--border-color); height: 200px; padding:20px;">
                    <div style="font-weight:700; font-size:14px; margin-bottom:15px;">\uC5ED\uB960 \uAD00\uB9AC</div>
                    <div style="height:120px; background:#f8f9fa; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#ccc;">Chart Area</div>
                </div>
            </div>
        </div>
    `;
}

// plugin/utils/Logger.js
function log(message, data) {
  const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  if (data) {
    console.log(`[Plugin ${timestamp}] ${message}:`, data);
  } else {
    console.log(`[Plugin ${timestamp}] ${message}`);
  }
}

// plugin/core.js
function initializePlugin(params, deps) {
  const {
    WindowManager: WindowManager2,
    menuConfig: menuConfig2,
    sidebarItems: sidebarItems2,
    renderExternalShell: renderExternalShell2,
    SHELL_STYLES: SHELL_STYLES2,
    componentsMap,
    log: log2
  } = deps;
  let currentState = {
    sidebarItems: sidebarItems2,
    currentMainId: "dashboard",
    currentSubTabs: menuConfig2.dashboard.subTabs,
    currentSubId: menuConfig2.dashboard.defaultTab,
    mainTitle: menuConfig2.dashboard.title
  };
  const hintId = "FEMS_External_Hint_Board";
  params.element.innerHTML = `
        <div id="${hintId}" style="background: white; color: #1D3A6F; padding: 15px 25px; border-radius: 12px; font-weight: 600; 
                    position: absolute; left: 50px; top: 60px; border: 2px solid #0072CE; 
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 1000; display: flex; align-items: center; gap: 12px; pointer-events: none;">
            <div style="width:10px; height:10px; border-radius:50%; background:#00C7B1;"></div>
            <span>FEMS \uD1B5\uD569 \uAD00\uC81C \uC2DC\uC2A4\uD15C\uC774 \uC0C8 \uCC3D\uC5D0\uC11C \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4.</span>
        </div>
    `;
  const winManager = new WindowManager2({
    onClose: () => {
      log2("Dashboard window closed.");
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
    const shellHtml = renderExternalShell2(currentState);
    winManager.injectTemplate(shellHtml, SHELL_STYLES2);
    const filterBar = popup.document.getElementById("DashboardFilterBar");
    if (filterBar) {
      filterBar.style.display = currentState.currentSubId === "notice" ? "none" : "flex";
    }
    renderPage();
    bindEvents();
  }
  function renderPage() {
    var _a, _b;
    const config = menuConfig2[currentState.currentMainId];
    if (!config) return;
    const tab = config.subTabs.find((t) => t.id === currentState.currentSubId);
    const rendererName = tab ? tab.component : config.subTabs[0].component;
    const contentViewport = popup.document.getElementById("ContentViewport");
    if (contentViewport) {
      const renderer = componentsMap[rendererName];
      if (typeof renderer === "function") {
        const site = ((_a = popup.document.getElementById("SiteFilterSelect")) == null ? void 0 : _a.value) || "all";
        const date = ((_b = popup.document.getElementById("DateFilterInput")) == null ? void 0 : _b.value) || "";
        contentViewport.innerHTML = renderer({ site, date });
        const initHook = componentsMap[rendererName + "Init"];
        if (typeof initHook === "function") {
          initHook(contentViewport);
        }
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
    var _a, _b;
    if (!popup || popup.closed) return;
    const icon = popup.document.querySelector("#HeaderRefreshButton .header-icon");
    if (icon) icon.classList.add("spin");
    updateHeaderClock();
    setDefaultDateFilter();
    const site = ((_a = popup.document.getElementById("SiteFilterSelect")) == null ? void 0 : _a.value) || "all";
    const date = ((_b = popup.document.getElementById("DateFilterInput")) == null ? void 0 : _b.value) || "";
    log2("Dashboard refresh requested", { source, site, date, tab: currentState.currentSubId });
    renderPage();
    if (icon) setTimeout(() => icon.classList.remove("spin"), 700);
  }
  function formatCurrentKst() {
    const now = /* @__PURE__ */ new Date();
    const datePart = now.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).replace(/\.$/, "").replace(/\.\s/g, "-").replace(/\./g, "");
    const timePart = now.toLocaleTimeString("ko-KR", { hour12: false });
    return `${datePart} ${timePart} \uAE30\uC900`;
  }
  function updateHeaderClock() {
    if (!popup || popup.closed) return;
    const clockEl = popup.document.getElementById("CurrentDateTime");
    if (clockEl) clockEl.textContent = formatCurrentKst();
  }
  function setDefaultDateFilter() {
    const dateInput = popup.document.getElementById("DateFilterInput");
    if (!dateInput || dateInput.value) return;
    const now = /* @__PURE__ */ new Date();
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
      try {
        clearInterval(clockTimer);
      } catch (_2) {
      }
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
    }, 1e3);
  }
  function switchMainCategory(mainId) {
    if (currentState.currentMainId === mainId) return;
    const config = menuConfig2[mainId];
    if (!config) return;
    currentState.currentMainId = mainId;
    currentState.currentSubTabs = config.subTabs;
    currentState.currentSubId = config.defaultTab;
    currentState.mainTitle = config.title;
    initUI();
    log2(`Switched to Main Category: ${config.title}`);
  }
  function switchSubTab(subId) {
    if (currentState.currentSubId === subId) return;
    currentState.currentSubId = subId;
    const tabs = popup.document.querySelectorAll(".sub-tab");
    tabs.forEach((t) => {
      t.classList.toggle("active", t.getAttribute("data-sub-id") === subId);
    });
    const filterBar = popup.document.getElementById("DashboardFilterBar");
    if (filterBar) {
      filterBar.style.display = subId === "notice" ? "none" : "flex";
    }
    renderPage();
    log2(`Switched to Sub Tab: ${subId}`);
  }
  return () => {
    log2("Disposing FEMS Plugin Core.");
    clearClockTimer();
    const hint = params.element.querySelector(`#${hintId}`);
    if (hint) hint.remove();
  };
}

// plugin/deployEntry.js
function Run(params) {
  const componentsMap = {
    renderOverviewPage,
    renderNoticePage,
    renderNoticePageInit,
    renderEnergyPage,
    renderBuildingPage: () => `<div style="padding:50px; text-align:center; color:#999;">\uAC74\uBB3C\uBCC4 \uC0C1\uC138 \uD604\uD669 \uD398\uC774\uC9C0 \uC900\uBE44 \uC911...</div>`
  };
  log("[FEMS Plugin] Initializing (Deploy Mode via core.js)...");
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
export {
  Run
};
