/**
 * Refined Overview Page with root style classes.
 */

const PAGE_STYLES = `
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

export function renderOverviewPage() {
  // 샘플 데이터 (API 연동 시 교체)
  const kpis = [
    {
      title: "전력 사용현황",
      value: "12,450",
      unit: "kWh",
      subLabel: "전일",
      subValue: "11,890 kWh",
      deltaText: "4.7%",
      deltaDir: "up",
      iconBg: "#1f4c8f",
      iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
    },
    {
      title: "LNG 사용현황",
      value: "850",
      unit: "m³",
      subLabel: "전일",
      subValue: "890 m³",
      deltaText: "4.5%",
      deltaDir: "down",
      iconBg: "#f97316",
      iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2s4 4 4 8a4 4 0 1 1-8 0c0-4 4-8 4-8z"></path><path d="M8.5 14.5c.5 2.5 2.5 4 3.5 4s3-1.5 3.5-4"></path></svg>`,
    },
    {
      title: "스팀 사용현황",
      value: "42.5",
      unit: "Ton",
      subLabel: "전일",
      subValue: "41.8 Ton",
      deltaText: "0.7%",
      deltaDir: "up",
      iconBg: "#14b8a6",
      iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12c2.5-3 5.5-3 8 0s5.5 3 10 0"></path><path d="M3 18c2.5-3 5.5-3 8 0s5.5 3 10 0"></path><path d="M3 6c2.5-3 5.5-3 8 0s5.5 3 10 0"></path></svg>`,
    },
    {
      title: "압축공기 사용현황",
      value: "2,150",
      unit: "Nm³",
      subLabel: "전일",
      subValue: "2,200 Nm³",
      deltaText: "2.3%",
      deltaDir: "down",
      iconBg: "#64748b",
      iconSvg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16"></path><path d="M6 7h12"></path><path d="M6 17h12"></path><path d="M10 7v10"></path><path d="M14 7v10"></path></svg>`,
    },
  ];

  const tableRows = [
    {
      label: "전월 실적 (2월)",
      labelClass: "row-label",
      cells: ["45,200", "125,400", "350,200", "12,500", "185.4"],
    },
    {
      label: "금년 누계 (1~3월)",
      labelClass: "row-label emph",
      cells: ["128,500", "365,800", "1,020,500", "38,200", "542.8"],
    },
  ];

  // 연간 월별 (평일/휴일) 샘플 값
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const weekday = [120, 115, 118, 110, 105, 108, 125, 130, 118, 112, 114, 122];
  const weekend = [95, 92, 90, 86, 82, 84, 98, 102, 96, 90, 92, 97];

  const makeLinePath = (values, w, h, pad) => {
    const min = Math.min(...weekday, ...weekend) - 5;
    const max = Math.max(...weekday, ...weekend) + 5;
    const xStep = (w - pad * 2) / (values.length - 1);
    const yScale = (h - pad * 2) / (max - min || 1);
    const pts = values.map((v, i) => {
      const x = pad + xStep * i;
      const y = h - pad - (v - min) * yScale;
      return [x, y];
    });
    const d = pts
      .map(
        ([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`,
      )
      .join(" ");
    return { d, min, max };
  };

  const chartW = 920;
  const chartH = 160;
  const pad = 18;
  const { d: weekdayD } = makeLinePath(weekday, chartW, chartH, pad);
  const {
    d: weekendD,
    min: yMin,
    max: yMax,
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
                ${kpis
                  .map(
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
                `,
                  )
                  .join("")}
            </div>

            <div class="panel content-block">
                <div class="block-title">전월 / 누계 실적 현황</div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width:170px;">구분</th>
                            <th class="num">사업장 생산량 (EA)</th>
                            <th class="num">에너지 비용 (천원)</th>
                            <th class="num">전력 사용량 (kWh)</th>
                            <th class="num">LNG 사용량 (m³)</th>
                            <th class="num">온실가스 (tCO₂)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows
                          .map(
                            (r) => `
                            <tr>
                                <td class="${r.labelClass}">${r.label}</td>
                                ${r.cells.map((v) => `<td class="num">${v}</td>`).join("")}
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>

            <div class="panel content-block">
                <div class="chart-wrap">
                    <div class="block-title" style="margin-bottom:0;">연간 월단위 대기전력 현황 (평일실아 vs 휴일)</div>

                    <div class="chart-card">
                        <div class="legend">
                            <span class="legend-item"><span class="legend-dot weekday"></span>평일 실아 (kW)</span>
                            <span class="legend-item"><span class="legend-dot weekend"></span>휴일 (kW)</span>
                        </div>
                        <svg class="chart-svg" viewBox="0 0 ${chartW} ${chartH}" preserveAspectRatio="none">
                            ${yGrid
                              .map(
                                (g) => `
                                <line x1="${pad}" x2="${chartW - pad}" y1="${g.y}" y2="${g.y}" stroke="#e5e7eb" stroke-width="1" />
                                <text x="${pad - 8}" y="${g.y + 4}" text-anchor="end" font-size="11" fill="#6b7280" font-weight="600">${g.val}</text>
                            `,
                              )
                              .join("")}
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
