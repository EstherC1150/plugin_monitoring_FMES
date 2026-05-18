/**
 * 에너지 통합 대시보드 페이지
 */

const PAGE_STYLES = `
    .energy-integration {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-bottom: 12px;
    }

    .section-title-wrap {
        font-size: 16px;
        font-weight: 800;
        color: #111827;
        margin-bottom: 6px;
    }

    /* KPI Cards */
    .kpi-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    .kpi-card {
        background: #ffffff;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        padding: 12px 16px;
    }

    .kpi-header {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 8px;
    }

    .kpi-body {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .kpi-stats {
        text-align: left;
    }

    .stat-label {
        font-size: 12px;
        color: #6b7280;
        font-weight: 500;
        margin-bottom: 2px;
    }

    .stat-value {
        font-size: 15px;
        font-weight: 700;
        color: #111827;
        margin-bottom: 8px;
    }

    .stat-value:last-child {
        margin-bottom: 0;
    }

    /* Data Table */
    .table-container {
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        overflow: hidden;
    }

    .data-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
        text-align: center;
    }

    .data-table th {
        background: #f8fafc;
        padding: 12px 8px;
        font-weight: 600;
        color: #4b5563;
        border-bottom: 1px solid #e5e7eb;
        border-right: 1px solid #e5e7eb;
    }

    .data-table td {
        padding: 10px 8px;
        color: #374151;
        border-bottom: 1px solid #e5e7eb;
        border-right: 1px solid #e5e7eb;
    }

    .data-table th:last-child,
    .data-table td:last-child {
        border-right: none;
    }

    .data-table tbody tr:last-child td {
        border-bottom: none;
    }

    .td-category {
        background: #f8fafc;
        font-weight: 600;
        color: #4b5563;
    }
    
    .td-item {
        text-align: left;
        padding-left: 16px !important;
        color: #4b5563;
    }
    
    .td-total {
        font-weight: 700;
        color: #111827;
    }
    
    .td-note {
        text-align: left;
        color: #6b7280;
    }
`;

function renderGauge(percent, color) {
    const r = 40;
    const c = Math.PI * r;
    const offset = c * (1 - percent / 100);
    return `
        <div style="position:relative; width: 100px; height: 50px; display:flex; justify-content:center; align-items:flex-end;">
            <svg viewBox="0 0 100 60" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" stroke-width="12" stroke-linecap="round" />
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round" 
                      stroke-dasharray="${c}" stroke-dashoffset="${offset}" />
            </svg>
            <div style="font-size:16px; font-weight:800; color:${color}; line-height:1; margin-bottom: 2px;">
                ${percent}%
            </div>
        </div>
    `;
}

export function renderEnergyIntegrationPage(filters = {}) {
    return `
        <style>${PAGE_STYLES}</style>
        <div class="energy-integration">
            
            <!-- Section 1 -->
            <div>
                <div class="section-title-wrap">1) KPI 운영 현황 (에너지 목표량 종합실적)</div>
                <div class="kpi-grid">
                    <!-- Electricity -->
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004d99" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                            전력(Electricity)
                        </div>
                        <div class="kpi-body">
                            ${renderGauge(82, '#004d99')}
                            <div class="kpi-stats">
                                <div class="stat-label">연간 목표 / 실적</div>
                                <div class="stat-value">18,000 / 14,760 MWh</div>
                                <div class="stat-label">누적 비용</div>
                                <div class="stat-value">21.5 억원</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- LNG -->
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                            LNG(Gas)
                        </div>
                        <div class="kpi-body">
                            ${renderGauge(45, '#f59e0b')}
                            <div class="kpi-stats">
                                <div class="stat-label">연간 목표 / 실적</div>
                                <div class="stat-value">18,500 / 8,325 Nm³</div>
                                <div class="stat-label">누적 비용</div>
                                <div class="stat-value">6.2 억원</div>
                            </div>
                        </div>
                    </div>

                    <!-- Oil -->
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M8 6h8"/><path d="M6 10h12"/><path d="M4 14h16"/><path d="M5 18h14"/></svg>
                            유류(Oil)
                        </div>
                        <div class="kpi-body">
                            ${renderGauge(12, '#78350f')}
                            <div class="kpi-stats">
                                <div class="stat-label">연간 목표 / 실적</div>
                                <div class="stat-value">10,000 / 1,200 L</div>
                                <div class="stat-label">누적 비용</div>
                                <div class="stat-value">0.8 억원</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 2 -->
            <div>
                <div class="section-title-wrap">2) 사업장 KPI 운영 현황 (대상공장 및 대상장비 현황)</div>
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>장비</th>
                                <th>1공장</th>
                                <th>2공장</th>
                                <th>3공장</th>
                                <th>4공장</th>
                                <th>5공장</th>
                                <th>경합금</th>
                                <th>기타</th>
                                <th>계</th>
                                <th>용도 및 비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- 원동설비 Group -->
                            <tr>
                                <td rowspan="5" class="td-category">원동설비<br>(Power)</td>
                                <td class="td-item">에어 컴프레서</td>
                                <td>2</td><td>2</td><td>2</td><td>2</td><td>3</td><td>1</td><td>1</td><td class="td-total">13</td><td class="td-note">공장 압축공기</td>
                            </tr>
                            <tr>
                                <td class="td-item">드라이어</td>
                                <td>1</td><td>2</td><td>1</td><td>2</td><td>2</td><td>1</td><td>1</td><td class="td-total">10</td><td class="td-note">공장 압축공기</td>
                            </tr>
                            <tr>
                                <td class="td-item">냉각탑</td>
                                <td>8</td><td>7</td><td>8</td><td>6</td><td>8</td><td>5</td><td>4</td><td class="td-total">46</td><td class="td-note">공업용수/냉각</td>
                            </tr>
                            <tr>
                                <td class="td-item">보일러</td>
                                <td>-</td><td>1</td><td>-</td><td>-</td><td>1</td><td>-</td><td>-</td><td class="td-total">2</td><td class="td-note">스팀/급탕 공급</td>
                            </tr>
                            <tr>
                                <td class="td-item">펌프</td>
                                <td>15</td><td>12</td><td>16</td><td>14</td><td>18</td><td>10</td><td>11</td><td class="td-total">96</td><td class="td-note">공업용수/순환</td>
                            </tr>

                            <!-- 공조설비 Group -->
                            <tr>
                                <td rowspan="6" class="td-category">공조설비<br>(HVAC)</td>
                                <td class="td-item">공조기</td>
                                <td>12</td><td>10</td><td>15</td><td>12</td><td>14</td><td>8</td><td>4</td><td class="td-total">75</td><td class="td-note">조립라인 냉방</td>
                            </tr>
                            <tr>
                                <td class="td-item">배기팬</td>
                                <td>25</td><td>22</td><td>28</td><td>20</td><td>30</td><td>15</td><td>12</td><td class="td-total">152</td><td class="td-note">고열배기/환기</td>
                            </tr>
                            <tr>
                                <td class="td-item">냉각탑</td>
                                <td>3</td><td>2</td><td>4</td><td>3</td><td>4</td><td>2</td><td>2</td><td class="td-total">20</td><td class="td-note">냉동기 냉각</td>
                            </tr>
                            <tr>
                                <td class="td-item">펌프</td>
                                <td>3</td><td>2</td><td>3</td><td>2</td><td>4</td><td>2</td><td>1</td><td class="td-total">17</td><td class="td-note">냉각수/냉수 순환</td>
                            </tr>
                            <tr>
                                <td class="td-item">냉동기/냉온수기</td>
                                <td>2</td><td>1</td><td>2</td><td>1</td><td>2</td><td>1</td><td>1</td><td class="td-total">10</td><td class="td-note">조립라인 냉수</td>
                            </tr>
                            <tr>
                                <td class="td-item">EHP (시스템에어컨)</td>
                                <td>120</td><td>110</td><td>140</td><td>115</td><td>150</td><td>100</td><td>90</td><td class="td-total">825</td><td class="td-note">사무실 냉난방</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    `;
}

const USAGE_STYLES = `
    .usage-tab {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
    }
    
    .usage-row {
        display: flex;
        gap: 16px;
    }
    
    .usage-card {
        flex: 1;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        padding: 16px;
        position: relative;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    
    .card-border-navy { border-left: 6px solid #004d99; }
    .card-border-orange { border-left: 6px solid #f59e0b; }
    .card-border-teal { border-left: 6px solid #14b8a6; }
    .card-border-gray { border-left: 6px solid #6b7280; }
    
    .u-card-title {
        font-size: 13px;
        color: #6b7280;
        font-weight: 500;
        margin-bottom: 8px;
    }
    
    .u-card-val {
        font-size: 24px;
        font-weight: 800;
        color: #111827;
        margin-bottom: 4px;
    }
    
    .u-card-sub {
        font-size: 12px;
        color: #9ca3af;
    }
    
    .u-card-icon {
        position: absolute;
        right: 16px;
        top: 24px;
        opacity: 0.8;
    }
    
    .usage-panel {
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        padding: 16px;
    }
    
    .panel-title {
        font-size: 15px;
        font-weight: 800;
        color: #111827;
        margin-bottom: 16px;
    }
    
    /* Line Chart specific */
    .line-chart-container {
        position: relative;
        height: 200px;
        width: 100%;
        margin-top: 10px;
    }
    
    .chart-legend {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        font-size: 11px;
        color: #4b5563;
        font-weight: 600;
        margin-bottom: 8px;
    }
    
    .chart-legend div {
        display: flex;
        align-items: center;
        gap: 4px;
    }
    
    .leg-circle {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid;
        background: white;
    }
    
    /* Y Axis Labels */
    .y-axis-label {
        position: absolute;
        font-size: 10px;
        color: #6b7280;
        transform: translateY(-50%);
    }
    
    .y-axis-left { left: 0; }
    .y-axis-right { right: 0; }
    
    .x-axis-label {
        position: absolute;
        bottom: -20px;
        font-size: 10px;
        color: #6b7280;
        transform: translateX(-50%);
    }

    /* Doughnut Chart Legend */
    .doughnut-legend-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .doughnut-legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #4b5563;
    }
    
    .d-leg-color {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }

    /* Table override */
    .table-container {
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        overflow: hidden;
    }
    .data-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
        text-align: center;
    }
    .data-table th {
        background: #f8fafc;
        padding: 12px 8px;
        font-weight: 600;
        color: #4b5563;
        border-bottom: 1px solid #e5e7eb;
        border-right: 1px solid #e5e7eb;
        border-top: 2px solid #004d99;
    }
    .data-table td {
        padding: 10px 8px;
        color: #374151;
        border-bottom: 1px solid #e5e7eb;
        border-right: 1px solid #e5e7eb;
    }
    .data-table th:last-child, .data-table td:last-child {
        border-right: none;
    }
    .data-table tbody tr:last-child td {
        border-bottom: none;
    }
    .td-category {
        background: #f8fafc;
        font-weight: 600;
        color: #4b5563;
    }
    .td-item {
        text-align: left;
        padding-left: 16px !important;
        color: #4b5563;
    }
    .td-total {
        font-weight: 700;
        color: #111827;
    }
`;

