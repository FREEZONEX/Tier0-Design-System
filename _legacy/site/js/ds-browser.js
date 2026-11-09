/* Shared left-nav / right-panel switcher for design system browser */
(function () {
  function init(root) {
    const buttons = [...root.querySelectorAll('.ds-nav button[data-cat]')];
    const panels = [...root.querySelectorAll('[data-panel]')];
    if (!buttons.length || !panels.length) return;

    const designUrl = root.dataset.designMd || './DESIGN.txt';
    const skillUrl = root.dataset.skillMd || '../slide-skill/SKILL.txt';
    const syncUrl = root.dataset.syncUrl !== '0';

    async function fetchText(url) {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(String(res.status));
      return res.text();
    }

    async function loadMd(el, url, linkBase) {
      if (!el || el.dataset.loaded === '1') return;
      const candidates = [url];
      // Fallbacks: .txt survives Jekyll; bare .md may 404 when frontmatter is rewritten
      if (/\.md$/i.test(url)) candidates.push(url.replace(/\.md$/i, '.txt'));
      if (/\.txt$/i.test(url)) candidates.push(url.replace(/\.txt$/i, '.md'));
      try {
        let md = null;
        let lastErr = null;
        for (const candidate of candidates) {
          try {
            md = await fetchText(candidate);
            break;
          } catch (err) {
            lastErr = err;
          }
        }
        if (md == null) throw lastErr || new Error('fetch failed');
        // Strip YAML frontmatter so --- does not render as <hr>
        md = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '');
        // Drop standalone thematic breaks between foundation sections
        md = md.replace(/^\s*---\s*$/gm, '');
        el.innerHTML = window.marked
          ? marked.parse(md)
          : '<pre>' + md.replace(/</g, '&lt;') + '</pre>';
        // 快照保留仓库相对路径；展示时将文档链接指回真实源码。
        if (linkBase) {
          el.querySelectorAll('a[href]').forEach((link) => {
            const href = link.getAttribute('href');
            if (href && !/^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(href)) {
              link.href = new URL(href, linkBase).href;
            }
          });
        }
        el.dataset.loaded = '1';
      } catch (e) {
        el.innerHTML =
          '<p>无法加载文档（' +
          String(e && e.message ? e.message : e) +
          '）。请硬刷新，或本地运行 <code>node scripts/build-public-site.mjs</code>。</p>';
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
        loadMd(el, skillUrl, root.dataset.skillBase);
      }
    }

    buttons.forEach((b) => b.addEventListener('click', () => show(b.dataset.cat)));
    const initial = new URLSearchParams(location.search).get('cat') || buttons[0].dataset.cat;
    const valid = buttons.some((b) => b.dataset.cat === initial) ? initial : buttons[0].dataset.cat;
    show(valid);
  }

  document.querySelectorAll('[data-ds-browser]').forEach(init);
})();
