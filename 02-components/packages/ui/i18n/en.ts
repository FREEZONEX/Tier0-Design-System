const en = {
  ui: {
    common: {
      ok: 'OK',
      cancel: 'Cancel',
      loading: 'Loading',
      close: 'Close',
      more: 'More'
    },
    breadcrumb: {
      ariaLabel: 'Breadcrumb'
    },
    confirm: {
      deleteTitle: 'Delete',
      deleteCta: 'Delete',
      deletePromptRich: 'Delete <name></name>? This action cannot be undone.'
    },
    dialog: {
      ok: 'OK',
      cancel: 'Cancel'
    },
    table: {
      selectionSummary: '{count, plural, one {# item} other {# items}} selected',
      selectAll: 'Select all {total}',
      clear: 'Clear',
      emptyAlt: 'Empty',
      emptyTitle: 'No data',
      emptyDesc: 'Nothing to display right now.',
      resizeColumn: 'Resize {columnName} column'
    },
    pagination: {
      ariaLabel: 'Pagination',
      previous: 'Previous',
      next: 'Next',
      goTo: 'Go to',
      page: 'Page',
      totalItems: '{total, plural, one {# item in total} other {# items in total}}',
      perPage: '{size} / page',
      goToPreviousPage: 'Go to Previous Page',
      goToNextPage: 'Go to Next Page',
      morePages: 'More Pages'
    },
    command: {
      paletteTitle: 'Command Panel',
      paletteDesc: 'Search for a command to run...',
      searchPlaceholder: 'Search...'
    },
    multiSelect: {
      placeholder: 'Select...',
      searchPlaceholder: 'Search...',
      empty: 'No data found.'
    },
    filter: {
      title: 'Filter...',
      trigger: 'Filter',
      reset: 'Reset',
      apply: 'Apply Now'
    },
    sidebar: {
      title: 'Sidebar',
      mobileDesc: 'Displays the sidebar on mobile.',
      toggle: 'Toggle Sidebar'
    },
    clipboard: {
      copy: 'Copy',
      copied: 'Copied'
    },
    select: {
      placeholder: 'Please select'
    }
  }
} as const;

export default en;
