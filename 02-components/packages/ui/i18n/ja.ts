const ja = {
  ui: {
    common: {
      ok: 'OK',
      cancel: 'キャンセル',
      loading: '読み込み中',
      close: '閉じる',
      more: 'もっと見る'
    },
    breadcrumb: {
      ariaLabel: 'ブレッドクラム'
    },
    confirm: {
      deleteTitle: '削除',
      deleteCta: '削除',
      deletePromptRich: '<name></name>を削除しますか?この操作は元に戻すことができません。'
    },
    dialog: {
      ok: 'OK',
      cancel: 'キャンセル'
    },
    table: {
      selectionSummary: '{count} 件を選択中',
      selectAll: 'すべての {total} を選択します',
      clear: 'クリア',
      emptyAlt: '空の',
      emptyTitle: 'データなし',
      emptyDesc: '現在表示するものはありません。',
      resizeColumn: '{columnName} 列のサイズを変更します'
    },
    pagination: {
      ariaLabel: 'ページネーション',
      previous: '前へ',
      next: '次へ',
      goTo: 'に行く',
      page: 'ページ',
      totalItems: '合計 {total} 件',
      perPage: '{size} / ページ',
      goToPreviousPage: '前のページに移動',
      goToNextPage: '次のページへ',
      morePages: 'さらに多くのページ'
    },
    command: {
      paletteTitle: 'コマンドパネル',
      paletteDesc: '実行するコマンドを検索します...',
      searchPlaceholder: '検索...'
    },
    multiSelect: {
      placeholder: '選択してください...',
      searchPlaceholder: '検索...',
      empty: 'データが見つかりませんでした。'
    },
    filter: {
      title: 'フィルター...',
      trigger: 'フィルター',
      reset: 'リセット',
      apply: '今すぐお申し込みください'
    },
    sidebar: {
      title: 'サイドバー',
      mobileDesc: 'モバイルでサイドバーを表示します。',
      toggle: 'サイドバーの切り替え'
    },
    clipboard: {
      copy: 'コピー',
      copied: 'コピーされました'
    },
    select: {
      placeholder: '選択してください'
    }
  }
} as const;

export default ja;
