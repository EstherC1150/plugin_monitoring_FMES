/**
 * Sample Energy Monitoring Page.
 */

export function renderEnergyPage() {
    return `
        <div class="energy-page">
            <div style="background: white; border-radius: 12px; border: 1px solid var(--border-color); padding: 25px; margin-bottom: 25px;">
                <h3 style="margin-top:0; color:var(--hyundai-navy);">에너지 실시간 분석</h3>
                <p style="color:#666; font-size:14px;">선택된 계통의 실시간 에너지 흐름 및 사용 패턴을 분석합니다.</p>
            </div>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                <div style="background: white; border-radius: 12px; border: 1px solid var(--border-color); height: 200px; padding:20px;">
                    <div style="font-weight:700; font-size:14px; margin-bottom:15px;">부하 패턴</div>
                    <div style="height:120px; background:#f8f9fa; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#ccc;">Chart Area</div>
                </div>
                <div style="background: white; border-radius: 12px; border: 1px solid var(--border-color); height: 200px; padding:20px;">
                    <div style="font-weight:700; font-size:14px; margin-bottom:15px;">역률 관리</div>
                    <div style="height:120px; background:#f8f9fa; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#ccc;">Chart Area</div>
                </div>
            </div>
        </div>
    `;
}
