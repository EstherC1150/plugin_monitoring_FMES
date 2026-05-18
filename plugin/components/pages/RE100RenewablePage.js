/**
 * RE100 재생에너지 사용량 페이지 (태양광 및 PPA)
 */

const PAGE_STYLES = `
    .renewable-page {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .section-card {
        background: white;
        border-radius: 12px;
        border: 1px solid var(--border-color, #e5e7eb);
        box-shadow: 0 2px 5px rgba(0,0,0,0.02);
        padding: 12px 20px;
        position: relative;
        overflow: hidden;
    }

    /* Left Border Accent */
    .section-card.solar { border-left: 6px solid #f59e0b; }
    .section-card.ppa { border-left: 6px solid #16a34a; }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
    }

    .section-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        font-weight: 800;
        color: var(--hyundai-navy, #111827);
    }

    .summary-boxes {
        display: flex;
        gap: 10px;
    }

    .sum-box {
        background: #f8fafc;
        border-radius: 8px;
        padding: 10px 14px;
        min-width: 100px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .sum-box.yellow-bg { background: #fef3c7; }
    .sum-box.blue-bg { background: #dbeafe; }
    .sum-box.green-bg { background: #dcfce7; }
    .sum-box.orange-bg { background: #ffedd5; }
    .sum-box.purple-bg { background: #f3e8ff; }

    .sum-label {
        font-size: 11px;
        color: #6b7280;
        font-weight: 600;
    }

    .sum-val {
        font-size: 14px;
        font-weight: 800;
    }

    .val-yellow { color: #d97706; }
    .val-black { color: #374151; }
    .val-blue { color: #1d4ed8; }
    .val-green { color: #15803d; }
    .val-orange { color: #ea580c; }

    .chart-container {
        position: relative;
        width: 100%;
        height: 240px;
        margin-top: 10px;
    }

    .legend-top-right {
        position: absolute;
        top: 0px;
        right: 0;
        display: flex;
        gap: 12px;
        font-size: 11px;
        font-weight: 700;
        color: #4b5563;
    }

    .leg-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .leg-circle {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid;
    }

    .chart-svg {
        width: 100%;
        height: 100%;
        display: block;
    }
`;

