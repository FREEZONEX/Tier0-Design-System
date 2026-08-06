# Tier0 Design System — Public showcase

GitHub Pages 产品展示站（`site/`）。

- 气质：白底黑字快速上手；Hero ASCII；三场景入口 + 两列 Design System 画廊
- Tokens 门户：场景预览、完整 token 表、合成 DESIGN.md（与 `foundations/` 同步）
- Local preview: `python3 -m http.server 8898 --directory site` → http://127.0.0.1:8898/
- Rebuild vendor / demos / DESIGN.md: `node scripts/build-public-site.mjs`
- Production: https://freezonex.github.io/Tier0-Design-System/site/

| Path | Role |
|------|------|
| `/` | Hero + entries + system gallery |
| `/tokens/` | Design system portal (tokens + DESIGN.md) |
| `/vendor/foundations/` | Synced foundations markdown |
| `/slide-skill/` | Skill hub |
| `/slide-skill/demo-zh/` | Chinese polished deck |
| `/slide-skill/demo-en/` | English dual-output example |

Do not hand-edit `vendor/`, `slide-skill/demo/`, `demo-en/`, `demo-zh/`, or `tokens/DESIGN.md` — they are generated / synced by the build script.
