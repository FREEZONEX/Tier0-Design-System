const ko = {
  ui: {
    common: {
      ok: '알았어',
      cancel: '취소',
      loading: '로드 중',
      close: '닫기',
      more: '더보기'
    },
    breadcrumb: {
      ariaLabel: '탐색경로'
    },
    confirm: {
      deleteTitle: '삭제',
      deleteCta: '삭제',
      deletePromptRich: '<name></name>을(를) 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.'
    },
    dialog: {
      ok: '알았어',
      cancel: '취소'
    },
    table: {
      selectionSummary: '{count}개 항목 선택됨',
      selectAll: '{total} 모두 선택',
      clear: '지우기',
      emptyAlt: '비어 있음',
      emptyTitle: '데이터 없음',
      emptyDesc: '지금은 표시할 항목이 없습니다.',
      resizeColumn: '{columnName} 열 크기 조정'
    },
    pagination: {
      ariaLabel: '페이지 매김',
      previous: '이전',
      next: '다음',
      goTo: '이동',
      page: '페이지',
      totalItems: '총 {total}개 항목',
      perPage: '{size}/페이지',
      goToPreviousPage: '이전 페이지로 이동',
      goToNextPage: '다음 페이지로 이동',
      morePages: '더 많은 페이지'
    },
    command: {
      paletteTitle: '명령 패널',
      paletteDesc: '실행할 명령을 검색하세요...',
      searchPlaceholder: '검색...'
    },
    multiSelect: {
      placeholder: '선택...',
      searchPlaceholder: '검색...',
      empty: '데이터가 없습니다.'
    },
    filter: {
      title: '필터...',
      trigger: '필터',
      reset: '재설정',
      apply: '지금 신청하세요'
    },
    sidebar: {
      title: '사이드바',
      mobileDesc: '모바일에서 사이드바를 표시합니다.',
      toggle: '사이드바 전환'
    },
    clipboard: {
      copy: '복사',
      copied: '복사됨'
    },
    select: {
      placeholder: '선택해주세요'
    }
  }
} as const;

export default ko;
