/**
 * Dashboard notice page.
 */
export function renderNoticePage() {
    return `
        <div class="notice-page" style="display:flex; flex-direction:column; gap:14px;">
            <div style="background:#fff; border:1px solid var(--border-color); border-radius:12px; padding:18px 20px;">
                <div style="font-size:16px; font-weight:700; color:var(--hyundai-navy); margin-bottom:6px;">공지사항</div>
                <div style="font-size:13px; color:#6b7280;">운영 공지와 시스템 점검 일정을 확인할 수 있습니다.</div>
            </div>
            <div style="background:#fff; border:1px solid var(--border-color); border-radius:12px; overflow:hidden;">
                <div style="display:grid; grid-template-columns: 120px 1fr 140px; gap:12px; padding:12px 18px; font-size:13px; font-weight:600; color:#4b5563; background:#f8fafc; border-bottom:1px solid var(--border-color);">
                    <div>구분</div>
                    <div>제목</div>
                    <div>등록일</div>
                </div>
                <div style="display:grid; grid-template-columns: 120px 1fr 140px; gap:12px; padding:14px 18px; font-size:14px; border-bottom:1px solid var(--border-color);">
                    <div style="color:#0f766e; font-weight:600;">운영</div>
                    <div>[안내] 4월 에너지 리포트 게시 예정</div>
                    <div style="color:#6b7280;">2026-04-16</div>
                </div>
                <div style="display:grid; grid-template-columns: 120px 1fr 140px; gap:12px; padding:14px 18px; font-size:14px;">
                    <div style="color:#92400e; font-weight:600;">점검</div>
                    <div>[점검] 데이터 수집 서버 정기 점검 (04/20 02:00~04:00)</div>
                    <div style="color:#6b7280;">2026-04-15</div>
                </div>
            </div>
        </div>
    `;
}
