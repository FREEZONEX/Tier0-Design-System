# Oxide source notes (craft reference only)

Observed from [oxide.computer](https://oxide.computer/) and [hybrid-cloud](https://oxide.computer/solutions/hybrid-cloud).  
**Do not copy Oxide logos, product names, or trademarked marks.** Extract craft grammar only; remint into Tier0 tokens.

## Signature elements

| Element | Oxide pattern | Tier0 remint |
|---------|---------------|--------------|
| Glyph field | Mono rows of `.` / `:` / spaced `. . :::: . .` | IBM Plex Mono · `#73777D` on dark / `#A5A5A5` |
| Letter-spacing | ~`0.3em` on divider glyphs | Same |
| UI chrome cards | Dark panel `~#181A1D`, radius ~2px, hairline `#2D3335` | `#0E1824` / `#111822` · border `#2B2D2F` |
| Accent | oklch green ~163° | `#B2ED1D` signal · `#73B200` readable |
| Fig label | `Fig. 1` + short caption, mono | Same pattern, Plex Mono 10–12px |
| Diagram strokes | ~0.87px technical strokes, isometric blocks | 1px hairlines · no heavy fill |
| Chart | Dual green strokes + soft gradient under curve; small inset “window” card | Tier0 greens · optional inset card |
| Text in complex SVG | Often outlined paths (not live fonts) | Prefer live `IBM Plex Mono` text for editability; path-outline only for logo-like marks |
| Icons | Tiny geometric 12–16px, square/blocky | Same scale · Carbon-like geometric, not emoji |

## Anti-patterns (Oxide-like but wrong for Tier0)

- Cream/parchment paper backgrounds as default for Tier0 marketing  
- Oxide yellow-green brand marks or “0xide” wordmark  
- Heavy 3D skeuomorphism or neon glow stacks  
- Mixing multiple accent hues in one illustration

## Spot size (critical)

Oxide solution-card art is ~300×250 **inside** the card — not a full marketing page.
Match that scale and density: one visual idea, almost no copy.
