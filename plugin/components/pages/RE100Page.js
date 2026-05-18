/**
 * RE100 이행 지표 및 비용 현황 페이지 (메인 대시보드)
 */

const PAGE_STYLES = `
    .re100-page {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    .row-top {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 16px;
    }

    .row-middle {
        display: grid;
        grid-template-columns: 2.5fr 1fr;
        gap: 16px;
    }

    .panel {
        background: white;
        border-radius: 12px;
        border: 1px solid var(--border-color, #e5e7eb);
        box-shadow: 0 2px 5px rgba(0,0,0,0.02);
        padding: 18px;
        position: relative;
    }

    .panel-title {
        font-size: 14px;
        font-weight: 800;
        color: var(--hyundai-navy, #111827);
        margin-bottom: 16px;
    }

    /* Top Cards */
    .kpi-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 110px;
    }

    .kpi-card-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .kpi-text-area {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .kpi-title {
        font-size: 13px;
        color: #4b5563;
        font-weight: 700;
    }

    .kpi-value {
        font-size: 28px;
        font-weight: 800;
        letter-spacing: -0.5px;
        display: flex;
        align-items: baseline;
        gap: 4px;
    }
    .kpi-value.red { color: #dc2626; }
    .kpi-value.green { color: #16a34a; }
    .kpi-value.blue { color: #2563eb; }

    .kpi-unit {
        font-size: 14px;
        font-weight: 700;
        color: #4b5563;
    }

    .kpi-sub {
        font-size: 12px;
        color: #6b7280;
    }

    .kpi-sub-red { color: #dc2626; font-weight: 700; }

    .icon-wrapper {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
    }

    /* Donut Chart (CSS) */
    .donut-wrap {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .donut-chart {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: conic-gradient(#00C7B1 45%, #e5e7eb 0);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .donut-inner {
        width: 52px;
        height: 52px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 800;
        color: #00C7B1;
    }
    .donut-info {
        font-size: 12px;
        color: #4b5563;
        line-height: 1.6;
    }

    /* Pie Chart (CSS) */
    .pie-chart {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: conic-gradient(
            #2563eb 0% 45%,    /* PPA (Blue) */
            #f59e0b 45% 65%,   /* REC (Orange) */
            #16a34a 65% 90%,   /* 자가발전 (Green) */
            #7c3aed 90% 100%   /* 기타 (Purple) */
        );
        margin: 0 auto;
        position: relative;
    }
    /* White center lines to fake slices if needed, or just let it be */

    .pie-legend {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 12px;
        font-weight: 600;
        color: #4b5563;
    }

    /* Mixed Chart (Bar + Line) SVG CSS */
    .mixed-chart-svg {
        width: 100%;
        height: 180px;
        display: block;
    }

    .legend-row {
        display: flex;
        justify-content: center;
        gap: 16px;
        font-size: 11px;
        font-weight: 600;
        color: #4b5563;
        margin-bottom: 12px;
    }
    .legend-item { display: inline-flex; align-items: center; gap: 4px; }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
    .legend-line { width: 12px; height: 2px; }
    .legend-circle { width: 8px; height: 8px; border-radius: 50%; border: 2px solid; background: white; }

    /* Table */
    .data-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
    }
    .data-table th {
        background: #f8fafc;
        color: #4b5563;
        font-weight: 700;
        padding: 10px;
        border-bottom: 1px solid #e5e7eb;
        text-align: center;
    }
    .data-table td {
        padding: 10px;
        border-bottom: 1px solid #e5e7eb;
        text-align: center;
        color: #111827;
    }
    .data-table tr:last-child td { border-bottom: none; }
    .td-num { font-variant-numeric: tabular-nums; }
    .td-blue { color: #2563eb; font-weight: 700; }
    .td-green { color: #16a34a; font-weight: 700; }
`;

