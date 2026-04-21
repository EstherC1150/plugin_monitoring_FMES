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
    const height = 850;
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
function renderOverviewPage() {
  const kpis = [
    {
      title: "\uC804\uB825 \uC0AC\uC6A9\uD604\uD669",
      value: "12,450",
      unit: "kWh",
      subLabel: "\uC804\uC77C",
      subValue: "11,890 kWh",
      deltaText: "4.7%",
      deltaDir: "up",
      iconBg: "#1f4c8f",
      iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`
    },
    {
      title: "LNG \uC0AC\uC6A9\uD604\uD669",
      value: "850",
      unit: "m\xB3",
      subLabel: "\uC804\uC77C",
      subValue: "890 m\xB3",
      deltaText: "4.5%",
      deltaDir: "down",
      iconBg: "#f97316",
      iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2s4 4 4 8a4 4 0 1 1-8 0c0-4 4-8 4-8z"></path><path d="M8.5 14.5c.5 2.5 2.5 4 3.5 4s3-1.5 3.5-4"></path></svg>`
    },
    {
      title: "\uC2A4\uD300 \uC0AC\uC6A9\uD604\uD669",
      value: "42.5",
      unit: "Ton",
      subLabel: "\uC804\uC77C",
      subValue: "41.8 Ton",
      deltaText: "0.7%",
      deltaDir: "up",
      iconBg: "#14b8a6",
      iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12c2.5-3 5.5-3 8 0s5.5 3 10 0"></path><path d="M3 18c2.5-3 5.5-3 8 0s5.5 3 10 0"></path><path d="M3 6c2.5-3 5.5-3 8 0s5.5 3 10 0"></path></svg>`
    },
    {
      title: "\uC555\uCD95\uACF5\uAE30 \uC0AC\uC6A9\uD604\uD669",
      value: "2,150",
      unit: "Nm\xB3",
      subLabel: "\uC804\uC77C",
      subValue: "2,200 Nm\xB3",
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
      cells: ["45,200", "125,400", "350,200", "12,500", "185.4"]
    },
    {
      label: "\uAE08\uB144 \uB204\uACC4 (1~3\uC6D4)",
      labelClass: "row-label emph",
      cells: ["128,500", "365,800", "1,020,500", "38,200", "542.8"]
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
  const weekday = [120, 115, 118, 110, 105, 108, 125, 130, 118, 112, 114, 122];
  const weekend = [95, 92, 90, 86, 82, 84, 98, 102, 96, 90, 92, 97];
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
                <div class="block-title">\uC804\uC6D4 / \uB204\uACC4 \uC2E4\uC801 \uD604\uD669</div>
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
function renderNoticePage() {
  return `
        <div class="notice-page" style="display:flex; flex-direction:column; gap:14px;">
            <div style="background:#fff; border:1px solid var(--border-color); border-radius:12px; padding:18px 20px;">
                <div style="font-size:16px; font-weight:700; color:var(--hyundai-navy); margin-bottom:6px;">\uACF5\uC9C0\uC0AC\uD56D</div>
                <div style="font-size:13px; color:#6b7280;">\uC6B4\uC601 \uACF5\uC9C0\uC640 \uC2DC\uC2A4\uD15C \uC810\uAC80 \uC77C\uC815\uC744 \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.</div>
            </div>
            <div style="background:#fff; border:1px solid var(--border-color); border-radius:12px; overflow:hidden;">
                <div style="display:grid; grid-template-columns: 120px 1fr 140px; gap:12px; padding:12px 18px; font-size:13px; font-weight:600; color:#4b5563; background:#f8fafc; border-bottom:1px solid var(--border-color);">
                    <div>\uAD6C\uBD84</div>
                    <div>\uC81C\uBAA9</div>
                    <div>\uB4F1\uB85D\uC77C</div>
                </div>
                <div style="display:grid; grid-template-columns: 120px 1fr 140px; gap:12px; padding:14px 18px; font-size:14px; border-bottom:1px solid var(--border-color);">
                    <div style="color:#0f766e; font-weight:600;">\uC6B4\uC601</div>
                    <div>[\uC548\uB0B4] 4\uC6D4 \uC5D0\uB108\uC9C0 \uB9AC\uD3EC\uD2B8 \uAC8C\uC2DC \uC608\uC815</div>
                    <div style="color:#6b7280;">2026-04-16</div>
                </div>
                <div style="display:grid; grid-template-columns: 120px 1fr 140px; gap:12px; padding:14px 18px; font-size:14px;">
                    <div style="color:#92400e; font-weight:600;">\uC810\uAC80</div>
                    <div>[\uC810\uAC80] \uB370\uC774\uD130 \uC218\uC9D1 \uC11C\uBC84 \uC815\uAE30 \uC810\uAC80 (04/20 02:00~04:00)</div>
                    <div style="color:#6b7280;">2026-04-15</div>
                </div>
            </div>
        </div>
    `;
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
    renderPage();
    bindEvents();
  }
  function renderPage() {
    const config = menuConfig2[currentState.currentMainId];
    if (!config) return;
    const tab = config.subTabs.find((t) => t.id === currentState.currentSubId);
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
