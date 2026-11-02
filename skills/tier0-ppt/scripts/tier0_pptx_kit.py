"""Tier0 PPTX kit (v3) — restyle existing .pptx decks with python-pptx.

Distilled from the Tier0 Case Studies v3 rebuild (2026-11). Import it from a per-deck
build script; keep slide copy in that script, not here.

    import sys; sys.path.insert(0, "<repo>/skills/tier0-ppt/scripts")
    from tier0_pptx_kit import *
    P = Presentation("src.pptx")
    s, pairs, logo = prep(P.slides[3])
    panel(s, pairs); place_logo(logo)
    overview(s, "One-sentence summary of the project.")
    label(s, X0, Y_LABEL2, "HOW IT WORKS")
    flow(s, Y_SEC, Y_SEC_END - Y_SEC, [("01", "Integrate", "…"), ("02", "Calculate", "…"), ("03", "Monitor", "…")])
    value_row(s, "What the customer gained.")
    deck_cleanup(P)
    P.save("out.pptx")

Grid (inches, 16:9 = 13.333 x 7.5) — see ../references/pptx-restyle.md
"""
import io
from pptx import Presentation  # noqa: F401  (re-exported for build scripts)
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE, MSO_SHAPE_TYPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

# ---------------------------------------------------------------- tokens (v3)
INK = "050B14"      # all text on light slides
MUTED = "71717A"    # eyebrow ("CASE STUDY"), KPI category, page number, legend
GREEN = "CBF368"    # Tier0 green: label mark ■, badges, VALUE tag, Tier0 node — fill only, never text on white
SURF = "FAFAFA"     # every card / panel / chip-row background
BORDER = "E4E4E7"   # 0.75pt hairline on cards, panel, screenshots, dividers
WHITE = "FFFFFF"
SANS, MED, MONO = "IBM Plex Sans", "IBM Plex Sans Medium", "IBM Plex Mono"
R4 = 4 / 96         # 4px radius in inches — only radius allowed

# ---------------------------------------------------------------- grid
XL, XR = 0.5, 12.83                 # 0.5" side margins
X0, W0 = 0.5, 6.6                   # left (text) column
RX, RW = 7.5, 5.33                  # right (deliverables) column, gutter 0.4
Y_LABEL, Y_LEAD = 1.75, 2.05        # section label row (both columns) / content start
Y_LABEL2, Y_SEC, Y_SEC_END = 3.0, 3.3, 5.45
Y_VALUE, H_VALUE = 5.75, 0.5
Y_BOTTOM = 6.8                      # bottom margin: panel bottom = logo bottom
LOGO_H = 0.4

# map legacy deck colours → v3
REMAP = {"73B200": INK, "585C62": INK, "B2ED1D": GREEN, "F3F3F3": SURF, "F4F4F4": SURF}

EMU = 914400
inch = lambda v: v / EMU  # noqa: E731
rgb = RGBColor.from_string


# ---------------------------------------------------------------- primitives
def text(slide, x, y, w, h, paras, size=12, color=INK, font=SANS, align=PP_ALIGN.LEFT,
         anchor=MSO_ANCHOR.TOP, spc=None, line=None, name=None):
    """paras: str | [para]; para: str | [(text, {size,color,font,spc})]. Zero insets, no word splitting."""
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    if name: tb.name = name
    tf = tb.text_frame; tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = anchor
    for i, para in enumerate(paras if isinstance(paras, list) else [paras]):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p._p.get_or_add_pPr().set("latinLnBrk", "0")   # never break inside a latin word
        if line: p.line_spacing = line
        for t, o in (para if isinstance(para, list) else [(para, {})]):
            r = p.add_run(); r.text = t
            f = r.font; f.size = Pt(o.get("size", size)); f.name = o.get("font", font)
            f.color.rgb = rgb(o.get("color", color))
            rPr = r._r.get_or_add_rPr(); rPr.set("lang", "en-US")
            s = o.get("spc", spc)
            if s: rPr.set("spc", str(s))
    return tb


def rect(slide, x, y, w, h, fill, line=None, radius=0, name=None):
    shp = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE,
                                 Inches(x), Inches(y), Inches(w), Inches(h))
    if name: shp.name = name
    shp.fill.solid(); shp.fill.fore_color.rgb = rgb(fill)
    if line: shp.line.color.rgb = rgb(line); shp.line.width = Pt(0.75)
    else: shp.line.fill.background()
    shp.shadow.inherit = False
    if radius: shp.adjustments[0] = radius / min(w, h)
    return shp


