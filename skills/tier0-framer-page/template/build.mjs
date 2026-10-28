// Builds the Framer code component and a local preview page from ./src.
//   node build.mjs   ->  out/Tier0SecurityAdvisories.tsx + out/preview.html
// Never edit the generated .tsx by hand: change ./src and rebuild (the CSS is embedded as an escaped string).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const read = name => readFileSync(join(here, 'src', name), 'utf8');
const out = join(here, 'out');
mkdirSync(out, { recursive: true });

// Every family here must exist on Google Fonts: one unknown family (e.g. "IBM Plex Sans SC") makes the whole css2 request fail.
const FONT_URL = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap';
const css = read('widget.css').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n\s*/g, '').trim();
const coreJs = [read('data.js'), read('messages.js'), read('widget.js')].join('\n');

const component = `// @ts-nocheck
/*
 * Tier0 Security Advisories — Framer code component.
 * Use it as a Code Component (Assets → Code → "+" → New code file, paste this file, drag it onto the page),
 * not inside an Embed. Set width to Fill and height to Fit Content.
 * Language follows the site locale (Framer localization / <html lang>) unless the Language control is set.
 */
import { useEffect, useMemo, useRef, useState } from "react"
import * as Framer from "framer"

const { addPropertyControls, ControlType, RenderTarget } = Framer

${coreJs}

const T0SA_FONT_URL = ${JSON.stringify(FONT_URL)}
const T0SA_CSS = ${JSON.stringify(css)}
const T0SA_LOCALES = ["zh-CN", "en"]

function normalizeLocale(code) {
    const value = String(code || "").toLowerCase()
    if (value.startsWith("zh")) return "zh-CN"
    if (value.startsWith("en")) return "en"
    return ""
}

// Framer's localization hook, guarded so the component still renders on sites or versions without it.
function useFramerLocale() {
    const info = typeof Framer.useLocaleInfo === "function" ? Framer.useLocaleInfo() : null
    const active = info && info.activeLocale
    return normalizeLocale(active && (active.code || active.slug))
}

function detectPageLocale() {
    if (typeof window === "undefined") return ""
    return (
        normalizeLocale(new URL(window.location.href).searchParams.get("lang")) ||
        normalizeLocale(document.documentElement.lang) ||
        normalizeLocale(navigator.language)
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1200
 */
export default function Tier0SecurityAdvisories(props) {
    const {
        language = "auto",
        reportEmail = "productsupport@freezonex.io",
        pageSize = 10,
        shareUrl = "",
        scrollOffset = 88,
        gutter = 24,
        maxWidth = 1200,
        style,
    } = props
    const ref = useRef(null)
    const framerLocale = useFramerLocale()
    const [pageLocale, setPageLocale] = useState("")

    // Follow <html lang> as well, so switching the site language re-renders the component.
    useEffect(() => {
        const update = () => setPageLocale(detectPageLocale())
        update()
        const observer = new MutationObserver(update)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] })
        return () => observer.disconnect()
    }, [])

    const locale = T0SA_LOCALES.includes(language) ? language : framerLocale || pageLocale || "en"
    const options = useMemo(
        () => ({
            data: { "zh-CN": T0SA_ZH, en: T0SA_EN },
            messages: T0SA_MESSAGES,
            locale,
            pageSize,
            reportEmail,
            shareUrl: shareUrl || undefined,
        }),
        [locale, pageSize, reportEmail, shareUrl]
    )
    // Static markup lets Framer pre-render real content (SEO, no empty first paint).
    const initialHtml = useMemo(() => createAdvisories(options).html(), [options])

    useEffect(() => {
        const isCanvas = RenderTarget.current() === RenderTarget.canvas
        return mountAdvisories(ref.current, { ...options, enableShortcut: !isCanvas, syncHash: !isCanvas })
    }, [options])

    return (
        <div style={{ width: "100%", ...style }}>
            <link rel="stylesheet" href={T0SA_FONT_URL} />
            <style dangerouslySetInnerHTML={{ __html: T0SA_CSS }} />
            <div
                ref={ref}
                className="t0sa"
                lang={locale}
                style={{
                    "--t0-scroll-offset": \`\${scrollOffset}px\`,
                    "--t0-gutter": \`\${gutter}px\`,
                    "--t0-max": \`\${maxWidth}px\`,
                }}
                dangerouslySetInnerHTML={{ __html: initialHtml }}
                suppressHydrationWarning
            />
        </div>
    )
}

addPropertyControls(Tier0SecurityAdvisories, {
    language: {
        type: ControlType.Enum,
        title: "Language",
        options: ["auto", "en", "zh-CN"],
        optionTitles: ["Auto (site locale)", "English", "中文"],
        defaultValue: "auto",
    },
    reportEmail: { type: ControlType.String, title: "Report email", defaultValue: "productsupport@freezonex.io" },
    pageSize: { type: ControlType.Number, title: "Page size", min: 5, max: 50, step: 1, displayStepper: true, defaultValue: 10 },
    shareUrl: { type: ControlType.String, title: "Share URL", placeholder: "Defaults to current page", defaultValue: "" },
    scrollOffset: { type: ControlType.Number, title: "Nav offset", min: 0, max: 200, unit: "px", defaultValue: 88 },
    gutter: { type: ControlType.Number, title: "Side padding", min: 0, max: 80, unit: "px", defaultValue: 24 },
    maxWidth: { type: ControlType.Number, title: "Max width", min: 640, max: 1600, step: 10, unit: "px", defaultValue: 1200 },
})
`;
writeFileSync(join(out, 'Tier0SecurityAdvisories.tsx'), component);

// Local preview: a fake site nav + the widget; language comes from ?lang like a localized site would set <html lang>.
const preview = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tier0 Security Advisories — preview</title>
<link rel="stylesheet" href="${FONT_URL}">
<style>body{margin:0;background:#fff}.host-nav{position:sticky;top:0;z-index:5;height:64px;display:flex;align-items:center;padding:0 24px;border-bottom:1px solid #ebebeb;background:rgba(255,255,255,.9);font:500 14px 'IBM Plex Sans',sans-serif}
${css}</style>
</head>
<body>
<div class="host-nav">Site navigation (Framer)</div>
<div class="t0sa" id="t0sa" style="--t0-scroll-offset:72px"></div>
<script>
${coreJs}
(() => {
  const lang = new URL(location.href).searchParams.get('lang') || 'en';
  const locale = lang.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en';
  document.documentElement.lang = locale;
  mountAdvisories(document.getElementById('t0sa'), { data: { 'zh-CN': T0SA_ZH, en: T0SA_EN }, messages: T0SA_MESSAGES, locale });
})();
</script>
</body>
</html>
`;
writeFileSync(join(out, 'preview.html'), preview);
console.log('built', readFileSync(join(out, 'Tier0SecurityAdvisories.tsx')).length, 'B tsx');
