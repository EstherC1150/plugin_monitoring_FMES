/**
 * High-fidelity Notice & Education Page based on mockup.
 * Includes in-place search filtering, a Master-Detail view, and a Category List View.
 */

let noticeState = {
    viewMode: "grid", // "grid" | "category" | "detail"
    searchTerm: "",
    selectedCategory: null, // "blue" | "orange" | "green" | "purple"
    selectedNoticeId: null,
    fromCategoryView: false // To remember where the detail view came from
};

const categoryNames = {
    "blue": "에너지 교육",
    "orange": "홍보 및 캠페인",
    "green": "개선요청 및 제안",
    "purple": "탄소중립 정보 (법령/규제)"
};

const noticeData = [
    // Blue - 에너지 교육
    { id: 1, category: "blue", title: "2026년 상반기 에너지 절감 실무자 교육", meta: "일정: 2026.04.15 ~ 04.16 | 장소: 본사 대강당", badgeHtml: `<div class="badge blue">모집중</div>`, content: "본사 대강당에서 진행되는 상반기 에너지 절감 실무자 필수 교육입니다.<br><br><b>[교육 안내]</b><br>- 내용: 공장 내 최신 에너지 절감 기법 및 해외 우수 사례 공유<br>- 강사: 외부 초빙 전문가 및 사내 마스터<br>- 준비물: 개인 노트북 및 사원증 지참<br><br>교육 미이수 시 하반기 인사 평가에 불이익이 있을 수 있으니 부서별 담당자는 반드시 기한 내에 참석하여 주시기 바랍니다." },
    { id: 2, category: "blue", title: "탄소중립 기초 및 RE100 이행 전략 (온라인)", meta: "기간: 상시 수강 가능 | 수강률: 85%", badgeHtml: `<div class="badge green">수강중</div>`, content: "RE100 달성을 위한 사내 필수 온라인 교육 과정입니다.<br><br>사내 LMS 시스템을 통해 모바일로도 자유롭게 수강하실 수 있습니다. 아직 수강을 완료하지 않으신 분들은 가급적 이달 말까지 완료해 주시기 바랍니다." },
    { id: 3, category: "blue", title: "에너지 설비 운영 효율화 가이드 교육", meta: "일정: 2026.03.10 | 대상: 설비 담당자", badgeHtml: `<div class="badge gray">종료</div>`, content: "지난 달 진행되었던 설비 운영 가이드 교육이 성공적으로 마무리되었습니다.<br><br>교육 자료 및 발표 영상은 사내 지식포털(Knowledge Center) 비디오 자료실에 업로드되어 있으니, 부득이하게 참석하지 못하신 분들은 해당 자료를 참고해 주시기 바랍니다." },
    { id: 13, category: "blue", title: "스마트 팩토리 에너지 절감 기초", meta: "기간: 2026.05.01 ~ 05.31 | 수강률: 12%", badgeHtml: `<div class="badge blue">수강중</div>`, content: "스마트 팩토리 도입에 따른 필수 온라인 과정입니다." },
    
    // Orange - 홍보 및 캠페인
    { id: 4, category: "orange", title: "[우수사례] 1공장 압축공기 누설 개선으로 연 5천만원 절감", meta: "등록일: 2026.03.28 | 조회수: 1,245", badgeHtml: `<div style="font-size:16px;">🏆</div>`, content: "1공장 유틸리티팀에서 제안한 노후 압축공기 배관 밸브 교체 및 초음파 누설 탐지 활동을 통해 연간 약 5천만 원 상당의 전력비를 절감한 우수 사례입니다.<br><br>해당 사례를 바탕으로 타 공장에서도 즉각적인 수평 전개를 지시하였으며, 성과를 낸 1공장 담당 파트에는 다음 달 '이달의 우수 팀' 포상이 수여될 예정입니다." },
    { id: 5, category: "orange", title: "3월 '에너지 지킴이' 캠페인 결과 발표", meta: "등록일: 2026.03.25 | 부서별 참여율 공개", badgeHtml: `<div class="badge red-text">NEW</div>`, content: "사내 PC 절전 및 점심시간 소등 캠페인에 적극적으로 참여해주신 임직원 여러분께 감사드립니다.<br><br><b>우수 참여 부서</b><br>1위: 생산관리팀 (98%)<br>2위: 품질보증팀 (92%)<br>3위: 경영지원팀 (89%)<br><br>우수 부서에는 소정의 간식비가 지원될 예정입니다." },
    { id: 6, category: "orange", title: "2026년 에너지 절약 뉴스레터 Vol.3 발간", meta: "등록일: 2026.03.15 | 첨부파일 다운로드", badgeHtml: `<div style="color:#dc2626;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>`, content: "국내외 에너지 시장 동향과 당사의 절약 활동을 정리한 뉴스레터 Vol.3 가 발간되었습니다. 본 글의 첨부파일을 클릭하여 PDF 버전을 다운로드하실 수 있습니다." },
    { id: 14, category: "orange", title: "점심시간 완전 소등 캠페인 연장 안내", meta: "등록일: 2026.04.10 | 총무팀", badgeHtml: `<div class="badge orange">안내</div>`, content: "하절기 전력피크 대비 점심시간 완전 소등 캠페인을 8월까지 연장합니다." },

    // Green - 개선요청 및 제안
    { id: 7, category: "green", title: "2공장 공조기 인버터 제어 방식 개선 제안", meta: "제안자: 김철수 | 제안일: 2026.03.30", badgeHtml: `<div class="badge orange">검토중</div>`, content: "기존 댐퍼 제어 방식의 2공장 AHU(공기조화기)에 인버터를 도입하여 회전수 제어 방식으로 변경하는 제안입니다.<br><br>현재 시설팀에서 초기 투자비 및 예상 전력 절감액에 대한 ROI(투자수익률)를 심도 있게 검토 중입니다. 긍정적인 방향으로 결론이 날 경우 내년도 예산에 반영될 수 있습니다." },
    { id: 8, category: "green", title: "조립라인 LED 조명 교체 및 센서 설치 요청", meta: "제안자: 박영희 | 제안일: 2026.03.20", badgeHtml: `<div class="badge blue">진행중</div>`, content: "근무자가 없는 휴식 시간 및 야간에 불필요하게 켜져 있는 조명을 자동으로 끄기 위해, 고효율 LED 조명 교체와 더불어 재실 센서 설치 작업이 진행 중입니다.<br><br>현재 자재 발주가 완료되었으며 이번 주 주말을 이용하여 교체 공사가 시작될 예정입니다. 작업 기간 중 일부 구역 통행이 제한될 수 있습니다." },
    { id: 9, category: "green", title: "노후 보일러 폐열 회수 장치 설치 건", meta: "제안자: 시설팀 | 제안일: 2026.02.15", badgeHtml: `<div class="badge green">완료</div>`, content: "제안해주신 보일러 연도 폐열 회수기(Economizer) 설치 공사가 2월 말 성공적으로 마무리되었습니다.<br><br>한 달간 가동 데이터를 모니터링한 결과, 급수 예열을 통해 전년 동월 대비 가스 사용량이 약 15% 이상 절감되는 훌륭한 성과를 거두었습니다." },
    { id: 15, category: "green", title: "3공장 스크러버 용수 재활용 시스템 도입", meta: "제안자: 이영호 | 제안일: 2026.04.05", badgeHtml: `<div class="badge orange">검토중</div>`, content: "스크러버 용수를 정수 처리하여 재활용하는 시스템 도입 제안입니다." },

    // Purple - 탄소중립 정보
    { id: 10, category: "purple", title: "[법령] 탄소중립기본법 시행령 개정안 입법예고", meta: "카테고리: 법령 | 등록일: 2026.03.20", badgeHtml: `<div class="badge red-text">중요</div>`, content: "정부에서 발표한 탄소중립기본법 시행령 일부개정안에 대한 안내입니다.<br><br>배출권 거래제 할당 대상 업체의 의무 감축량이 상향 조정될 수 있는 내용이 포함되어 있어, 당사 ESG 경영팀에서 심층 분석을 진행하고 있습니다. 관련 부서장들께서는 첨부된 법령 원문을 반드시 숙지해 주시기 바랍니다." },
    { id: 11, category: "purple", title: "[용어] Scope 3 배출량 산정 가이드라인 및 주요 용어 해설", meta: "카테고리: 가이드 | 등록일: 2026.03.10", badgeHtml: `<div class="badge purple-text">Update</div>`, content: "직접 배출(Scope 1) 및 간접 배출(Scope 2) 외에, 협력사 및 물류망을 포함한 기타 간접 배출(Scope 3) 산정에 대한 최신 글로벌 가이드라인 요약본입니다.<br><br>특히 공급망 ESG 평가가 강화됨에 따라 구매/물류 부서의 세부 데이터 확보가 중요해졌습니다." },
    { id: 12, category: "purple", title: "[FAQ] RE100 이행 수단별 인정 기준 자주 묻는 질문", meta: "카테고리: FAQ | 등록일: 2026.02.28", badgeHtml: `<div style="color:#2563eb;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>`, content: "녹색프리미엄 요금제, REC(신재생에너지 공급인증서) 구매, 제3자 PPA(전력구매계약), 자가 발전 등 기업의 RE100 이행을 위한 각 수단별 장단점과 인정 기준에 대해 자주 묻는 질문(FAQ)을 정리했습니다." },
    { id: 16, category: "purple", title: "[공지] 2026년 지속가능경영보고서 초안 검토 요청", meta: "카테고리: 공지 | 등록일: 2026.04.18", badgeHtml: `<div class="badge red-text">중요</div>`, content: "올해 발간 예정인 지속가능경영보고서 초안입니다. 각 부서별 데이터 확인 요망." },
];

