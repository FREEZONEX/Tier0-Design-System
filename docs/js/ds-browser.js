/* Shared left-nav / right-panel switcher for design system browser */
(function () {
  function init(root) {
    const buttons = [...root.querySelectorAll('.ds-nav button[data-cat]')];
    const panels = [...root.querySelectorAll('[data-panel]')];
    if (!buttons.length || !panels.length) return;

    const designUrl = root.dataset.designMd || './DESIGN.md';
    const skillUrl = root.dataset.skillMd || '../slide-skill/SKILL.md';
    const syncUrl = root.dataset.syncUrl !== '0';

    async function loadMd(el, url) {
      if (!el || el.dataset.loaded === '1') return;
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(String(res.status));
        let md = await res.text();
        // Strip YAML frontmatter so --- does not render as <hr>
        md = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '');
        // Drop standalone thematic breaks between foundation sections
        md = md.replace(/^\s*---\s*$/gm, '');
        el.innerHTML = window.marked
          ? marked.parse(md)
          : '<pre>' + md.replace(/</g, '&lt;') + '</pre>';
        el.dataset.loaded = '1';
      } catch (e) {
        el.innerHTML =
          '<p>无法加载文档。请运行 <code>node scripts/build-public-site.mjs</code>。</p>';
      }
    }

    function show(cat) {
      buttons.forEach((b) => b.classList.toggle('is-active', b.dataset.cat === cat));
      panels.forEach((p) => {
        p.hidden = p.dataset.panel !== cat;
      });
      if (syncUrl) {
        const url = new URL(location.href);
        url.searchParams.set('cat', cat);
        if (location.hash) url.hash = '';
        history.replaceState(null, '', url.pathname + url.search + (location.hash || ''));
      }
      if (cat === 'design') {
        const el =
          root.querySelector('#design-md-body') ||
          root.querySelector('#home-design-md') ||
          root.querySelector('[data-panel="design"] .md-body');
        loadMd(el, designUrl);
      }
      if (cat === 'skill') {
        const el =
          root.querySelector('#skill-md-body') ||
          root.querySelector('#home-skill-md') ||
          root.querySelector('[data-panel="skill"] .md-body');
        loadMd(el, skillUrl);
      }
    }

    buttons.forEach((b) => b.addEventListener('click', () => show(b.dataset.cat)));
    const initial = new URLSearchParams(location.search).get('cat') || buttons[0].dataset.cat;
    const valid = buttons.some((b) => b.dataset.cat === initial) ? initial : buttons[0].dataset.cat;
    show(valid);
  }

  document.querySelectorAll('[data-ds-browser]').forEach(init);
})();