export function renderRE100Page(filters = {}) {
    const { site = "all", date = "" } = filters;

    // SVG 차트 데이터 (샘플)
    const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
    const barsPPA = [200, 210, 205, 215, 220, 230, 240, 235, 225, 220, 215, 210];
    const barsREC = [100, 105, 110, 115, 120, 125, 140, 135, 125, 120, 115, 110];
    const barsSelf = [50, 52, 45, 48, 55, 50, 45, 48, 55, 52, 45, 50];
    const lineCost = [135, 138, 136, 139, 142, 145, 148, 147, 144, 142, 139, 138]; // 단위 비용

    const chartW = 750;
    const chartH = 180;
    const padX = 30;
    const padY = 20;
    const barW = 24;

    const xStep = (chartW - padX * 2) / 12;
    let svgContent = '';

    // Y축 그리드
    const maxBar = 500;
    [0, 100, 200, 300, 400].forEach(val => {
        const y = chartH - padY - (val / maxBar) * (chartH - padY * 2);
        svgContent += `<line x1="${padX}" x2="${chartW - padX}" y1="${y}" y2="${y}" stroke="#e5e7eb" stroke-width="1" />`;
        svgContent += `<text x="${padX - 5}" y="${y + 4}" text-anchor="end" font-size="10" fill="#6b7280">${val}</text>`;
    });

    // 라인 차트용 우측 Y축 값 (단가)
    const maxLine = 160;
    [0, 20, 40, 60, 80, 100, 120, 140].forEach(val => {
        const y = chartH - padY - (val / maxLine) * (chartH - padY * 2);
        svgContent += `<text x="${chartW - padX + 5}" y="${y + 4}" text-anchor="start" font-size="10" fill="#6b7280">${val}</text>`;
    });

    let linePath = '';
    let linePoints = '';

    months.forEach((m, i) => {
        const cx = padX + xStep * i + xStep / 2;
        
        // Stacked Bar Heights
        const hPPA = (barsPPA[i] / maxBar) * (chartH - padY * 2);
        const hREC = (barsREC[i] / maxBar) * (chartH - padY * 2);
        const hSelf = (barsSelf[i] / maxBar) * (chartH - padY * 2);

        const yPPA = chartH - padY - hPPA;
        const yREC = yPPA - hREC;
        const ySelf = yREC - hSelf;

        svgContent += `
            <rect x="${cx - barW/2}" y="${yPPA}" width="${barW}" height="${hPPA}" fill="#2563eb" />
            <rect x="${cx - barW/2}" y="${yREC}" width="${barW}" height="${hREC}" fill="#f59e0b" />
            <rect x="${cx - barW/2}" y="${ySelf}" width="${barW}" height="${hSelf}" fill="#16a34a" />
            <text x="${cx}" y="${chartH - padY + 15}" text-anchor="middle" font-size="10" fill="#6b7280">${m}</text>
        `;

        // Line Coordinates
        const ly = chartH - padY - (lineCost[i] / maxLine) * (chartH - padY * 2);
        linePath += `${i === 0 ? 'M' : 'L'} ${cx} ${ly} `;
        linePoints += `<circle cx="${cx}" cy="${ly}" r="3" fill="white" stroke="#dc2626" stroke-width="2" />`;
    });

    svgContent += `<path d="${linePath}" fill="none" stroke="#dc2626" stroke-width="2" />`;
    svgContent += linePoints;

    return `
        <style>${PAGE_STYLES}</style>
        <div class="re100-page">
            
            <!-- 1. Top KPI Cards -->
            <div class="row-top">
                <!-- RE100 이행률 -->
                <div class="panel kpi-card">
                    <div class="kpi-title" style="margin-bottom:8px;">RE100 이행률</div>
                    <div class="donut-wrap">
                        <div class="donut-chart"><div class="donut-inner">45%</div></div>
                        <div class="donut-info">
                            <div>목표: 60%</div>
                            <div>이행량: <b>45,000 MWh</b></div>
                        </div>
                    </div>
                </div>

                <!-- 총 이행 비용 -->
                <div class="panel kpi-card">
                    <div class="kpi-title">총 이행 비용 (누계)</div>
                    <div class="kpi-card-inner" style="margin-top:6px;">
                        <div class="kpi-text-area">
                            <div class="kpi-value red">₩ 45.2 <span class="kpi-unit">억원</span></div>
                            <div class="kpi-sub">전년 대비 <span class="kpi-sub-red">↑2.5%</span> (이행량 증가)</div>
                        </div>
                        <div class="icon-wrapper">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                        </div>
                    </div>
                </div>

                <!-- 총 비용 대비 절감액 -->
                <div class="panel kpi-card">
                    <div class="kpi-title">총 비용 대비 절감액</div>
                    <div class="kpi-card-inner" style="margin-top:6px;">
                        <div class="kpi-text-area">
                            <div class="kpi-value green">₩ 3.5 <span class="kpi-unit">억원</span></div>
                            <div class="kpi-sub">일반 전력 구매 대비</div>
                        </div>
                        <div class="icon-wrapper">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/></svg>
                        </div>
                    </div>
                </div>

                <!-- 자가발전 투자 효율 -->
                <div class="panel kpi-card">
                    <div class="kpi-title">자가발전 투자 효율</div>
                    <div class="kpi-card-inner" style="margin-top:6px;">
                        <div class="kpi-text-area">
                            <div class="kpi-value blue">12.5 <span class="kpi-unit">% (ROI)</span></div>
                            <div class="kpi-sub">투자비 회수기간: 7.2년</div>
                        </div>
                        <div class="icon-wrapper">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. Middle Charts -->
            <div class="row-middle">
                <!-- 월별 추이 -->
                <div class="panel">
                    <div class="panel-title">월별 RE100 이행 비용 추이 (백만원)</div>
                    <div class="legend-row">
                        <span class="legend-item"><span class="legend-dot" style="background:#2563eb;"></span>PPA 비용</span>
                        <span class="legend-item"><span class="legend-dot" style="background:#f59e0b;"></span>REC 구매</span>
                        <span class="legend-item"><span class="legend-dot" style="background:#16a34a;"></span>자가발전 투자/운영</span>
                        <span class="legend-item" style="margin-left:10px;"><span class="legend-circle" style="border-color:#dc2626;"></span><span class="legend-line" style="background:#dc2626;"></span>단위 비용 (원/kWh)</span>
                    </div>
                    <svg class="mixed-chart-svg" viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="none">
                        ${svgContent}
                        <!-- Y축 레이블 부가 텍스트 -->
                        <text x="15" y="${chartH/2}" transform="rotate(-90 15,${chartH/2})" text-anchor="middle" font-size="11" fill="#6b7280" font-weight="600">비용 (백만원)</text>
                        <text x="${chartW - 10}" y="${chartH/2}" transform="rotate(90 ${chartW-10},${chartH/2})" text-anchor="middle" font-size="11" fill="#6b7280" font-weight="600">단가 (원)</text>
                    </svg>
                </div>

                <!-- 파이 차트 -->
                <div class="panel" style="display:flex; flex-direction:column; align-items:center;">
                    <div class="panel-title" style="align-self:flex-start;">이행 수단별 비용 비중</div>
                    <div style="display:flex; align-items:center; flex:1; width:100%; justify-content:center; gap:20px;">
                        <div class="pie-chart"></div>
                        <div class="pie-legend">
                            <span style="display:flex; align-items:center; gap:6px;"><span class="legend-dot" style="background:#2563eb;"></span>PPA</span>
                            <span style="display:flex; align-items:center; gap:6px;"><span class="legend-dot" style="background:#f59e0b;"></span>REC 구매</span>
                            <span style="display:flex; align-items:center; gap:6px;"><span class="legend-dot" style="background:#16a34a;"></span>자가발전</span>
                            <span style="display:flex; align-items:center; gap:6px;"><span class="legend-dot" style="background:#7c3aed;"></span>기타</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. Bottom Table -->
            <div class="panel">
                <div class="panel-title">이행 수단별 상세 현황 (누계)</div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width:16%;">구분</th>
                            <th style="width:16%;">이행량 (MWh)</th>
                            <th style="width:16%;">비중 (%)</th>
                            <th style="width:16%;">총 비용 (백만원)</th>
                            <th style="width:16%;">단위 비용 (원/kWh)</th>
                            <th style="width:20%;">비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="font-weight:700;">제3자 PPA</td>
                            <td class="td-num">20,250</td>
                            <td class="td-num">45.0%</td>
                            <td class="td-num">2,835</td>
                            <td class="td-num">140</td>
                            <td class="td-blue">장기 계약</td>
                        </tr>
                        <tr style="background:#f8fafc;">
                            <td style="font-weight:700;">자가발전 (태양광)</td>
                            <td class="td-num">11,250</td>
                            <td class="td-num">25.0%</td>
                            <td class="td-num">562</td>
                            <td class="td-num">50</td>
                            <td class="td-green">설비 보유</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    `;
}