def hline(slide, x, y, w):
    c = slide.shapes.add_connector(1, Inches(x), Inches(y), Inches(x + w), Inches(y))
    c.line.color.rgb = rgb(BORDER); c.line.width = Pt(0.75); c.name = "Divider"
    return c


# ---------------------------------------------------------------- components
def card(slide, x, y, w, h, name="Card"):
    """shadcn card: FAFAFA + hairline + 4px. No coloured top stripe."""
    return rect(slide, x, y, w, h, SURF, line=BORDER, radius=R4, name=name)


def label(slide, x, y, t, w=4.0):
    """Section label: green ■ + IBM Plex Mono caps, ink."""
    rect(slide, x, y + 0.055, 0.09, 0.09, GREEN, name="Label mark")
    return text(slide, x + 0.19, y, w, 0.2, t, size=9.5, font=MONO, spc=120, name="Label " + t)


def badge(slide, x, y, t, size=0.28):
    rect(slide, x, y, size, size, GREEN, name="Badge " + t)
    text(slide, x, y, size, size, t, size=9, font=MONO, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)


def lead(slide, t, y=Y_LEAD):
    """One-sentence overview, 15pt, ≤2 lines (3 max on KPI pages)."""
    return text(slide, X0, y, W0, 0.8, t, size=15, line=1.12, name="Lead")


def overview(slide, t, lbl="OVERVIEW"):
    label(slide, X0, Y_LABEL, lbl); lead(slide, t)