export function renderRE100RenewablePage(filters = {}) {
    const { site = "all", date = "" } = filters;

    // SVG Chart Dimension
    const chartW = 900;
    const chartH = 240;
    const padX = 40;
    const padY = 45;

    // 1~31일 데이터
    const days = Array.from({length: 31}, (_, i) => i + 1);
    const xStep = (chartW - padX * 2) / 30;

    // 1) 태양광 데이터
    const solarMax = 1500;
    const solarGen = [800, 850, 950, 1100, 1200, 1150, 500, 320, 900, 950, 1000, 1150, 1200, 1100, 950, 850, 750, 450, 350, 850, 950, 1000, 1050, 1150, 1250, 1150, 950, 850, 900, 1050, 1100];
    const solarUse = [800, 820, 900, 950, 980, 950, 480, 300, 850, 880, 950, 980, 1000, 950, 850, 800, 700, 400, 320, 800, 850, 900, 950, 980, 1000, 950, 850, 800, 850, 900, 950];

    let solarGenPath = '';
    let solarUsePath = '';
    let solarPoints = '';
    let solarAreaPath = '';

    days.forEach((d, i) => {
        const cx = padX + xStep * i;
        const cyGen = chartH - padY - (solarGen[i] / solarMax) * (chartH - padY * 2);
        const cyUse = chartH - padY - (solarUse[i] / solarMax) * (chartH - padY * 2);

        solarGenPath += `${i === 0 ? 'M' : 'L'} ${cx} ${cyGen} `;
        solarUsePath += `${i === 0 ? 'M' : 'L'} ${cx} ${cyUse} `;
        
        solarAreaPath += `${i === 0 ? 'M' : 'L'} ${cx} ${cyGen} `;
        solarPoints += `<circle cx="${cx}" cy="${cyGen}" r="3" fill="#f59e0b" />`;
    });
    // Close area path
    solarAreaPath += `L ${padX + xStep * 30} ${chartH - padY} L ${padX} ${chartH - padY} Z`;

    // 2) PPA 데이터
    const ppaMax = 2000;
    const ppaLimit = 2100; // 빨간 점선
    const ppaUse = [1200, 1300, 1400, 1450, 1500, 1100, 850, 1300, 1400, 1550, 1600, 1650, 1700, 1600, 1500, 1400, 1200, 950, 1350, 1450, 1500, 1600, 1750, 1900, 2100, 1800, 1650, 1500, 1400, 1550, 1600];

    let ppaPath = '';
    let ppaAreaPath = '';
    let ppaPoints = '';

    days.forEach((d, i) => {
        const cx = padX + xStep * i;
        const cyPpa = chartH - padY - (ppaUse[i] / ppaMax) * (chartH - padY * 2);

        ppaPath += `${i === 0 ? 'M' : 'L'} ${cx} ${cyPpa} `;
        ppaAreaPath += `${i === 0 ? 'M' : 'L'} ${cx} ${cyPpa} `;
        ppaPoints += `<circle cx="${cx}" cy="${cyPpa}" r="3" fill="#16a34a" />`;
    });
    ppaAreaPath += `L ${padX + xStep * 30} ${chartH - padY} L ${padX} ${chartH - padY} Z`;

    const cyLimit = chartH - padY - (ppaLimit / ppaMax) * (chartH - padY * 2);

    // X축 렌더링 함수
    const renderXAxis = () => {
        let xhtml = '';
        [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31].forEach(d => {
            const cx = padX + xStep * (d - 1);
            xhtml += `<text x="${cx}" y="${chartH - padY + 15}" text-anchor="middle" font-size="11" fill="#6b7280">${d}일</text>`;
        });
        return xhtml;
    };

    return `
        <style>${PAGE_STYLES}</style>
        <div class="renewable-page">

            <!-- 1. 태양광 자가발전 현황 -->
            <div class="section-card solar">
                <div class="section-header">
                    <div class="section-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                        태양광 자가발전 현황
                    </div>
                    <div class="summary-boxes">
                        <div class="sum-box yellow-bg">
                            <span class="sum-label">일 최대 발전</span>
                            <span class="sum-val val-yellow">1,250 kWh</span>
                        </div>
                        <div class="sum-box">
                            <span class="sum-label">일 최소 발전</span>
                            <span class="sum-val val-black">320 kWh</span>
                        </div>
                        <div class="sum-box blue-bg">
                            <span class="sum-label">일 평균 발전</span>
                            <span class="sum-val val-blue">845 kWh</span>
                        </div>
                        <div class="sum-box green-bg">
                            <span class="sum-label">월 누계</span>
                            <span class="sum-val val-green">25.4 MWh</span>
                        </div>
                        <div class="sum-box orange-bg">
                            <span class="sum-label">전체 구매량 (연간)</span>
                            <span class="sum-val val-orange">85.2 MWh</span>
                        </div>
                    </div>
                </div>

                <div class="chart-container">
                    <div class="legend-top-right">
                        <div class="leg-item"><div class="leg-circle" style="border-color:#f59e0b; background:white;"></div> 일별 발전량 (kWh)</div>
                        <div class="leg-item"><div class="leg-circle" style="border-color:#0ea5e9; background:white;"></div> 자가 소비량 (kWh)</div>
                    </div>
                    <svg class="chart-svg" viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="none">
                        <!-- Y축 그리드 -->
                        ${[0, 500, 1000, 1500].map(val => {
                            const y = chartH - padY - (val / solarMax) * (chartH - padY * 2);
                            return `
                                <line x1="${padX}" x2="${chartW}" y1="${y}" y2="${y}" stroke="#e5e7eb" stroke-width="1" />
                                <text x="${padX - 5}" y="${y + 4}" text-anchor="end" font-size="11" fill="#6b7280">${val}</text>
                            `;
                        }).join('')}
                        
                        <!-- Area -->
                        <path d="${solarAreaPath}" fill="#fef3c7" opacity="0.5" />
                        
                        <!-- Lines -->
                        <path d="${solarGenPath}" fill="none" stroke="#f59e0b" stroke-width="2" />
                        <path d="${solarUsePath}" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="4 4" />
                        
                        <!-- Points -->
                        ${solarPoints}

                        <!-- X축 -->
                        ${renderXAxis()}
                    </svg>
                </div>
            </div>

            <!-- 2. PPA 현황 -->
            <div class="section-card ppa">
                <div class="section-header">
                    <div class="section-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        PPA (재생에너지 구매) 현황
                    </div>
                    <div class="summary-boxes">
                        <div class="sum-box green-bg">
                            <span class="sum-label">일 최대 사용</span>
                            <span class="sum-val val-green">2,100 kWh</span>
                        </div>
                        <div class="sum-box">
                            <span class="sum-label">일 최소 사용</span>
                            <span class="sum-val val-black">850 kWh</span>
                        </div>
                        <div class="sum-box blue-bg">
                            <span class="sum-label">일 평균 사용</span>
                            <span class="sum-val val-blue">1,450 kWh</span>
                        </div>
                        <div class="sum-box green-bg">
                            <span class="sum-label">월 총 구매</span>
                            <span class="sum-val val-green">43.5 MWh</span>
                        </div>
                        <div class="sum-box purple-bg">
                            <span class="sum-label">전체 구매량 (연간)</span>
                            <span class="sum-val val-blue">154.2 MWh</span>
                        </div>
                    </div>
                </div>

                <div class="chart-container">
                    <div class="legend-top-right">
                        <div class="leg-item"><div class="leg-circle" style="border-color:#16a34a; background:white;"></div> PPA 일별 사용량 (kWh)</div>
                        <div class="leg-item"><div class="leg-circle" style="border-color:#ef4444; background:white;"></div> 계약 한도 (kWh)</div>
                    </div>
                    <svg class="chart-svg" viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="none">
                        <!-- Y축 그리드 -->
                        ${[0, 1000, 2000].map(val => {
                            const y = chartH - padY - (val / ppaMax) * (chartH - padY * 2);
                            return `
                                <line x1="${padX}" x2="${chartW}" y1="${y}" y2="${y}" stroke="#e5e7eb" stroke-width="1" />
                                <text x="${padX - 5}" y="${y + 4}" text-anchor="end" font-size="11" fill="#6b7280">${val}</text>
                            `;
                        }).join('')}
                        
                        <!-- Area -->
                        <path d="${ppaAreaPath}" fill="#dcfce7" opacity="0.5" />
                        
                        <!-- Lines -->
                        <path d="${ppaPath}" fill="none" stroke="#16a34a" stroke-width="2" />
                        
                        <!-- Limit Line -->
                        <line x1="${padX}" x2="${chartW}" y1="${cyLimit}" y2="${cyLimit}" stroke="#ef4444" stroke-width="1" stroke-dasharray="4 4" />

                        <!-- Points -->
                        ${ppaPoints}

                        <!-- X축 -->
                        ${renderXAxis()}
                    </svg>
                </div>
            </div>

        </div>
    `;
}