export const NOTICE_STYLES = `
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
    let items = noticeData.filter(d => d.category === category && d.title.toLowerCase().includes(term));
    
    if (limit) items = items.slice(0, limit);

    if (items.length === 0) {
        return `<div class="empty-state">"${noticeState.searchTerm}" 검색 결과가 없습니다.</div>`;
    }

    return items.map(item => `
        <div class="list-item" data-id="${item.id}">
            <div class="item-content">
                <div class="item-title">${item.title}</div>
                <div class="item-meta">${item.meta}</div>
            </div>
            ${item.badgeHtml}
        </div>
    `).join("");
}

export function renderNoticePage() {
    // === 1. DETAIL VIEW ===
    if (noticeState.viewMode === "detail" && noticeState.selectedNoticeId) {
        const item = noticeData.find(d => d.id === noticeState.selectedNoticeId);
        if (item) {
            return `
                <style>${NOTICE_STYLES}</style>
                <div class="notice-page">
                    <div class="panel-view">
                        <div>
                            <div class="back-btn" id="NoticeDetailBackBtn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                목록으로 돌아가기
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

    // === 2. CATEGORY LIST VIEW ===
    if (noticeState.viewMode === "category" && noticeState.selectedCategory) {
        const catName = categoryNames[noticeState.selectedCategory] || "공지사항";
        return `
            <style>${NOTICE_STYLES}</style>
            <div class="notice-page">
                <!-- 상단 검색바 영역 (카테고리 내 검색) -->
                <div class="notice-header">
                    <div class="notice-title">${catName}</div>
                    <div class="notice-header-right">
                        <div class="notice-search-wrap">
                            <input type="text" class="notice-search-input" id="NoticeSearchInput" placeholder="'${catName}' 내 검색..." value="${noticeState.searchTerm}" />
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
                            전체 카테고리로 돌아가기
                        </div>
                    </div>
                    <div class="category-list-wrap">
                        ${getFilteredListHtml(noticeState.selectedCategory)}
                    </div>
                </div>
            </div>
        `;
    }

    // === 3. LIST VIEW (GRID) ===
    return `
        <style>${NOTICE_STYLES}</style>
        <div class="notice-page">
            <!-- 상단 검색바 영역 -->
            <div class="notice-header">
                <div class="notice-title">공지사항 및 교육</div>
                <div class="notice-header-right">
                    <div class="notice-search-wrap">
                        <input type="text" class="notice-search-input" id="NoticeSearchInput" placeholder="전체 검색어 입력..." value="${noticeState.searchTerm}" />
                        <svg class="notice-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <div class="notice-admin">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        관리자
                    </div>
                </div>
            </div>

            <!-- 4분할 그리드 -->
            <div class="notice-grid">
                
                <!-- 1. 에너지 교육 -->
                <div class="notice-card theme-blue">
                    <div class="card-header">
                        <div class="card-title-wrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                            에너지 교육
                        </div>
                        <div class="card-more" data-category="blue">더보기 ></div>
                    </div>
                    <div class="card-list">
                        ${getFilteredListHtml("blue", 3)}
                    </div>
                </div>

                <!-- 2. 홍보 및 캠페인 -->
                <div class="notice-card theme-orange">
                    <div class="card-header">
                        <div class="card-title-wrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            홍보 및 캠페인
                        </div>
                        <div class="card-more" data-category="orange">더보기 ></div>
                    </div>
                    <div class="card-list">
                        ${getFilteredListHtml("orange", 3)}
                    </div>
                </div>

                <!-- 3. 개선요청 및 제안 -->
                <div class="notice-card theme-green">
                    <div class="card-header">
                        <div class="card-title-wrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
                            개선요청 및 제안
                        </div>
                        <div class="card-more" data-category="green">더보기 ></div>
                    </div>
                    <div class="card-list">
                        ${getFilteredListHtml("green", 3)}
                    </div>
                </div>

                <!-- 4. 탄소중립 정보 -->
                <div class="notice-card theme-purple">
                    <div class="card-header">
                        <div class="card-title-wrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                            탄소중립 정보 (법령/규제)
                        </div>
                        <div class="card-more" data-category="purple">더보기 ></div>
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
    listItems.forEach(item => {
        item.addEventListener("click", () => {
            const id = item.getAttribute("data-id");
            if (id) {
                noticeState.selectedNoticeId = parseInt(id, 10);
                noticeState.fromCategoryView = (noticeState.viewMode === "category");
                noticeState.viewMode = "detail";
                reRenderLocal(container);
            }
        });
    });
}

function updateSearchResults(container) {
    if (noticeState.viewMode === "grid") {
        const cards = [
            { cat: "blue", node: container.querySelector('.theme-blue .card-list') },
            { cat: "orange", node: container.querySelector('.theme-orange .card-list') },
            { cat: "green", node: container.querySelector('.theme-green .card-list') },
            { cat: "purple", node: container.querySelector('.theme-purple .card-list') }
        ];
        cards.forEach(c => {
            if (c.node) c.node.innerHTML = getFilteredListHtml(c.cat, 3);
        });
    } else if (noticeState.viewMode === "category" && noticeState.selectedCategory) {
        const wrap = container.querySelector('.category-list-wrap');
        if (wrap) {
            wrap.innerHTML = getFilteredListHtml(noticeState.selectedCategory);
        }
    }
    
    // 새로 렌더링된 리스트 아이템들에 클릭 이벤트 다시 달아주기
    bindListItemClicks(container);
}

// Event Binder called by core.js after rendering
export function renderNoticePageInit(container) {
    // 1. Search Input Binding
    const searchInput = container.querySelector("#NoticeSearchInput");
    if (searchInput) {
        searchInput.focus();
        const val = searchInput.value;
        searchInput.value = '';
        searchInput.value = val;

        searchInput.addEventListener("input", (e) => {
            noticeState.searchTerm = e.target.value;
            // 입력창(input)이 파괴되지 않도록 리스트 영역만 부분 업데이트
            updateSearchResults(container);
        });
    }

    // 2. More Button Binding (Go to Category View)
    const moreBtns = container.querySelectorAll(".card-more");
    moreBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const cat = btn.getAttribute("data-category");
            if (cat) {
                noticeState.viewMode = "category";
                noticeState.selectedCategory = cat;
                noticeState.searchTerm = ""; // 검색어 초기화
                reRenderLocal(container);
            }
        });
    });

    // 3. List Item Click Binding (Go to Detail View)
    bindListItemClicks(container);

    // 4. Category View Back Button Binding (Go to Grid)
    const catBackBtn = container.querySelector("#NoticeCategoryBackBtn");
    if (catBackBtn) {
        catBackBtn.addEventListener("click", () => {
            noticeState.viewMode = "grid";
            noticeState.selectedCategory = null;
            noticeState.searchTerm = "";
            reRenderLocal(container);
        });
    }

    // 5. Detail View Back Button Binding (Go to Previous View)
    const detailBackBtn = container.querySelector("#NoticeDetailBackBtn");
    if (detailBackBtn) {
        detailBackBtn.addEventListener("click", () => {
            noticeState.viewMode = noticeState.fromCategoryView ? "category" : "grid";
            noticeState.selectedNoticeId = null;
            reRenderLocal(container);
        });
    }
}

// Local re-renderer to avoid refreshing the whole shell
function reRenderLocal(container) {
    container.innerHTML = renderNoticePage();
    renderNoticePageInit(container);
}