def value_row(slide, t, tag="VALUE", y=Y_VALUE):
    card(slide, X0, y, W0, H_VALUE, name="Value row")
    bw = 0.7
    rect(slide, X0 + 0.11, y + 0.11, bw, H_VALUE - 0.22, GREEN, name="Value tag")
    text(slide, X0 + 0.11, y + 0.11, bw, H_VALUE - 0.22, tag, size=8.5, font=MONO, spc=100,
         align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    text(slide, X0 + bw + 0.3, y, W0 - bw - 0.5, H_VALUE, t, size=11.5, anchor=MSO_ANCHOR.MIDDLE,
         line=1.05, name="Value text")


def flow(slide, y, h, items):
    """3 horizontal step cards with chevrons. items: [(num, title, desc)]; desc ≤ ~45 chars."""
    n = len(items); gap = 0.3; w = (W0 - gap * (n - 1)) / n
    for i, (num, t, d) in enumerate(items):
        x = X0 + i * (w + gap)
        card(slide, x, y, w, h, f"Step {num}")
        badge(slide, x + 0.2, y + 0.2, num)
        text(slide, x + 0.2, y + 0.6, w - 0.4, 0.25, t, size=13, font=MED)
        text(slide, x + 0.2, y + 0.88, w - 0.4, h - 1.05, d, size=11, line=1.05)
        if i < n - 1:
            c = slide.shapes.add_shape(MSO_SHAPE.CHEVRON, Inches(x + w + 0.1), Inches(y + h / 2 - 0.07),
                                       Inches(0.1), Inches(0.14))
            c.fill.solid(); c.fill.fore_color.rgb = rgb(INK); c.line.fill.background(); c.name = "Arrow"


def grid(slide, y, y_end, items, desc_size=11):
    """2×2 capability cards. Card height ≥ 0.85" so a 2-line desc keeps ≥0.18" bottom padding."""
    gap = 0.2; w = (W0 - gap) / 2; h = (y_end - y - gap) / 2
    for i, (num, t, d) in enumerate(items):
        r, c = divmod(i, 2)
        x = X0 + c * (w + gap); yy = y + r * (h + gap)
        card(slide, x, yy, w, h, f"Card {num}")
        badge(slide, x + 0.2, yy + 0.18, num)
        text(slide, x + 0.62, yy + 0.17, w - 0.82, 0.3, t, size=12.5, font=MED, anchor=MSO_ANCHOR.MIDDLE)
        text(slide, x + 0.62, yy + 0.5, w - 0.82, h - 0.68, d, size=desc_size, line=1.05)


def rows(slide, y, items, row_h=0.4):
    """List rows: badge · bold title · short note, hairline dividers (no cards)."""
    for i, (num, t, d) in enumerate(items):
        yy = y + i * row_h
        badge(slide, X0, yy + (row_h - 0.28) / 2, num)
        segs = [(t, {"font": MED, "size": 12})] + ([("   " + d, {"size": 11})] if d else [])
        text(slide, X0 + 0.45, yy, W0 - 0.45, row_h, [segs], anchor=MSO_ANCHOR.MIDDLE)
        if i < len(items) - 1: hline(slide, X0 + 0.45, yy + row_h, W0 - 0.45)


def chips(slide, x, y, items, arrows=False, h=0.34):
    gap = 0.3 if arrows else 0.1
    for i, t in enumerate(items):
        w = 0.28 + 0.075 * len(t)
        rect(slide, x, y, w, h, WHITE, line=BORDER, radius=R4, name="Chip")
        text(slide, x, y, w, h, t, size=11, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        x += w
        if arrows and i < len(items) - 1:
            text(slide, x, y, gap, h, "→", size=12, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        x += gap
    return x


def kpis(slide, y, h, items, compact=False):
    """Stat cards. items: (CATEGORY, value, UNIT[, sub]). compact=True → h≈1.15, value under category.
    Values ≤6 chars at 22pt fit a 4-up row in the 6.6" column."""
    n = len(items); gap = 0.2; w = (W0 - gap * (n - 1)) / n
    for i, it in enumerate(items):
        cat, big, unit = it[:3]; sub = it[3] if len(it) > 3 else None
        x = X0 + i * (w + gap)
        card(slide, x, y, w, h, "KPI")
        text(slide, x + 0.2, y + 0.18, w - 0.3, 0.2, cat, size=9, font=MONO, spc=100, color=MUTED)
        if compact:
            text(slide, x + 0.2, y + 0.42, w - 0.22, 0.4, big, size=22, font=MED)
            text(slide, x + 0.2, y + 0.84, w - 0.3, 0.2, unit, size=9, font=MONO, spc=60)
        else:  # tall: category top, value + unit + sub anchored to bottom
            text(slide, x + 0.2, y + h - 1.15, w - 0.22, 0.45, big, size=22, font=MED)
            text(slide, x + 0.2, y + h - 0.62, w - 0.3, 0.2, unit, size=9, font=MONO, spc=60)
            if sub: text(slide, x + 0.2, y + h - 0.38, w - 0.3, 0.22, sub, size=11)


def stat_strip(slide, y, items):
    """Inline secondary stats separated by hairlines (no cards). items: [(value, UNIT)]."""
    n = len(items); w = W0 / n
    for i, (big, unit) in enumerate(items):
        x = X0 + i * w
        if i: rect(slide, x, y + 0.05, 0.01, 0.5, BORDER, name="Sep")
        pad = 0 if i == 0 else 0.2
        text(slide, x + pad, y, w - pad, 0.32, big, size=17, font=MED)
        text(slide, x + pad, y + 0.36, w - pad, 0.2, unit, size=8.5, font=MONO, spc=60, color=MUTED)


def loop_nodes(slide, y, labels, center=1, nw=1.5, nh=0.62):
    """Closed-loop A ⇄ B ⇄ C. labels: [(title, SUB)]; node[center] is green (Tier0)."""
    xs = [X0, X0 + (W0 - nw) / 2, X0 + W0 - nw]
    for i, (x, (t, sub)) in enumerate(zip(xs, labels)):
        g = i == center
        rect(slide, x, y, nw, nh, GREEN if g else SURF, line=None if g else BORDER, radius=R4, name="Node " + t)
        text(slide, x, y + 0.1, nw, 0.25, t, size=13, font=MED, align=PP_ALIGN.CENTER)
        text(slide, x, y + 0.38, nw, 0.18, sub, size=8.5, font=MONO, spc=80, align=PP_ALIGN.CENTER)
    for i in range(2):
        a0, a1 = xs[i] + nw + 0.15, xs[i + 1] - 0.15
        for shp, yy in ((MSO_SHAPE.RIGHT_ARROW, y + 0.17), (MSO_SHAPE.LEFT_ARROW, y + nh - 0.29)):
            ar = slide.shapes.add_shape(shp, Inches(a0), Inches(yy), Inches(a1 - a0), Inches(0.12))
            ar.fill.solid(); ar.fill.fore_color.rgb = rgb(INK); ar.line.fill.background()


# ---------------------------------------------------------------- slide plumbing
def is_logo(sh):
    """Client logo = picture in the left third of the slide."""
    return sh.shape_type == MSO_SHAPE_TYPE.PICTURE and inch(sh.left) < 4


def prep(slide, fallback_slide=None):
    """Strip a content slide to title + slide number + pictures.
    Returns (slide, [(screenshot, caption|None)], client_logo|None).
    Captions = text boxes in the right column, paired to the picture right above them.
    fallback_slide: same slide in another deck version, used to borrow a missing client logo."""
    pics, caps, logo = [], [], None
    for sh in list(slide.shapes):
        if sh.is_placeholder:
            pt = str(sh.placeholder_format.type)
            if "TITLE" in pt or "SLIDE_NUMBER" in pt: continue
        if sh.shape_type == MSO_SHAPE_TYPE.PICTURE:
            (logo := sh) if is_logo(sh) else pics.append(sh)
            continue
        txt = sh.text_frame.text.strip() if sh.has_text_frame else ""
        if txt and inch(sh.left) > 6.5 and txt.upper() != "DELIVERABLES":
            caps.append((txt, inch(sh.left) + inch(sh.width) / 2, inch(sh.top)))
        sh._element.getparent().remove(sh._element)
    if logo is None and fallback_slide is not None:
        for sh in fallback_slide.shapes:
            if is_logo(sh):
                logo = slide.shapes.add_picture(io.BytesIO(sh.image.blob), sh.left, sh.top, sh.width, sh.height)
                logo.name = "Client logo"; break
    pairs = []
    for p in pics:
        cx = inch(p.left) + inch(p.width) / 2; bottom = inch(p.top) + inch(p.height)
        cand = [c for c in caps if abs(c[1] - cx) < 1.0 and -0.2 < c[2] - bottom < 0.5]
        pairs.append((p, min(cand, key=lambda c: c[2])[0] if cand else None))
    return slide, pairs, logo


def set_title(slide, t):
    """Replace the title line (last paragraph) — keeps the eyebrow paragraph."""
    for sh in slide.shapes:
        if sh.is_placeholder and "TITLE" in str(sh.placeholder_format.type):
            runs = sh.text_frame.paragraphs[-1].runs
            runs[0].text = t
            for r in runs[1:]: r.text = ""


def autocrop(pic):
    """Crop white / transparent padding off a logo so visual sizes match. Returns aspect ratio."""
    from PIL import Image
    im = Image.open(io.BytesIO(pic.image.blob)).convert("RGBA")
    flat = Image.alpha_composite(Image.new("RGBA", im.size, (255, 255, 255, 255)), im).convert("L")
    bbox = flat.point(lambda v: 255 if v < 235 else 0).getbbox()
    if not bbox: return pic.width / pic.height
    W, H = im.size
    pic.crop_left, pic.crop_top = bbox[0] / W, bbox[1] / H
    pic.crop_right, pic.crop_bottom = 1 - bbox[2] / W, 1 - bbox[3] / H
    return (bbox[2] - bbox[0]) / (bbox[3] - bbox[1])


def place_logo(logo, h=LOGO_H, max_w=2.0):
    """Client logo bottom-left, bottom edge on Y_BOTTOM."""
    if logo is None: return
    r = autocrop(logo); w = h * r
    if w > max_w: w = max_w; h = w / r
    logo.left, logo.top = Inches(X0), Inches(Y_BOTTOM - h)
    logo.width, logo.height = Inches(w), Inches(h)


def panel(slide, pairs, cols=1, y=Y_LEAD):
    """Right column: DELIVERABLES label + FAFAFA panel, screenshots fitted into an even grid with captions."""
    label(slide, RX, Y_LABEL, "DELIVERABLES")
    ph = Y_BOTTOM - y
    p = card(slide, RX, y, RW, ph, name="Deliverables panel")
    tree = slide.shapes._spTree; tree.remove(p._element); tree.insert(2, p._element)  # send to back
    pad, gap = 0.25, 0.2
    cap_h = 0.32 if any(c for _, c in pairs) else 0
    ix, iy, iw, ih = RX + pad, y + pad, RW - 2 * pad, ph - 2 * pad
    pairs = sorted(pairs, key=lambda pc: (round(inch(pc[0].top) * 2) / 2, inch(pc[0].left)))
    nrows = (len(pairs) + cols - 1) // cols
    cw = (iw - gap * (cols - 1)) / cols; ch = (ih - gap * (nrows - 1)) / nrows
    for i, (sh, cap) in enumerate(pairs):
        r, c = divmod(i, cols)
        ratio = sh.width / sh.height; ah = ch - cap_h
        w = cw; h = w / ratio
        if h > ah: h = ah; w = h * ratio
        cx = ix + c * (cw + gap); cy = iy + r * (ch + gap)
        sh.left, sh.top = Inches(cx + (cw - w) / 2), Inches(cy + (ah - h) / 2)
        sh.width, sh.height = Inches(w), Inches(h)
        sh.line.color.rgb = rgb(BORDER); sh.line.width = Pt(0.75)
        if cap:
            text(slide, cx, cy + ah + 0.08, cw, 0.2, cap, size=9.5, align=PP_ALIGN.CENTER, name="Caption")


# ---------------------------------------------------------------- deck-wide
def remap_colors(el):
    ns = "{http://schemas.openxmlformats.org/drawingml/2006/main}srgbClr"
    for c in el.iter(ns):
        v = c.get("val", "").upper()
        if v in REMAP: c.set("val", REMAP[v])


def deck_cleanup(P, light_slides=None, logo_w=1.3, legacy_logo_x=11.18):
    """Remove footers, remap colours, mute eyebrows, right-align page numbers on the margin,
    shrink + re-anchor the Tier0 logo on masters AND layouts (both carry a copy)."""
    for i, s in enumerate(P.slides):
        for sh in list(s.shapes):
            if sh.is_placeholder and "FOOTER" in str(sh.placeholder_format.type):
                sh._element.getparent().remove(sh._element)
        remap_colors(s._element)
        for sh in s.shapes:
            pt = str(sh.placeholder_format.type) if sh.is_placeholder else ""
            if "SLIDE_NUMBER" in pt:
                sh.left, sh.top, sh.width, sh.height = Inches(XR - 2.0), Inches(6.98), Inches(2.0), Inches(0.22)
                tf = sh.text_frame; tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
                for p in tf.paragraphs:
                    p.alignment = PP_ALIGN.RIGHT
                    for r in p.runs: r.font.color.rgb = rgb(MUTED); r.font.size = Pt(9); r.font.name = MONO
            if "TITLE" in pt and (light_slides is None or i in light_slides):
                ps = sh.text_frame.paragraphs
                if len(ps) > 1:
                    for r in ps[0].runs: r.font.color.rgb = rgb(MUTED)
                sh.width = Inches(10.2)
    for part in list(P.slide_layouts) + list(P.slide_masters):
        for sh in part.shapes:
            if sh.shape_type == MSO_SHAPE_TYPE.PICTURE and abs(inch(sh.left) - legacy_logo_x) < 0.05:
                r = sh.width / sh.height
                sh.width, sh.height = Inches(logo_w), Inches(logo_w / r)
                sh.left, sh.top = Inches(XR - logo_w), Inches(0.55)
        remap_colors(part._element)


def use_case_grid(slide, cases, cols=3, y_top=1.75):
    """Overview page: grid of cards (badge · title · subtitle · two overlapped screenshots).
    cases: [(title, subtitle, (blob, ratio, crop), (blob, ratio, crop))]."""
    gap = 0.3; n_rows = (len(cases) + cols - 1) // cols
    cw = (XR - XL - gap * (cols - 1)) / cols; chh = (Y_BOTTOM - y_top - gap * (n_rows - 1)) / n_rows
    for i, (t, sub, back, front) in enumerate(cases):
        r, c = divmod(i, cols)
        x = XL + c * (cw + gap); y = y_top + r * (chh + gap)
        card(slide, x, y, cw, chh, f"Use case {i + 1}")
        badge(slide, x + 0.2, y + 0.2, f"{i + 1:02d}")
        text(slide, x + 0.6, y + 0.17, cw - 0.8, 0.32, t, size=13.5, font=MED, anchor=MSO_ANCHOR.MIDDLE)
        text(slide, x + 0.6, y + 0.5, cw - 0.8, 0.4, sub, size=10.5, line=1.05)
        ax, ay, aw, ah = x + 0.2, y + 0.98, cw - 0.4, chh - 1.18
        for k, (blob, ratio, crop) in enumerate((back, front)):
            w = aw * (0.66 if k == 0 else 0.72); h = w / ratio
            lim = ah * (0.72 if k == 0 else 0.78)
            if h > lim: h = lim; w = h * ratio
            px, py = (ax, ay) if k == 0 else (ax + aw - w, ay + ah - h)
            pic = slide.shapes.add_picture(io.BytesIO(blob), Inches(px), Inches(py), Inches(w), Inches(h))
            pic.crop_left, pic.crop_right, pic.crop_top, pic.crop_bottom = crop
            pic.line.color.rgb = rgb(BORDER if k == 0 else WHITE); pic.line.width = Pt(0.75 if k == 0 else 1.5)


def pic_spec(pic):
    """(blob, aspect, crop) — lets you delete a picture and re-add it elsewhere."""
    return pic.image.blob, pic.width / pic.height, (pic.crop_left, pic.crop_right, pic.crop_top, pic.crop_bottom)
