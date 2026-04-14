/**
 * Refined Overview Page with root style classes.
 */

const PAGE_STYLES = `
    .card-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin-bottom: 25px;
    }

    .stat-card {
        background: white;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        padding: 20px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.02);
    }

    .card-header {
        font-size: 13px;
        color: #555;
        margin-bottom: 12px;
    }

    .card-body {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .card-value {
        font-size: 28px;
        font-weight: 700;
        color: var(--hyundai-navy);
    }

    .card-unit {
        font-size: 14px;
        color: #999;
        margin-left: 4px;
    }
`;

export function renderOverviewPage() {
    return `
        <style>${PAGE_STYLES}</style>
        <div class="overview-page">
            <div class="card-grid">
                <div class="stat-card">
                    <div class="card-header">오늘의 전력 사용량</div>
                    <div class="card-body">
                        <span class="card-value">12,457</span>
                        <span class="card-unit">kWh</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="card-header">LNG 사용 실적</div>
                    <div class="card-body">
                        <span class="card-value">852</span>
                        <span class="card-unit">m³</span>
                    </div>
                </div>
                <!-- 추가 카드는 개발자가 구조를 확인 후 확장 가능 -->
            </div>
            
            <div style="background: white; border-radius: 12px; border: 1px solid var(--border-color); padding: 30px; text-align: center; color: #999;">
                실시간 데이터 차트 영역 (구조 확인용 샘플)
            </div>
        </div>
    `;
}