function renderUsageStatusTab() {
    // 15 days data
    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    const pwrData = [12500, 12800, 12600, 11500, 8500, 8200, 12400, 12900, 13100, 12800, 11800, 8900, 8600, 12700, 13200];
    const lngData = [750, 780, 770, 750, 500, 480, 750, 790, 810, 780, 750, 500, 480, 780, 790];
    const airData = [1950, 2000, 1980, 1900, 1300, 1250, 1980, 2050, 2100, 2000, 1900, 1400, 1350, 2000, 2050];
    
    const chartW = 800;
    const chartH = 200;
    const padX = 60;
    const padYTop = 20;
    const padYBot = 30;
    const drawH = chartH - padYTop - padYBot;
    
    // Y Axis scaling
    const pwrMin = 8000, pwrMax = 14000;
    const otherMin = 500, otherMax = 2500;
    
    const getPwrY = (v) => padYTop + drawH - ((v - pwrMin) / (pwrMax - pwrMin)) * drawH;
    const getOtherY = (v) => padYTop + drawH - ((v - otherMin) / (otherMax - otherMin)) * drawH;
    const getX = (i) => padX + (i / (days.length - 1)) * (chartW - 2 * padX);

    // Build SVG paths
    const pwrPath = pwrData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getPwrY(v)}`).join(' ');
    const lngPath = lngData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getOtherY(v)}`).join(' ');
    const airPath = airData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getOtherY(v)}`).join(' ');
    
    // Points
    const pwrPoints = pwrData.map((v, i) => `<circle cx="${getX(i)}" cy="${getPwrY(v)}" r="3" fill="#ffffff" stroke="#004d99" stroke-width="2"/>`).join('');
    const lngPoints = lngData.map((v, i) => `<circle cx="${getX(i)}" cy="${getOtherY(v)}" r="3" fill="#ffffff" stroke="#f59e0b" stroke-width="2"/>`).join('');
    const airPoints = airData.map((v, i) => `<circle cx="${getX(i)}" cy="${getOtherY(v)}" r="3" fill="#ffffff" stroke="#14b8a6" stroke-width="2"/>`).join('');
    
    // Grid Lines and Labels entirely inside SVG
    const gridAndYLabels = [0, 0.25, 0.5, 0.75, 1].map(ratio => {
        const topPos = padYTop + drawH * (1 - ratio);
        const pwrVal = pwrMin + (pwrMax - pwrMin) * ratio;
        const otherVal = otherMin + (otherMax - otherMin) * ratio;
        return `
            <line x1="${padX}" y1="${topPos}" x2="${chartW - padX}" y2="${topPos}" stroke="#e5e7eb" stroke-width="1"/>
            <text x="${padX - 10}" y="${topPos + 4}" text-anchor="end" font-size="11" fill="#6b7280">${pwrVal.toLocaleString()}</text>
            <text x="${chartW - padX + 10}" y="${topPos + 4}" text-anchor="start" font-size="11" fill="#6b7280">${otherVal.toLocaleString()}</text>
        `;
    }).join('');
    
    const xAxisLabels = days.map((d, i) => `
        <text x="${getX(i)}" y="${chartH - 5}" text-anchor="middle" font-size="11" fill="#6b7280">${d}일</text>
    `).join('');

    const axisTitles = `
        <text x="15" y="${padYTop + drawH/2}" transform="rotate(-90 15,${padYTop + drawH/2})" text-anchor="middle" font-size="12" fill="#4b5563" font-weight="bold">전력</text>
        <text x="${chartW - 15}" y="${padYTop + drawH/2}" transform="rotate(90 ${chartW - 15},${padYTop + drawH/2})" text-anchor="middle" font-size="12" fill="#4b5563" font-weight="bold">LNG/압축공기</text>
    `;

    return `
        <style>${USAGE_STYLES}</style>
        <div class="usage-tab">
            <!-- Top Cards -->
            <div class="usage-row">
                <div class="usage-card card-border-navy">
                    <div class="u-card-title">총 관리 장비 (대)</div>
                    <div class="u-card-val">1,276</div>
                    <div class="u-card-sub">&nbsp;</div>
                    <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#004d99" stroke-width="2"><rect x="2" y="4" width="20" height="6" rx="2"/><path d="M6 7h.01"/><rect x="2" y="14" width="20" height="6" rx="2"/><path d="M6 17h.01"/></svg>
                </div>
                <div class="usage-card card-border-orange">
                    <div class="u-card-title">원동설비 (대)</div>
                    <div class="u-card-val">172</div>
                    <div class="u-card-sub">(컴프레서, 펌프 등)</div>
                    <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </div>
                <div class="usage-card card-border-teal">
                    <div class="u-card-title">공조설비 (대)</div>
                    <div class="u-card-val">1,099</div>
                    <div class="u-card-sub">(공조기, EHP 등)</div>
                    <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="2"><path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <div class="usage-card card-border-gray">
                    <div class="u-card-title">금일 전력 사용량 (kWh)</div>
                    <div class="u-card-val">12,450</div>
                    <div class="u-card-sub">&nbsp;</div>
                    <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
            </div>

            <!-- Middle Charts -->
            <div class="usage-row" style="align-items: stretch;">
                <div class="usage-panel" style="flex: 2;">
                    <div class="panel-title">일별 에너지 사용 추이 (복합)</div>
                    
                    <div class="chart-legend">
                        <div><div class="leg-circle" style="border-color:#004d99;"></div> 전력 (kWh)</div>
                        <div><div class="leg-circle" style="border-color:#f59e0b;"></div> LNG (m³)</div>
                        <div><div class="leg-circle" style="border-color:#14b8a6;"></div> 압축공기 (Nm³)</div>
                    </div>
                    
                    <div class="line-chart-container">
                        <svg viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible; display:block;">
                            ${gridAndYLabels}
                            <path d="${pwrPath}" fill="none" stroke="#004d99" stroke-width="2.5" />
                            <path d="${lngPath}" fill="none" stroke="#f59e0b" stroke-width="2.5" />
                            <path d="${airPath}" fill="none" stroke="#14b8a6" stroke-width="2.5" />
                            ${pwrPoints}${lngPoints}${airPoints}
                            ${xAxisLabels}
                            ${axisTitles}
                        </svg>
                    </div>
                </div>
                
                <div class="usage-panel" style="flex: 1; display:flex; flex-direction:column;">
                    <div class="panel-title">에너지원별 사용 비중</div>
                    <div style="flex:1; display:flex; align-items:center; justify-content:center; gap:20px;">
                        <svg viewBox="0 0 100 100" width="140" height="140" style="transform: rotate(-90deg);">
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#004d99" stroke-width="26" stroke-dasharray="98.9 219.9" stroke-dashoffset="0" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" stroke-width="26" stroke-dasharray="43.9 219.9" stroke-dashoffset="-98.9" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#14b8a6" stroke-width="26" stroke-dasharray="32.9 219.9" stroke-dashoffset="-142.8" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#6b7280" stroke-width="26" stroke-dasharray="26.3 219.9" stroke-dashoffset="-175.7" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#854d0e" stroke-width="26" stroke-dasharray="17.5 219.9" stroke-dashoffset="-202.0" />
                            <!-- C = 2*PI*35 = 219.9. 45%, 20%, 15%, 12%, 8% -->
                        </svg>
                        <div class="doughnut-legend-list">
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#004d99;"></div>전력</div>
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#f59e0b;"></div>LNG</div>
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#14b8a6;"></div>압축공기</div>
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#6b7280;"></div>스팀</div>
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#854d0e;"></div>유량</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Table -->
            <div class="usage-panel">
                <div class="panel-title">사업장별 에너지 사용량 상세 (5월 누계)</div>
                <div class="table-container">
                    <table class="data-table usage-table">
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>전력 (kWh)</th>
                                <th>LNG (m³)</th>
                                <th>압축공기 (Nm³)</th>
                                <th>스팀 (Ton)</th>
                                <th>콤프레서 (kWh)</th>
                                <th>유량 (m³)</th>
                                <th>합계 (TOE)</th>
                            </tr>
                        </thead>
                            <tr>
                                <td class="td-category">울산 사업장</td>
                                <td>452,100</td><td>12,500</td><td>54,200</td><td>1,250</td><td>15,400</td><td>45,200</td><td class="td-total">125.4</td>
                            </tr>
                            <tr>
                                <td class="td-category">서산 사업장</td>
                                <td>385,400</td><td>10,200</td><td>48,500</td><td>980</td><td>12,100</td><td>38,500</td><td class="td-total">108.2</td>
                            </tr>
                            <tr>
                                <td class="td-category">성남 사업장</td>
                                <td>150,200</td><td>5,400</td><td>21,300</td><td>450</td><td>5,200</td><td>15,800</td><td class="td-total">42.1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    `;
}

function renderCostStatusTab() {
    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    const pwrCost = [3200, 3100, 3300, 3100, 2800, 2750, 3400, 3450, 3300, 3250, 3100, 2900, 2850, 3500, 3550];
    const lngCost = [900, 850, 950, 850, 800, 750, 1000, 1050, 950, 900, 850, 800, 750, 1050, 1100];
    
    const chartW = 800;
    const chartH = 200;
    const padX = 60;
    const padYTop = 20;
    const padYBot = 30;
    const drawH = chartH - padYTop - padYBot;
    
    const maxCost = 4000;
    const minCost = 0;
    
    const getY = (v) => padYTop + drawH - ((v - minCost) / (maxCost - minCost)) * drawH;
    const getX = (i) => padX + (i / (days.length - 1)) * (chartW - 2 * padX);

    // Area paths
    const pwrAreaPath = `M ${getX(0)} ${getY(0)} ` + pwrCost.map((v, i) => `L ${getX(i)} ${getY(v)}`).join(' ') + ` L ${getX(days.length-1)} ${getY(0)} Z`;
    const lngAreaPath = `M ${getX(0)} ${getY(0)} ` + lngCost.map((v, i) => `L ${getX(i)} ${getY(v)}`).join(' ') + ` L ${getX(days.length-1)} ${getY(0)} Z`;
    
    const pwrLinePath = pwrCost.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(v)}`).join(' ');
    const lngLinePath = lngCost.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(v)}`).join(' ');
    
    const pwrPoints = pwrCost.map((v, i) => `<circle cx="${getX(i)}" cy="${getY(v)}" r="3" fill="#ffffff" stroke="#004d99" stroke-width="2"/>`).join('');
    const lngPoints = lngCost.map((v, i) => `<circle cx="${getX(i)}" cy="${getY(v)}" r="3" fill="#ffffff" stroke="#f59e0b" stroke-width="2"/>`).join('');
    
    const gridAndYLabels = [0, 0.25, 0.5, 0.75, 1].map(ratio => {
        const topPos = padYTop + drawH * (1 - ratio);
        const val = minCost + (maxCost - minCost) * ratio;
        return `
            <line x1="${padX}" y1="${topPos}" x2="${chartW - padX}" y2="${topPos}" stroke="#e5e7eb" stroke-width="1"/>
            <text x="${padX - 10}" y="${topPos + 4}" text-anchor="end" font-size="11" fill="#6b7280">${val.toLocaleString()}</text>
        `;
    }).join('');
    
    const xAxisLabels = days.map((d, i) => `
        <text x="${getX(i)}" y="${chartH - 5}" text-anchor="middle" font-size="11" fill="#6b7280">${d}일</text>
    `).join('');

    return `
        <style>
            ${USAGE_STYLES}
            .trend-text { font-size: 12px; display:flex; align-items:center; gap:2px; margin-top:6px; font-weight:500; }
            .trend-up { color: #dc2626; }
            .trend-down { color: #16a34a; }
            .cost-card { flex:1; background:#fff; border-radius:8px; border:1px solid #e5e7eb; padding:16px; position:relative; box-shadow:0 1px 2px rgba(0,0,0,0.05); }
        </style>
        <div class="usage-tab">
            <!-- Top Cards -->
            <div class="usage-row">
                <div class="cost-card" style="border-left: 6px solid #111827;">
                    <div class="u-card-title">총 에너지 비용 (천원)</div>
                    <div class="u-card-val">125,400 <span style="font-size:12px; color:#6b7280; font-weight:500;">(당월 누계)</span></div>
                    <div class="trend-text trend-down">전년 동월 대비: 2.5% 절감
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                </div>
                <div class="cost-card" style="border-left: 6px solid #004d99;">
                    <div class="u-card-title">전력 비용 (천원)</div>
                    <div class="u-card-val">98,250 <span style="font-size:12px; color:#6b7280; font-weight:500;">(78.3%)</span></div>
                    <div class="trend-text trend-up">전월 대비: 1.2% 증가
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    </div>
                    <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#004d99" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div class="cost-card" style="border-left: 6px solid #f59e0b;">
                    <div class="u-card-title">LNG 비용 (천원)</div>
                    <div class="u-card-val">27,150 <span style="font-size:12px; color:#6b7280; font-weight:500;">(21.7%)</span></div>
                    <div class="trend-text trend-down">전월 대비: 4.8% 감소
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                </div>
            </div>

            <!-- Middle Charts -->
            <div class="usage-row" style="align-items: stretch;">
                <div class="usage-panel" style="flex: 2;">
                    <div class="panel-title">일별 에너지 비용 추이 (5월)</div>
                    
                    <div class="chart-legend">
                        <div><div class="leg-circle" style="border-color:#004d99; background: rgba(0,77,153,0.1);"></div> 전력 비용 (천원)</div>
                        <div><div class="leg-circle" style="border-color:#f59e0b; background: rgba(245,158,11,0.1);"></div> LNG 비용 (천원)</div>
                    </div>
                    
                    <div class="line-chart-container">
                        <svg viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible; display:block;">
                            ${gridAndYLabels}
                            <path d="${pwrAreaPath}" fill="rgba(0, 77, 153, 0.08)" stroke="none" />
                            <path d="${lngAreaPath}" fill="rgba(245, 158, 11, 0.08)" stroke="none" />
                            <path d="${pwrLinePath}" fill="none" stroke="#004d99" stroke-width="2.5" />
                            <path d="${lngLinePath}" fill="none" stroke="#f59e0b" stroke-width="2.5" />
                            ${pwrPoints}${lngPoints}
                            ${xAxisLabels}
                        </svg>
                    </div>
                </div>
                
                <div class="usage-panel" style="flex: 1; display:flex; flex-direction:column;">
                    <div class="panel-title">사업장별 비용 점유율</div>
                    <div style="flex:1; display:flex; align-items:center; justify-content:center; gap:20px;">
                        <svg viewBox="0 0 100 100" width="140" height="140" style="transform: rotate(-90deg);">
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#001f4d" stroke-width="26" stroke-dasharray="101.1 219.9" stroke-dashoffset="0" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#004d99" stroke-width="26" stroke-dasharray="85.3 219.9" stroke-dashoffset="-101.1" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#93c5fd" stroke-width="26" stroke-dasharray="33.5 219.9" stroke-dashoffset="-186.4" />
                            <!-- 울산 46%, 서산 38.8%, 성남 15.2% -->
                        </svg>
                        <div class="doughnut-legend-list">
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#001f4d;"></div>울산 사업장</div>
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#004d99;"></div>서산 사업장</div>
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#93c5fd;"></div>성남 사업장</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Table -->
            <div class="usage-panel">
                <div class="panel-title">사업장별 상세 비용 현황 (단위: 천원)</div>
                <div class="table-container">
                    <table class="data-table usage-table">
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>전력 비용</th>
                                <th>LNG 비용</th>
                                <th>합계</th>
                                <th>비중(%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="td-category">울산 사업장</td>
                                <td>45,200</td><td>12,500</td><td class="td-total">57,700</td><td>46.0%</td>
                            </tr>
                            <tr>
                                <td class="td-category">서산 사업장</td>
                                <td>38,500</td><td>10,200</td><td class="td-total">48,700</td><td>38.8%</td>
                            </tr>
                            <tr>
                                <td class="td-category">성남 사업장</td>
                                <td>15,200</td><td>3,800</td><td class="td-total">19,000</td><td>15.2%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderUnitStatusTab() {
    // 1. 월별 원단위 및 생산량 추이 데이터 (1월~12월)
    const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
    const prodData = [42, 45, 48, 44, 46, 49, 52, 55, 51, 53, 56, 54]; // 생산량 (Bar)
    const pwrUnitTrend = [8.5, 8.3, 8.2, 8.0, 7.8, 8.1, 9.2, 9.5, 8.4, 8.0, 8.1, 8.6]; // 전력 원단위 (Line1)
    const lngUnitTrend = [10.2, 9.8, 8.2, 7.3, 6.8, 6.4, 6.3, 6.2, 6.8, 7.8, 9.0, 10.5]; // LNG 원단위 (Line2)
    
    // 2. 사업장별 전력 원단위 비교 (5월)
    const factories = ['울산 사업장', '서산 사업장', '성남 사업장'];
    const factoryPwrUnit = [10.0, 6.6, 8.2];
    const factoryColors = ['#dc2626', '#16a34a', '#001f4d'];

    // --- Chart 1: 월별 추이 (Mixed) ---
    const cw1 = 800, ch1 = 200;
    const chartStartX1 = 60; 
    const chartEndX1 = cw1 - 40;
    const dw1 = chartEndX1 - chartStartX1;
    const dh1 = ch1 - 30 - 30;
    
    const slotW1 = dw1 / months.length;
    const getX1 = (i) => chartStartX1 + (i + 0.5) * slotW1;
    const getY1Pwr = (v) => 30 + dh1 - ((v - 5) / (14 - 5)) * dh1; 
    const getY1Lng = (v) => 30 + dh1 - ((v - 0) / (14 - 0)) * dh1; 
    const getBarH = (v) => (v / 70) * dh1;

    const bars = prodData.map((v, i) => {
        const x = getX1(i) - 12; // Centered
        const h = getBarH(v);
        return `<rect x="${x}" y="${30 + dh1 - h}" width="24" height="${h}" fill="#cffafe" rx="2" />`;
    }).join('');

    const pwrTrendPath = pwrUnitTrend.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX1(i)} ${getY1Pwr(v)}`).join(' ');
    const lngTrendPath = lngUnitTrend.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX1(i)} ${getY1Lng(v)}`).join(' ');
    
    const pwrTrendPoints = pwrUnitTrend.map((v, i) => `<circle cx="${getX1(i)}" cy="${getY1Pwr(v)}" r="3.5" fill="#ffffff" stroke="#001f4d" stroke-width="2"/>`).join('');
    const lngTrendPoints = lngUnitTrend.map((v, i) => `<circle cx="${getX1(i)}" cy="${getY1Lng(v)}" r="3.5" fill="#ffffff" stroke="#f59e0b" stroke-width="2"/>`).join('');

    const gridX1 = [5, 6, 8, 10, 12, 14].map(v => {
        const y = getY1Pwr(v);
        return `<line x1="${chartStartX1}" y1="${y}" x2="${chartEndX1}" y2="${y}" stroke="#f3f4f6" stroke-width="1"/>
                <text x="${chartStartX1 - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="#9ca3af">${v}</text>`;
    }).join('');

    const xLabels1 = months.map((m, i) => `<text x="${getX1(i)}" y="${ch1 - 5}" text-anchor="middle" font-size="11" fill="#4b5563">${m}</text>`).join('');

    // --- Chart 2: 사업장별 비교 (Bar) ---
    const cw2 = 400, ch2 = 200;
    const chartStartX2 = 50;
    const chartEndX2 = cw2 - 20;
    const dw2 = chartEndX2 - chartStartX2;
    const dh2 = ch2 - 20 - 30;
    
    const slotW2 = dw2 / factories.length;
    const getY2 = (v) => 20 + dh2 - (v / 12) * dh2; 
    const getX2 = (i) => chartStartX2 + (i + 0.5) * slotW2;

    const factoryBars = factoryPwrUnit.map((v, i) => {
        const x = getX2(i) - 22; // Wider bars
        const h = (v / 12) * dh2;
        return `<rect x="${x}" y="${20 + dh2 - h}" width="44" height="${h}" fill="${factoryColors[i]}" />`;
    }).join('');

    const gridY2 = [0, 2, 4, 6, 8, 10, 12].map(v => {
        const y = getY2(v);
        return `<line x1="${chartStartX2}" y1="${y}" x2="${chartEndX2}" y2="${y}" stroke="#f3f4f6" stroke-width="1"/>
                <text x="${chartStartX2 - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="#9ca3af">${v}</text>`;
    }).join('');
    
    const xLabels2 = factories.map((f, i) => `<text x="${getX2(i)}" y="${ch2 - 5}" text-anchor="middle" font-size="10" fill="#4b5563">${f}</text>`).join('');

    return `
        <style>
            ${USAGE_STYLES}
            .unit-tab-wrap { display: flex; flex-direction: column; gap: 16px; }
            .unit-card { flex:1; background:#fff; border-radius:12px; border:1px solid #e5e7eb; padding:20px; position:relative; box-shadow:0 1px 3px rgba(0,0,0,0.05); }
            .unit-card-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; }
            .unit-card-title { font-size:13px; color:#6b7280; font-weight:500; }
            .unit-card-goal { font-size:12px; color:#6b7280; }
            .unit-card-body { display:flex; align-items:baseline; gap:6px; }
            .unit-card-val { font-size:28px; font-weight:700; color:#111827; }
            .unit-card-unit { font-size:14px; color:#6b7280; }
            .card-accent-blue { border-left: 6px solid #004d99; }
            .card-accent-orange { border-left: 6px solid #f59e0b; }
            .card-accent-teal { border-left: 6px solid #14b8a6; }
        </style>
        <div class="unit-tab-wrap">
            <!-- Top Cards -->
            <div class="usage-row">
                <div class="unit-card card-accent-blue">
                    <div class="unit-card-header">
                        <div class="unit-card-title">전력 원단위 (kWh/EA)</div>
                        <div class="unit-card-goal">목표: 8.0 <span style="color:#dc2626;">+ 2.5%</span></div>
                    </div>
                    <div class="unit-card-body">
                        <div class="unit-card-val">8.2</div>
                        <div class="unit-card-unit">(평균)</div>
                    </div>
                </div>
                <div class="unit-card card-accent-orange">
                    <div class="unit-card-header">
                        <div class="unit-card-title">LNG 원단위 (m³/EA)</div>
                        <div class="unit-card-goal">목표: 0.30 <span style="color:#16a34a;">- 6.7%</span></div>
                    </div>
                    <div class="unit-card-body">
                        <div class="unit-card-val">0.28</div>
                        <div class="unit-card-unit">(평균)</div>
                    </div>
                </div>
                <div class="unit-card card-accent-teal">
                    <div class="unit-card-header">
                        <div class="unit-card-title">종합 원단위 (KTOE/EA)</div>
                        <div class="unit-card-goal">목표: 0.0025 <span style="color:#16a34a;">- 4.0%</span></div>
                    </div>
                    <div class="unit-card-body">
                        <div class="unit-card-val">0.0024</div>
                        <div class="unit-card-unit">(평균)</div>
                    </div>
                </div>
            </div>

            <!-- Middle Charts -->
            <div class="usage-row" style="align-items: stretch;">
                <div class="usage-panel" style="flex: 2;">
                    <div class="panel-title">월별 원단위 및 생산량 추이</div>
                    <div class="chart-legend">
                        <div style="display:flex; align-items:center; gap:6px;"><div class="leg-circle" style="border-color:#001f4d; background:#fff;"></div> 전력 원단위 (kWh/EA)</div>
                        <div style="display:flex; align-items:center; gap:6px;"><div class="leg-circle" style="border-color:#f59e0b; background:#fff;"></div> LNG 원단위 (m³/EA)</div>
                        <div style="display:flex; align-items:center; gap:6px;"><div style="width:16px; height:12px; background:#cffafe; border-radius:2px;"></div> 생산량 (EA)</div>
                    </div>
                    <div class="line-chart-container" style="position:relative;">
                        <svg viewBox="0 0 ${cw1} ${ch1}" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible;">
                            ${gridX1}
                            ${bars}
                            <path d="${pwrTrendPath}" fill="none" stroke="#001f4d" stroke-width="2" />
                            <path d="${lngTrendPath}" fill="none" stroke="#f59e0b" stroke-width="2" />
                            ${pwrTrendPoints}
                            ${lngTrendPoints}
                            ${xLabels1}
                            <text x="15" y="${30 + dh1/2}" transform="rotate(-90 15,${30 + dh1/2})" text-anchor="middle" font-size="10" fill="#9ca3af">전력 원단위</text>
                            <text x="${cw1-15}" y="${30 + dh1/2}" transform="rotate(90 ${cw1-15},${30 + dh1/2})" text-anchor="middle" font-size="10" fill="#9ca3af">LNG 원단위</text>
                        </svg>
                    </div>
                </div>
                
                <div class="usage-panel" style="flex: 1;">
                    <div class="panel-title">사업장별 전력 원단위 비교 (5월)</div>
                    <div style="height:200px; margin-top:10px;">
                        <svg viewBox="0 0 ${cw2} ${ch2}" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible;">
                            ${gridY2}
                            ${factoryBars}
                            ${xLabels2}
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Bottom Table -->
            <div class="usage-panel">
                <div class="panel-title">사업장별 상세 원단위 현황 (2026년 5월)</div>
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>생산량 (EA)</th>
                                <th>전력 사용량 (kWh)</th>
                                <th>전력 원단위 (kWh/EA)</th>
                                <th>LNG 원단위 (m³/EA)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="td-category">울산 사업장</td>
                                <td>45,200</td><td>452,100</td><td style="color:#dc2626; font-weight:700;">10.0</td><td>0.28</td>
                            </tr>
                            <tr>
                                <td class="td-category">서산 사업장</td>
                                <td>58,500</td><td>385,400</td><td style="color:#16a34a; font-weight:700;">6.6</td><td>0.17</td>
                            </tr>
                            <tr>
                                <td class="td-category">성남 사업장</td>
                                <td>25,300</td><td>207,460</td><td style="color:#001f4d; font-weight:700;">8.2</td><td>0.21</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

const PERF_PAGE_STYLES = `
    .perf-page {
        display: flex;
        flex-direction: column;
        gap: 16px;
        height: 100%;
    }
    .pill-tabs {
        display: flex;
        gap: 8px;
        background: #f1f5f9;
        padding: 6px;
        border-radius: 9999px;
        overflow-x: auto;
    }
    .pill-tabs::-webkit-scrollbar {
        display: none;
    }
    .pill-tab {
        padding: 8px 16px;
        border-radius: 9999px;
        font-size: 14px;
        font-weight: 600;
        color: #4b5563;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
    }
    .pill-tab.active {
        background: #ffffff;
        color: #004d99;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .pill-tab:hover:not(.active) {
        color: #111827;
        background: #e2e8f0;
    }
    .perf-content {
        flex: 1;
        background: #ffffff;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        padding: 30px;
        min-height: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const perfTabs = [
    { id: "usage", name: "사용량현황" },
    { id: "cost", name: "비용현황" },
    { id: "unit", name: "원단위현황" },
    { id: "standby_holiday", name: "대기 에너지 (휴일)" },
    { id: "standby_holiday_rank", name: "대기 에너지 순위 (휴일)" },
    { id: "standby_weekday", name: "대기 에너지 (평일심야)" },
    { id: "standby_weekday_rank", name: "대기 에너지 순위 (평일심야)" }
];

function renderStandbyHolidayTab() {
    // 5월 휴일 데이터 (예: 5/2, 5/3, 5/5, 5/9, 5/10, 5/15)
    const dates = ['5/02(토)', '5/03(일)', '5/05(화)', '5/09(토)', '5/10(일)', '5/15(금)'];
    const pwrData = [420, 410, 430, 400, 415, 425]; // 전력
    const lngData = [25, 23, 24, 21, 23, 24]; // LNG
    const airData = [10, 9, 10, 9, 10, 9]; // 압축공기
    
    const chartW = 800;
    const chartH = 200;
    const padX = 60;
    const padYTop = 20;
    const padYBot = 30;
    const drawH = chartH - padYTop - padYBot;
    
    // Y Axis scaling
    const pwrMin = 0, pwrMax = 500;
    const lngMin = 0, lngMax = 30;
    const airMin = 0, airMax = 15;
    
    const getPwrY = (v) => padYTop + drawH - ((v - pwrMin) / (pwrMax - pwrMin)) * drawH;
    const getLngY = (v) => padYTop + drawH - ((v - lngMin) / (lngMax - lngMin)) * drawH;
    const getAirY = (v) => padYTop + drawH - ((v - airMin) / (airMax - airMin)) * drawH;
    const getX = (i) => padX + (i / (dates.length - 1)) * (chartW - 2 * padX);

    // Build SVG paths
    const pwrPath = pwrData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getPwrY(v)}`).join(' ');
    const lngPath = lngData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getLngY(v)}`).join(' ');
    const airPath = airData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getAirY(v)}`).join(' ');
    
    const pwrPoints = pwrData.map((v, i) => `<circle cx="${getX(i)}" cy="${getPwrY(v)}" r="3.5" fill="#ffffff" stroke="#004d99" stroke-width="2"/>`).join('');
    const lngPoints = lngData.map((v, i) => `<circle cx="${getX(i)}" cy="${getLngY(v)}" r="3.5" fill="#ffffff" stroke="#f59e0b" stroke-width="2"/>`).join('');
    const airPoints = airData.map((v, i) => `<circle cx="${getX(i)}" cy="${getAirY(v)}" r="3.5" fill="#ffffff" stroke="#14b8a6" stroke-width="2"/>`).join('');
    
    const gridAndYLabels = [0, 0.25, 0.5, 0.75, 1].map(ratio => {
        const topPos = padYTop + drawH * (1 - ratio);
        const pwrVal = pwrMin + (pwrMax - pwrMin) * ratio;
        const lngVal = lngMin + (lngMax - lngMin) * ratio;
        return `
            <line x1="${padX}" y1="${topPos}" x2="${chartW - padX}" y2="${topPos}" stroke="#e5e7eb" stroke-width="1"/>
            <text x="${padX - 10}" y="${topPos + 4}" text-anchor="end" font-size="11" fill="#6b7280">${pwrVal.toLocaleString()}</text>
            <text x="${chartW - padX + 10}" y="${topPos + 4}" text-anchor="start" font-size="11" fill="#6b7280">${lngVal.toLocaleString()}</text>
        `;
    }).join('');
    
    const xAxisLabels = dates.map((d, i) => `
        <text x="${getX(i)}" y="${chartH - 5}" text-anchor="middle" font-size="11" fill="#6b7280">${d}</text>
    `).join('');

    const axisTitles = `
        <text x="15" y="${padYTop + drawH/2}" transform="rotate(-90 15,${padYTop + drawH/2})" text-anchor="middle" font-size="12" fill="#4b5563" font-weight="bold">전력/압축공기</text>
        <text x="${chartW - 15}" y="${padYTop + drawH/2}" transform="rotate(90 ${chartW - 15},${padYTop + drawH/2})" text-anchor="middle" font-size="12" fill="#4b5563" font-weight="bold">LNG</text>
    `;

    return `
        <style>
            ${USAGE_STYLES}
            .standby-card { flex:1; background:#fff; border-radius:8px; border:1px solid #e5e7eb; padding:16px; position:relative; box-shadow:0 1px 2px rgba(0,0,0,0.05); }
        </style>
        <div class="usage-tab">
            <!-- Top Cards -->
            <div class="usage-row">
                <div class="standby-card" style="border-left: 6px solid #dc2626;">
                    <div class="u-card-title">총 대기전력 (휴일 평균)</div>
                    <div class="u-card-val">452 <span style="font-size:14px; color:#6b7280; font-weight:500;">kW</span></div>
                    <div class="trend-text trend-down" style="color: #16a34a; font-size:12px; margin-top:4px; display:flex; align-items:center; gap:2px;">전월 대비: 3.5% 감소
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>
                    </svg>
                </div>
                <div class="standby-card" style="border-left: 6px solid #f59e0b;">
                    <div class="u-card-title">평균 대기율 (부하 대비)</div>
                    <div class="u-card-val">8.5 <span style="font-size:14px; color:#6b7280; font-weight:500;">%</span></div>
                    <div class="trend-text" style="color: #6b7280; font-size:12px; margin-top:4px;">목표: 7.0% <span style="color:#dc2626;">+ 1.5%p</span></div>
                    <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
                    </svg>
                </div>
                <div class="standby-card" style="border-left: 6px solid #14b8a6;">
                    <div class="u-card-title">연간 절감 가능 비용</div>
                    <div class="u-card-val">45,200 <span style="font-size:14px; color:#6b7280; font-weight:500;">천원</span></div>
                    <div class="trend-text" style="color: #6b7280; font-size:12px; margin-top:4px;">예상 ROI <span style="color:#14b8a6; font-weight:600;">1.8년</span></div>
                    <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                    </svg>
                </div>
                <div class="standby-card" style="border-left: 6px solid #4b5563;">
                    <div class="u-card-title">주요 대기 장비 (Top 10)</div>
                    <div class="u-card-val">12 <span style="font-size:14px; color:#6b7280; font-weight:500;">대</span></div>
                    <div class="trend-text" style="color: #6b7280; font-size:12px; margin-top:4px;">개선 완료: 5대 <span style="color:#4b5563;">(진행중 7대)</span></div>
                    <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                </div>
            </div>

            <!-- Middle Charts -->
            <div class="usage-row" style="align-items: stretch;">
                <div class="usage-panel" style="flex: 2;">
                    <div class="panel-title">일별 대기에너지 발생 추이 (휴일)</div>
                    
                    <div class="chart-legend">
                        <div><div class="leg-circle" style="border-color:#004d99;"></div> 전력 (kW)</div>
                        <div><div class="leg-circle" style="border-color:#f59e0b;"></div> LNG (m³)</div>
                        <div><div class="leg-circle" style="border-color:#14b8a6;"></div> 압축공기 (Nm³)</div>
                    </div>
                    
                    <div class="line-chart-container">
                        <svg viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible; display:block;">
                            ${gridAndYLabels}
                            <path d="${pwrPath}" fill="none" stroke="#004d99" stroke-width="2.5" />
                            <path d="${lngPath}" fill="none" stroke="#f59e0b" stroke-width="2.5" />
                            <path d="${airPath}" fill="none" stroke="#14b8a6" stroke-width="2.5" />
                            ${pwrPoints}${lngPoints}${airPoints}
                            ${xAxisLabels}
                            ${axisTitles}
                        </svg>
                    </div>
                </div>
                
                <div class="usage-panel" style="flex: 1; display:flex; flex-direction:column;">
                    <div class="panel-title">에너지원별 대기 비중 (TOE)</div>
                    <div style="flex:1; display:flex; align-items:center; justify-content:center; gap:20px;">
                        <svg viewBox="0 0 100 100" width="140" height="140" style="transform: rotate(-90deg);">
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#001f4d" stroke-width="26" stroke-dasharray="105.5 219.9" stroke-dashoffset="0" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" stroke-width="26" stroke-dasharray="35.2 219.9" stroke-dashoffset="-105.5" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#14b8a6" stroke-width="26" stroke-dasharray="44.0 219.9" stroke-dashoffset="-140.7" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#6b7280" stroke-width="26" stroke-dasharray="24.2 219.9" stroke-dashoffset="-184.7" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" stroke-width="26" stroke-dasharray="11.0 219.9" stroke-dashoffset="-208.9" />
                        </svg>
                        <div class="doughnut-legend-list">
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#001f4d;"></div>전력</div>
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#f59e0b;"></div>LNG</div>
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#14b8a6;"></div>압축공기</div>
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#6b7280;"></div>스팀</div>
                            <div class="doughnut-legend-item"><div class="d-leg-color" style="background:#e5e7eb;"></div>기타</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Table -->
            <div class="usage-panel">
                <div class="panel-title">사업장별 대기에너지 상세 현황 (5월 휴일 평균)</div>
                <div class="table-container">
                    <table class="data-table usage-table">
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>전력 (kWh)</th>
                                <th>LNG (m³)</th>
                                <th>압축공기 (Nm³)</th>
                                <th>스팀 (Ton)</th>
                                <th>콤프레서 (kWh)</th>
                                <th>유량 (m³)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="td-category">울산 사업장</td>
                                <td>2,450</td><td>120</td><td>850</td><td>12.5</td><td>450</td><td>250</td>
                            </tr>
                            <tr>
                                <td class="td-category">서산 사업장</td>
                                <td>1,850</td><td>85</td><td>620</td><td>8.2</td><td>320</td><td>180</td>
                            </tr>
                            <tr>
                                <td class="td-category">성남 사업장</td>
                                <td>980</td><td>45</td><td>310</td><td>4.5</td><td>180</td><td>95</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderStandbyHolidayRankTab() {
    const drawW = 380;
    const drawH = 200;
    const padX = 80;
    const padY = 20;
    const barH = 20;

    const worstData = [125.4, 98.2, 85.0, 78.5, 72.1, 65.0, 62.3, 58.0, 55.4, 51.2];
    const worstLabels = ['Comp #3', 'Fan #2', 'Comp #1', 'Boiler #1', 'Fan #5', '', '', '', '', ''];
    
    const worstBars = worstData.map((v, i) => {
        const w = (v / 140) * drawW;
        return `<rect x="${padX}" y="${padY + i * barH}" width="${w}" height="${barH}" fill="#ef4444" />`;
    }).join('');

    const worstLabelTags = worstLabels.map((lbl, i) => {
        if (!lbl) return '';
        return `<text x="${padX - 10}" y="${padY + i * barH + barH / 2 + 4}" text-anchor="end" font-size="12" fill="#4b5563">${lbl}</text>`;
    }).join('');

    const worstGrid = [0, 20, 40, 60, 80, 100, 120, 140].map(v => {
        const x = padX + (v / 140) * drawW;
        return `
            <line x1="${x}" y1="${padY}" x2="${x}" y2="${padY + drawH}" stroke="#f3f4f6" stroke-width="1"/>
            <text x="${x}" y="${padY + drawH + 20}" text-anchor="middle" font-size="11" fill="#9ca3af">${v}</text>
        `;
    }).join('');

    const topData = [0.8, 1.2, 1.5, 1.8, 2.1, 2.3, 2.5, 2.8, 2.9, 3.1];
    const topLabels = ['LED #1', 'Pump D', 'Valve #2', 'Panel B', 'Switch C', '', '', '', '', ''];
    
    const topBars = topData.map((v, i) => {
        const w = (v / 3.5) * drawW;
        return `<rect x="${padX}" y="${padY + i * barH}" width="${w}" height="${barH}" fill="#22c55e" />`;
    }).join('');

    const topLabelTags = topLabels.map((lbl, i) => {
        if (!lbl) return '';
        return `<text x="${padX - 10}" y="${padY + i * barH + barH / 2 + 4}" text-anchor="end" font-size="12" fill="#4b5563">${lbl}</text>`;
    }).join('');

    const topGrid = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5].map(v => {
        const x = padX + (v / 3.5) * drawW;
        return `
            <line x1="${x}" y1="${padY}" x2="${x}" y2="${padY + drawH}" stroke="#f3f4f6" stroke-width="1"/>
            <text x="${x}" y="${padY + drawH + 20}" text-anchor="middle" font-size="11" fill="#9ca3af">${v.toFixed(1)}</text>
        `;
    }).join('');

    return `
        <style>
            ${USAGE_STYLES}
            .rank-card { flex:1; background:#fff; border-radius:8px; border:1px solid #e5e7eb; padding:24px; position:relative; box-shadow:0 1px 2px rgba(0,0,0,0.05); }
        </style>
        <div class="usage-tab">
            <!-- Top Cards -->
            <div class="usage-row">
                <div class="rank-card" style="border-left: 6px solid #ef4444; display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:16px;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="#ef4444"><circle cx="12" cy="12" r="10"/><path d="M12 8v4" stroke="white" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="16" r="1.5" fill="white"/></svg>
                        <div>
                            <div style="font-size:14px; color:#6b7280; font-weight:500; margin-bottom:4px;">Worst 10 평균 대기전력 (kW)</div>
                            <div style="font-size:32px; font-weight:800; color:#111827;">
                                85.4 <span style="font-size:16px; color:#ef4444; font-weight:700;">(집중 관리 필요)</span>
                            </div>
                        </div>
                    </div>
                    <div style="text-align:right; font-size:14px; color:#4b5563; line-height:1.6;">
                        전체 대기전력의 <strong style="color:#111827;">42%</strong> 차지<br>
                        주요 원인: 노후 컴프레서
                    </div>
                </div>
                
                <div class="rank-card" style="border-left: 6px solid #22c55e; display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:16px;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="#22c55e"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <div>
                            <div style="font-size:14px; color:#6b7280; font-weight:500; margin-bottom:4px;">TOP 10 평균 대기전력 (kW)</div>
                            <div style="font-size:32px; font-weight:800; color:#111827;">
                                2.1 <span style="font-size:16px; color:#22c55e; font-weight:700;">(우수 관리)</span>
                            </div>
                        </div>
                    </div>
                    <div style="text-align:right; font-size:14px; color:#4b5563; line-height:1.6;">
                        전체 대기전력의 <strong style="color:#111827;">1.5%</strong> 차지<br>
                        최근 인버터 교체 효과
                    </div>
                </div>
            </div>

            <!-- Middle Charts -->
            <div class="usage-row" style="align-items: stretch;">
                <div class="usage-panel" style="flex: 1;">
                    <div class="panel-title">Worst 10 대기전력 발생 장비 (kW)</div>
                    <div style="height:250px; position:relative;">
                        <svg viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible;">
                            ${worstGrid}
                            ${worstBars}
                            ${worstLabelTags}
                        </svg>
                    </div>
                </div>
                <div class="usage-panel" style="flex: 1;">
                    <div class="panel-title">TOP 10 대기전력 우수 장비 (kW)</div>
                    <div style="height:250px; position:relative;">
                        <svg viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible;">
                            ${topGrid}
                            ${topBars}
                            ${topLabelTags}
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Bottom Table -->
            <div class="usage-panel">
                <div class="panel-title">대기에너지 발생 상세 순위 (Worst 5)</div>
                <div class="table-container">
                    <table class="data-table usage-table">
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>장비명</th>
                                <th>사업장</th>
                                <th>전력 (kWh)</th>
                                <th>LNG (m³)</th>
                                <th>압축공기 (Nm³)</th>
                                <th>스팀 (Ton)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="color:#ef4444; font-weight:800;">1</td>
                                <td class="td-item" style="font-weight:600;">Main Air Compressor #3</td>
                                <td>울산 사업장</td>
                                <td style="font-weight:700;">125.4</td>
                                <td>-</td>
                                <td>450.2</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td style="color:#ef4444; font-weight:800;">2</td>
                                <td class="td-item" style="font-weight:600;">Boiler Pump Unit A</td>
                                <td>서산 사업장</td>
                                <td style="font-weight:700;">98.2</td>
                                <td>12.5</td>
                                <td>-</td>
                                <td>4.5</td>
                            </tr>
                            <tr>
                                <td style="color:#ef4444; font-weight:800;">3</td>
                                <td class="td-item" style="font-weight:600;">Cooling Tower Fan #2</td>
                                <td>울산 사업장</td>
                                <td style="font-weight:700;">85.0</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td style="font-weight:700;">4</td>
                                <td class="td-item" style="font-weight:600;">HVAC Chiller #1</td>
                                <td>성남 사업장</td>
                                <td style="font-weight:700;">78.5</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td style="font-weight:700;">5</td>
                                <td class="td-item" style="font-weight:600;">Exhaust Fan Unit B</td>
                                <td>울산 사업장</td>
                                <td style="font-weight:700;">72.1</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderStandbyWeekdayRankTab() {
    const drawW = 380;
    const drawH = 200;
    const padX = 110;
    const padY = 20;
    const barH = 20;

    const worstData = [110.5, 88.4, 75.0, 62.0, 55.4, 50.0, 48.0, 45.0, 42.0, 40.0];
    const worstLabels = ['Pump Station #2', 'Chiller Unit C', 'Comp #5', 'Fan #12', 'Boiler B', '', '', '', '', ''];
    
    const worstBars = worstData.map((v, i) => {
        const w = (v / 120) * drawW;
        return `<rect x="${padX}" y="${padY + i * barH}" width="${w}" height="${barH}" fill="#ef4444" />`;
    }).join('');

    const worstLabelTags = worstLabels.map((lbl, i) => {
        if (!lbl) return '';
        return `<text x="${padX - 10}" y="${padY + i * barH + barH / 2 + 4}" text-anchor="end" font-size="12" fill="#4b5563">${lbl}</text>`;
    }).join('');

    const worstGrid = [0, 20, 40, 60, 80, 100, 120].map(v => {
        const x = padX + (v / 120) * drawW;
        return `
            <line x1="${x}" y1="${padY}" x2="${x}" y2="${padY + drawH}" stroke="#f3f4f6" stroke-width="1"/>
            <text x="${x}" y="${padY + drawH + 20}" text-anchor="middle" font-size="11" fill="#9ca3af">${v}</text>
        `;
    }).join('');

    const topData = [0.5, 0.8, 1.2, 1.5, 1.9, 2.1, 2.3, 2.4, 2.6, 2.8];
    const topLabels = ['Sensor #1', 'LED Room A', 'IoT Gateway', 'Valve C', 'Sub-Meter #3', '', '', '', '', ''];
    
    const topBars = topData.map((v, i) => {
        const w = (v / 3.0) * drawW;
        return `<rect x="${padX}" y="${padY + i * barH}" width="${w}" height="${barH}" fill="#22c55e" />`;
    }).join('');

    const topLabelTags = topLabels.map((lbl, i) => {
        if (!lbl) return '';
        return `<text x="${padX - 10}" y="${padY + i * barH + barH / 2 + 4}" text-anchor="end" font-size="12" fill="#4b5563">${lbl}</text>`;
    }).join('');

    const topGrid = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0].map(v => {
        const x = padX + (v / 3.0) * drawW;
        return `
            <line x1="${x}" y1="${padY}" x2="${x}" y2="${padY + drawH}" stroke="#f3f4f6" stroke-width="1"/>
            <text x="${x}" y="${padY + drawH + 20}" text-anchor="middle" font-size="11" fill="#9ca3af">${v.toFixed(1)}</text>
        `;
    }).join('');

    return `
        <style>
            ${USAGE_STYLES}
            .rank-card { flex:1; background:#fff; border-radius:8px; border:1px solid #e5e7eb; padding:24px; position:relative; box-shadow:0 1px 2px rgba(0,0,0,0.05); }
        </style>
        <div class="usage-tab">
            <!-- Top Cards -->
            <div class="usage-row">
                <div class="rank-card" style="border-left: 6px solid #ef4444; display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:16px;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 2L1 21h22L12 2z" fill="#ef4444"/><path d="M11 16h2v2h-2zm0-6h2v4h-2z" fill="#ffffff"/></svg>
                        <div>
                            <div style="font-size:14px; color:#6b7280; font-weight:500; margin-bottom:4px;">Worst 10 평균 대기전력 (심야)</div>
                            <div style="font-size:32px; font-weight:800; color:#ef4444;">
                                72.5 <span style="font-size:16px; color:#111827; font-weight:700;">kW</span>
                            </div>
                        </div>
                    </div>
                    <div style="text-align:right; font-size:14px; color:#4b5563; line-height:1.6;">
                        전체 심야 대기의 <strong style="color:#ef4444;">38%</strong> 차지<br>
                        주요 원인: 구형 펌프 및 냉동기
                    </div>
                </div>
                
                <div class="rank-card" style="border-left: 6px solid #22c55e; display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:16px;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="#22c55e"/></svg>
                        <div>
                            <div style="font-size:14px; color:#6b7280; font-weight:500; margin-bottom:4px;">TOP 10 평균 대기전력 (심야)</div>
                            <div style="font-size:32px; font-weight:800; color:#22c55e;">
                                1.8 <span style="font-size:16px; color:#111827; font-weight:700;">kW</span>
                            </div>
                        </div>
                    </div>
                    <div style="text-align:right; font-size:14px; color:#4b5563; line-height:1.6;">
                        전체 심야 대기의 <strong style="color:#22c55e;">1.2%</strong> 차지<br>
                        최근 고효율 센서 교체 효과
                    </div>
                </div>
            </div>

            <!-- Middle Charts -->
            <div class="usage-row" style="align-items: stretch;">
                <div class="usage-panel" style="flex: 1;">
                    <div class="panel-title">Worst 10 대기전력 발생 장비 (평일심야)</div>
                    <div style="height:250px; position:relative;">
                        <svg viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible;">
                            ${worstGrid}
                            ${worstBars}
                            ${worstLabelTags}
                        </svg>
                    </div>
                </div>
                <div class="usage-panel" style="flex: 1;">
                    <div class="panel-title">TOP 10 대기전력 우수 장비 (평일심야)</div>
                    <div style="height:250px; position:relative;">
                        <svg viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet" style="width:100%; height:100%; overflow:visible;">
                            ${topGrid}
                            ${topBars}
                            ${topLabelTags}
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Bottom Table -->
            <div class="usage-panel">
                <div class="panel-title">대기에너지 발생 상세 순위 (Worst 5 - 평일심야)</div>
                <div class="table-container">
                    <table class="data-table usage-table">
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>장비명</th>
                                <th>사업장</th>
                                <th>전력 (kWh)</th>
                                <th>LNG (m³)</th>
                                <th>압축공기 (Nm³)</th>
                                <th>스팀 (Ton)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="color:#ef4444; font-weight:800;">1</td>
                                <td class="td-item" style="font-weight:600;">Pump Station #2</td>
                                <td>울산 사업장</td>
                                <td style="font-weight:700;">110.5</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td style="color:#ef4444; font-weight:800;">2</td>
                                <td class="td-item" style="font-weight:600;">Chiller Unit C</td>
                                <td>서산 사업장</td>
                                <td style="font-weight:700;">88.4</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td style="color:#ef4444; font-weight:800;">3</td>
                                <td class="td-item" style="font-weight:600;">Comp #5</td>
                                <td>울산 사업장</td>
                                <td style="font-weight:700;">75.0</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td style="font-weight:700;">4</td>
                                <td class="td-item" style="font-weight:600;">Fan #12</td>
                                <td>성남 사업장</td>
                                <td style="font-weight:700;">62.0</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td style="font-weight:700;">5</td>
                                <td class="td-item" style="font-weight:600;">Boiler B</td>
                                <td>서산 사업장</td>
                                <td style="font-weight:700;">55.4</td>
                                <td>10.2</td>
                                <td>-</td>
                                <td>2.5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderStandbyWeekdayTab() {
    const cards = `
        <div class="usage-row">
            <div class="standby-card" style="border-left: 6px solid #3b82f6;">
                <div class="u-card-title">총 대기전력 (평일심야 평균)</div>
                <div class="u-card-val">385 <span style="font-size:14px; color:#6b7280; font-weight:500;">kW</span></div>
                <div class="trend-text trend-down" style="color: #16a34a; font-size:12px; margin-top:4px;">전월 대비: 3.8% 개선</div>
                <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </div>
            
            <div class="standby-card" style="border-left: 6px solid #06b6d4;">
                <div class="u-card-title">평균 대기율 (부하 대비)</div>
                <div class="u-card-val">6.2 <span style="font-size:14px; color:#6b7280; font-weight:500;">%</span></div>
                <div class="trend-text trend-up" style="color: #ef4444; font-size:12px; margin-top:4px;">목표 5.0% 대비: +1.2%p 초과</div>
                <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="5" x2="5" y2="19"></line>
                    <circle cx="6.5" cy="6.5" r="2.5"></circle>
                    <circle cx="17.5" cy="17.5" r="2.5"></circle>
                </svg>
            </div>
            
            <div class="standby-card" style="border-left: 6px solid #f59e0b;">
                <div class="u-card-title">연간 절감 가능 비용</div>
                <div class="u-card-val">32,500 <span style="font-size:14px; color:#6b7280; font-weight:500;">천원</span></div>
                <div class="trend-text" style="color: #6b7280; font-size:12px; margin-top:4px;">예상 ROI: 2.1년</div>
                <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
            </div>
            
            <div class="standby-card" style="border-left: 6px solid #64748b;">
                <div class="u-card-title">주요 대기 장비 (Top 10)</div>
                <div class="u-card-val">8 <span style="font-size:14px; color:#6b7280; font-weight:500;">대</span></div>
                <div class="trend-text" style="color: #6b7280; font-size:12px; margin-top:4px;">개선 완료: 6대, 진행 중: 2대</div>
                <svg class="u-card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
            </div>
        </div>
    `;

    const hours = ['22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'];
    const pwrData = [420, 390, 380, 375, 370, 372, 380, 410, 550];
    const lngData = [21, 20, 19, 17, 17, 17.5, 19, 24, 45]; 
    const airData = [415, 400, 395, 388, 386, 390, 408, 450, 540]; 

    const chartW = 750;
    const chartH = 220;
    const padX = 60;
    const padYTop = 20;
    const padYBot = 30;
    const drawH = chartH - padYTop - padYBot;

    const getYLeft = (v) => padYTop + drawH - ((v - 350) / 200) * drawH;
    const getYRight = (v) => padYTop + drawH - ((v - 15) / 30) * drawH;
    const getX = (i) => padX + (i / (hours.length - 1)) * (chartW - 2 * padX);

    const pwrPath = pwrData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYLeft(v)}`).join(' ');
    const pwrPoints = pwrData.map((v, i) => `<rect x="${getX(i)-3}" y="${getYLeft(v)-3}" width="6" height="6" fill="#fff" stroke="#1e3a8a" stroke-width="1.5"/>`).join('');

    const lngPath = lngData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYRight(v)}`).join(' ');
    const lngPoints = lngData.map((v, i) => `<rect x="${getX(i)-3}" y="${getYRight(v)-3}" width="6" height="6" fill="#fff" stroke="#f59e0b" stroke-width="1.5"/>`).join('');

    const airPath = airData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYLeft(v)}`).join(' ');
    const airPoints = airData.map((v, i) => `<rect x="${getX(i)-3}" y="${getYLeft(v)-3}" width="6" height="6" fill="#fff" stroke="#00c49f" stroke-width="1.5"/>`).join('');

    const gridLines = [350, 400, 450, 500, 550].map(v => {
        const y = getYLeft(v);
        return `
            <line x1="${padX}" y1="${y}" x2="${chartW - padX}" y2="${y}" stroke="#f3f4f6" stroke-width="1"/>
            <text x="${padX - 10}" y="${y + 4}" text-anchor="end" font-size="10" fill="#9ca3af">${v}</text>
        `;
    }).join('');

    const rightYLabels = [15, 20, 25, 30, 35, 40, 45].map(v => {
        const y = getYRight(v);
        return `
            <text x="${chartW - padX + 10}" y="${y + 4}" text-anchor="start" font-size="10" fill="#9ca3af">${v}</text>
        `;
    }).join('');

    const xLabels = hours.map((h, i) => `
        <text x="${getX(i)}" y="${chartH - 5}" text-anchor="middle" font-size="10" fill="#9ca3af">${h}</text>
    `).join('');

    const donutSvg = `
        <svg viewBox="0 0 100 100" width="160" height="160" style="transform: rotate(-90deg);">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#e5e7eb" stroke-width="25" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#1e3a8a" stroke-width="25" stroke-dasharray="81 188.5" stroke-dashoffset="0" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#00c49f" stroke-width="25" stroke-dasharray="53 188.5" stroke-dashoffset="-81" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#f59e0b" stroke-width="25" stroke-dasharray="34 188.5" stroke-dashoffset="-134" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#0ea5e9" stroke-width="25" stroke-dasharray="15 188.5" stroke-dashoffset="-168" />
        </svg>
    `;

    return `
        <style>
            ${USAGE_STYLES}
            .standby-card { flex:1; background:#fff; border-radius:8px; border:1px solid #e5e7eb; padding:20px; position:relative; box-shadow:0 1px 2px rgba(0,0,0,0.05); }
        </style>
        <div class="usage-tab">
            ${cards}
            
            <div class="usage-row" style="align-items: stretch;">
                <div class="usage-panel" style="flex: 2;">
                    <div class="panel-title">시간대별 대기에너지 추이 (22시 ~ 익일 06시)</div>
                    
                    <div class="chart-legend" style="margin-bottom:16px; justify-content:flex-end; gap:16px;">
                        <div style="display:flex; align-items:center; gap:4px; font-size:12px; color:#4b5563;"><div style="width:12px; height:12px; border:2px solid #1e3a8a; background:#fff;"></div> 전력 (kWh)</div>
                        <div style="display:flex; align-items:center; gap:4px; font-size:12px; color:#4b5563;"><div style="width:12px; height:12px; border:2px solid #f59e0b; background:#fff;"></div> LNG (m³)</div>
                        <div style="display:flex; align-items:center; gap:4px; font-size:12px; color:#4b5563;"><div style="width:12px; height:12px; border:2px solid #00c49f; background:#fff;"></div> 압축공기 (Nm³)</div>
                    </div>
                    
                    <div style="height:220px; position:relative;">
                        <svg viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="none" style="width:100%; height:100%; overflow:visible;">
                            ${gridLines}
                            ${rightYLabels}
                            
                            <path d="${pwrPath}" fill="none" stroke="#1e3a8a" stroke-width="2.5" />
                            ${pwrPoints}
                            
                            <path d="${lngPath}" fill="none" stroke="#f59e0b" stroke-width="2.5" />
                            ${lngPoints}
                            
                            <path d="${airPath}" fill="none" stroke="#00c49f" stroke-width="2.5" />
                            ${airPoints}
                            
                            ${xLabels}
                            
                            <text x="${padX - 45}" y="${chartH/2}" transform="rotate(-90 ${padX - 45} ${chartH/2})" text-anchor="middle" font-size="12" fill="#4b5563" font-weight="600">전력 (kWh)</text>
                            <text x="${chartW - padX + 45}" y="${chartH/2}" transform="rotate(90 ${chartW - padX + 45} ${chartH/2})" text-anchor="middle" font-size="12" fill="#4b5563" font-weight="600">LNG (m³)</text>
                        </svg>
                    </div>
                </div>
                
                <div class="usage-panel" style="flex: 1; display:flex; flex-direction:column;">
                    <div class="panel-title">에너지원별 대기 비중 (TOE)</div>
                    <div style="flex:1; display:flex; align-items:center; justify-content:center; gap:24px;">
                        ${donutSvg}
                        <div class="doughnut-legend-list" style="gap:12px;">
                            <div class="doughnut-legend-item" style="font-size:12px; color:#4b5563;"><div class="d-leg-color" style="background:#1e3a8a; width:12px; height:12px;"></div>전력</div>
                            <div class="doughnut-legend-item" style="font-size:12px; color:#4b5563;"><div class="d-leg-color" style="background:#00c49f; width:12px; height:12px;"></div>압축공기</div>
                            <div class="doughnut-legend-item" style="font-size:12px; color:#4b5563;"><div class="d-leg-color" style="background:#f59e0b; width:12px; height:12px;"></div>LNG</div>
                            <div class="doughnut-legend-item" style="font-size:12px; color:#4b5563;"><div class="d-leg-color" style="background:#0ea5e9; width:12px; height:12px;"></div>스팀</div>
                            <div class="doughnut-legend-item" style="font-size:12px; color:#4b5563;"><div class="d-leg-color" style="background:#e5e7eb; width:12px; height:12px;"></div>기타</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Table -->
            <div class="usage-panel">
                <div class="panel-title">사업장별 대기에너지 상세 현황 (3월 평일심야 평균)</div>
                <div class="table-container">
                    <table class="data-table usage-table">
                        <thead>
                            <tr style="background:#f8fafc;">
                                <th>구분</th>
                                <th>전력 (kWh)</th>
                                <th>LNG (m³)</th>
                                <th>압축공기 (Nm³)</th>
                                <th>스팀 (Ton)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="td-category" style="font-weight:600;">울산 사업장</td>
                                <td>1,850</td>
                                <td>95</td>
                                <td>620</td>
                                <td>8.5</td>
                            </tr>
                            <tr>
                                <td class="td-category" style="font-weight:600;">서산 사업장</td>
                                <td>1,420</td>
                                <td>68</td>
                                <td>450</td>
                                <td>5.2</td>
                            </tr>
                            <tr>
                                <td class="td-category" style="font-weight:600;">성남 사업장</td>
                                <td>1,150</td>
                                <td>52</td>
                                <td>380</td>
                                <td>4.1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

export function renderEnergyPerformancePage() {
    const defaultTab = perfTabs[0].id;
    
    let pillsHtml = perfTabs.map(tab => `
        <div id="pill-${tab.id}" class="pill-tab ${tab.id === defaultTab ? 'active' : ''}" data-tab-id="${tab.id}">
            ${tab.name}
        </div>
    `).join('');

    return `
        <style>${PERF_PAGE_STYLES}</style>
        <div class="perf-page">
            <div class="pill-tabs">
                ${pillsHtml}
            </div>
            <div id="perf-content-area" class="perf-content" style="padding:0; background:transparent; box-shadow:none; border:none;">
                ${renderUsageStatusTab()}
            </div>
        </div>
    `;
}

export function renderEnergyPerformancePageInit(container) {
    const tabs = container.querySelectorAll('.pill-tab');
    const contentDiv = container.querySelector('#perf-content-area');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab-id');
            if(!tabId) return;
            
            // Update active state
            tabs.forEach(el => el.classList.remove('active'));
            tab.classList.add('active');
            
            // Render content based on tabId
            if(contentDiv) {
                if (tabId === 'usage') {
                    contentDiv.innerHTML = renderUsageStatusTab();
                    contentDiv.style.padding = '0';
                    contentDiv.style.background = 'transparent';
                    contentDiv.style.boxShadow = 'none';
                    contentDiv.style.border = 'none';
                    contentDiv.style.display = 'block';
                } else if (tabId === 'cost') {
                    contentDiv.innerHTML = renderCostStatusTab();
                    contentDiv.style.padding = '0';
                    contentDiv.style.background = 'transparent';
                    contentDiv.style.boxShadow = 'none';
                    contentDiv.style.border = 'none';
                    contentDiv.style.display = 'block';
                } else if (tabId === 'unit') {
                    contentDiv.innerHTML = renderUnitStatusTab();
                    contentDiv.style.padding = '0';
                    contentDiv.style.background = 'transparent';
                    contentDiv.style.boxShadow = 'none';
                    contentDiv.style.border = 'none';
                    contentDiv.style.display = 'block';
                } else if (tabId === 'standby_holiday') {
                    contentDiv.innerHTML = renderStandbyHolidayTab();
                    contentDiv.style.padding = '0';
                    contentDiv.style.background = 'transparent';
                    contentDiv.style.boxShadow = 'none';
                    contentDiv.style.border = 'none';
                    contentDiv.style.display = 'block';
                } else if (tabId === 'standby_holiday_rank') {
                    contentDiv.innerHTML = renderStandbyHolidayRankTab();
                    contentDiv.style.padding = '0';
                    contentDiv.style.background = 'transparent';
                    contentDiv.style.boxShadow = 'none';
                    contentDiv.style.border = 'none';
                    contentDiv.style.display = 'block';
                } else if (tabId === 'standby_weekday') {
                    contentDiv.innerHTML = renderStandbyWeekdayTab();
                    contentDiv.style.padding = '0';
                    contentDiv.style.background = 'transparent';
                    contentDiv.style.boxShadow = 'none';
                    contentDiv.style.border = 'none';
                    contentDiv.style.display = 'block';
                } else if (tabId === 'standby_weekday_rank') {
                    contentDiv.innerHTML = renderStandbyWeekdayRankTab();
                    contentDiv.style.padding = '0';
                    contentDiv.style.background = 'transparent';
                    contentDiv.style.boxShadow = 'none';
                    contentDiv.style.border = 'none';
                    contentDiv.style.display = 'block';
                } else {
                    contentDiv.style.padding = '30px';
                    contentDiv.style.background = '#ffffff';
                    contentDiv.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    contentDiv.style.border = '1px solid #e5e7eb';
                    contentDiv.style.display = 'flex';
                    contentDiv.innerHTML = `
                        <div style="text-align:center; color:#6b7280;">
                            <h3 style="font-size:20px; color:#111827; margin-bottom:12px;">${(tab.textContent || '').trim()}</h3>
                            <p>이곳에 세부 현황 차트 및 표가 배치됩니다.<br>해당 컨텐츠는 세로 스크롤 없이 가로 폭을 꽉 채워 설계됩니다.</p>
                        </div>
                    `;
                }
            }
        });
    });
}
