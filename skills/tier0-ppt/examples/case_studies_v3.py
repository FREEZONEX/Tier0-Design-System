"""Example: Tier0 Case Studies v3 (2026-11) — rebuilt with tier0_pptx_kit.

python3 case_studies_v3.py <Tier0_Cases_.pptx> <Tier0_Cases_(Tier0_Style).pptx> out.pptx
Base deck = Tier0 Style version (arg 2); arg 1 only supplies client logos missing there.
"""
import copy, io, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "scripts"))
from tier0_pptx_kit import *  # noqa: F401,F403
from tier0_pptx_kit import Presentation, MSO_SHAPE_TYPE, MSO_ANCHOR, PP_ALIGN, MSO_SHAPE, Inches, Pt

SRC_A, SRC_B, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
A = Presentation(SRC_A)
P = Presentation(SRC_B)

def prep_i(idx):
    return prep(P.slides[idx], A.slides[idx] if idx < len(A.slides) else None)

# ================================================================== slide 3: use cases
s = P.slides[2]
items = []
def collect(shape):
    for c in shape.shapes:
        if c.shape_type == MSO_SHAPE_TYPE.GROUP: collect(c)
        else: items.append(c)
grp = [sh for sh in s.shapes if sh.shape_type == MSO_SHAPE_TYPE.GROUP][0]
collect(grp)
texts = [c.text_frame.text.strip() for c in items if c.has_text_frame]
pics = [c for c in items if c.shape_type == MSO_SHAPE_TYPE.PICTURE]
blobs = [pic_spec(c) for c in pics]
grp._element.getparent().remove(grp._element)
cases = [(texts[2 * i], texts[2 * i + 1], blobs[2 * i], blobs[2 * i + 1]) for i in range(6)]
use_case_grid(s, cases)
for sh in s.shapes:
    if sh.is_placeholder and "TITLE" in str(sh.placeholder_format.type):
        tmpl = [x for x in P.slides[3].shapes if x.is_placeholder and "TITLE" in str(x.placeholder_format.type)][0]
        sh._element.remove(sh._element.txBody)
        sh._element.append(copy.deepcopy(tmpl._element.txBody))
        ps = sh.text_frame.paragraphs
        ps[0].runs[0].text = "USE CASES"; [setattr(r, "text", "") for r in ps[0].runs[1:]]
        ps[-1].runs[0].text = "Examples of Use Cases Enabled by Tier0"; [setattr(r, "text", "") for r in ps[-1].runs[1:]]
        sh.left, sh.top, sh.width, sh.height = tmpl.left, tmpl.top, tmpl.width, tmpl.height

# ================================================================== case studies (visible)
# 4 PTTGC
s, pairs, logo = prep_i(3); panel(s, pairs); place_logo(logo)
overview(s, "A supply chain management and profitability analytics application that unifies PTTGC's SAP and Excel data into one platform.")
label(s, X0, Y_LABEL2, "HOW IT WORKS")
flow(s, Y_SEC, Y_SEC_END - Y_SEC, [
    ("01", "Integrate", "SAP data and multiple Excel spreadsheets in one unified platform"),
    ("02", "Calculate", "Profitability auto-refreshed with source data, with MoM and YoY views"),
    ("03", "Monitor", "Business and management teams track profit and performance trends"),
])
value_row(s, "Less manual consolidation and spreadsheet reconciliation; a timely, consolidated view for operational and commercial decisions.")

# 5 Yishun
s, pairs, logo = prep_i(4); panel(s, pairs); place_logo(logo)
set_title(s, "Autonomous Security Inspection")
overview(s, "An AI-enabled wheeled inspection robot deployed at Yishun Plaza, Singapore, for Certis — reducing reliance on manual security patrols.")
label(s, X0, Y_LABEL2, "HOW IT WORKS")
flow(s, Y_SEC, 1.45, [
    ("01", "Patrol", "Autonomous indoor and outdoor rounds"),
    ("02", "Capture", "Live video and events sent to the platform"),
    ("03", "Detect", "AI flags security and safety incidents"),
])
label(s, X0, Y_SEC_END - 0.25, "AI DETECTS", w=1.2)
chips(s, X0 + 1.35, Y_SEC_END - 0.34, ["Unattended bags", "Smoking", "License plates", "Night loitering"])
value_row(s, "Wider patrol coverage, continuous site visibility, and more efficient, consistent security operations.")

# 6 KMG
s, pairs, logo = prep_i(5); panel(s, pairs); place_logo(logo)
overview(s, "KMG's oilfield operations platform, unifying data from wells, gathering stations, processing facilities and storage tanks.")
label(s, X0, Y_LABEL2, "KEY CAPABILITIES")
grid(s, Y_SEC, Y_SEC_END, [
    ("01", "Field overview", "GIS-based field view and real-time well monitoring"),
    ("02", "Process visualization", "2D / 3D process views of facilities and equipment"),
    ("03", "Inventory & balance", "Tank inventory monitoring and mass balance"),
    ("04", "Production accounting", "Oil, gas and water back allocation"),
])
value_row(s, "Drill down from field-wide KPIs to individual facilities and equipment for daily tracking and reconciliation.")

# 7 Henkel line structuring
s, pairs, logo = prep_i(6); panel(s, pairs); place_logo(logo)
overview(s, "A shared workspace to organize factory assets, define production line structures, and manage changes consistently across Henkel sites.")
label(s, X0, Y_LABEL2, "KEY CAPABILITIES")
grid(s, Y_SEC, Y_SEC_END, [
    ("01", "Structure factory assets", "Equipment in a consistent site and production hierarchy"),
    ("02", "Define line relationships", "Shared resources and upstream / downstream links"),
    ("03", "Control changes", "Drafts, review and approval, version history, audit trail"),
    ("04", "Share via UNS", "Publish approved structures to Tier0's Unified Namespace"),
])
value_row(s, "Consistent asset and line definitions, traceable changes, and reusable structural data across sites.")

# 8 Henkel Danyang
s, pairs, logo = prep_i(7); panel(s, pairs); place_logo(logo)
overview(s, "A Tier0-based application connecting SAP and DCS for bulk and filling process orders — from order dispatch to production feedback.")
label(s, X0, Y_LABEL2, "CLOSED-LOOP DATA FLOW")
text(s, X0 + 3.3, Y_LABEL2, W0 - 3.3, 0.2, "→ ORDERS    ← FEEDBACK", size=9, font=MONO, spc=100,
     color=MUTED, align=PP_ALIGN.RIGHT, name="Legend")
ny, nh = Y_SEC, 0.62
loop_nodes(s, ny, [("SAP", "PLANNING"), ("Tier0", "APP"), ("DCS", "EXECUTION")])
steps = [("01", "Receive orders from SAP", "Orders and related production data"),
         ("02", "Dispatch orders to DCS", "Orders and production info for execution"),
         ("03", "Collect production feedback", "DCS results linked to process orders"),
         ("04", "Report results to SAP", "Production info sent back for reporting")]
gw = (W0 - 0.2) / 2
y0 = ny + nh + 0.3; rh = (Y_SEC_END - y0 - 0.2) / 2
for i, (n, t, d) in enumerate(steps):
    r_, c_ = divmod(i, 2)
    x = X0 + c_ * (gw + 0.2); y = y0 + r_ * (rh + 0.2)
    badge(s, x, y, n)
    text(s, x + 0.42, y - 0.01, gw - 0.42, 0.25, t, size=12.5, font=MED)
    text(s, x + 0.42, y + 0.26, gw - 0.42, 0.22, d, size=10.5)
value_row(s, "Connected planning and shop-floor execution, less manual data transfer, and a complete SAP → DCS → SAP information flow.")

# 9 IMI
s, pairs, logo = prep_i(8); panel(s, pairs, cols=3); place_logo(logo, max_w=2.2)
overview(s, "International Maritime Industries (IMI) is a Saudi-based, fully integrated maritime yard operating over 12 million m² and serving the MENA region with shipbuilding, repair, and offshore rig construction.")
label(s, X0, Y_SEC, "KEY BENEFITS")
kpis(s, Y_SEC + 0.3, Y_VALUE + H_VALUE - Y_SEC - 0.3, [
    ("AGILITY", "4-8", "WEEKS GO-LIVE", "Fast deployment"),
    ("EFFICIENCY", "40-60%", "TCO REDUCTION", "Lower cost"),
    ("EXPERIENCE", "Single", "SCREEN VIEW", "Modern UX"),
    ("FREEDOM", "Open", "INTERFACES", "Highly extensible")])

# 10 Aramco
s, pairs, logo = prep_i(9); panel(s, pairs); place_logo(logo, h=0.45)
overview(s, "A next-generation Building Management System (BMS) for a building on Aramco's Dammam campus, built on the “City Brain” architecture — an open, scalable, future-ready smart building platform.")
label(s, X0, Y_SEC, "KEY BENEFITS")
kpis(s, Y_SEC + 0.3, Y_VALUE + H_VALUE - Y_SEC - 0.3, [
    ("AGILE START", "Low", "ENTRY COST", "Scenario-first"),
    ("SCALABILITY", "Modular", "COMPOSABLE STACK", "Expand as you grow"),
    ("TRUST", "Open", "BY DESIGN", "Secure platform")])

# ================================================================== case studies (hidden 11–17)
# 11 Zhenhai
s, pairs, logo = prep_i(10); panel(s, pairs, cols=2); place_logo(logo, h=0.42)
overview(s, "Intelligent plant program for the Zhenhai refining and chemical base, from IIoT platform to predictive I&C maintenance.")
label(s, X0, Y_LABEL2, "PROJECT SCALE")
kpis(s, Y_SEC, 1.15, [("ETHYLENE", "1.2M", "TONS / YEAR"),
                           ("PHASE 1", "90K+", "DCS IO POINTS"),
                           ("PHASE 2", "120K+", "DCS IO POINTS")], compact=True)
label(s, X0, Y_SEC + 1.45, "SCOPE")
rows(s, Y_SEC + 1.75, [("01", "Industrial Internet Platform", "Intelligent platform foundation"),
                     ("02", "Smart Factory Portal", "Production process data analytics"),
                     ("03", "Predictive I&C maintenance", "From reactive to proactive upkeep")], row_h=0.38)

# 12 Sugar mill
s, pairs, logo = prep_i(11); panel(s, pairs, cols=2)
set_title(s, "Sugar Mill Real-Time Performance Dashboard")
overview(s, "Data scattered across plants, processes and systems limited real-time visibility and delayed reporting — making production, energy and efficiency hard to optimize.", lbl="CHALLENGE")
label(s, X0, Y_SEC, "HIGHLIGHTS")
rows(s, Y_SEC + 0.3, [("01", "Real-time visibility", "across multiple mills"),
                     ("02", "Centralized integration", "data and KPI monitoring"),
                     ("03", "Performance analytics", "production and energy"),
                     ("04", "Predictive insights", "to reduce bottlenecks"),
                     ("05", "Executive-ready", "dashboards and reports")], row_h=0.5)

# 13 Unified Namespace (Conch)
s, pairs, logo = prep_i(12); panel(s, pairs, cols=2); place_logo(logo, h=0.3)
set_title(s, "E2E Visibility via Unified Namespace")
overview(s, "A Unified Namespace on Tier0 as the single source of truth across the enterprise, enabling integrated operation of the entire plant.")
label(s, X0, Y_LABEL2, "HOW IT WORKS")
flow(s, Y_SEC, Y_SEC_END - Y_SEC, [
    ("01", "Connect", "DCS, dynamic equipment and energy systems linked through Tier0"),
    ("02", "Publish", "Real-time data published and subscribed via MQTT"),
    ("03", "Optimize", "Analytical optimization apps using Tier0 AI capabilities"),
])
value_row(s, "ERP, ship information system and DCS integrated for plant-wide operation.")

# 14 Compressor
s, pairs, logo = prep_i(13); panel(s, pairs, cols=2); place_logo(logo, h=0.3)
set_title(s, "Compressor Failure Prediction")
overview(s, "Predictive maintenance for compressor units: 24/7 remote equipment monitoring with warnings and notifications 30 minutes in advance.")
label(s, X0, Y_LABEL2, "PLATFORM SCALE")
kpis(s, Y_SEC, 1.15, [("SYSTEMS", "30+", "CONNECTED"), ("EQUIPMENT", "30K+", "MODELED"),
                     ("APPS", "56", "INDUSTRIAL"), ("WARNING", "30 min", "IN ADVANCE")], compact=True)
label(s, X0, Y_SEC + 1.45, "HOW IT WORKS")
rows(s, Y_SEC + 1.75, [("01", "Feature engineering", "Fourier transform · 10 vibration indicators"),
                     ("02", "Model", "Developed, evaluated and iterated on Tier0"),
                     ("03", "Deploy", "Frontend dashboard via Tier0 X-IDE low-code")], row_h=0.4)

# 15 LNG
s, pairs, logo = prep_i(14); panel(s, pairs, cols=2); place_logo(logo, h=0.45)
overview(s, "A digital and intelligent factory framework covering all LNG stations, built on a centralized, unified factory operation platform.")
label(s, X0, Y_LABEL2, "KEY CAPABILITIES")
grid(s, Y_SEC, Y_SEC_END + 0.5, [
    ("01", "AI tanker dispatch", "Intelligent Tanker Truck Dispatch System (ITTDS)"),
    ("02", "Data exchange", "National Pipeline Network LNG cloud ↔ local regulators"),
    ("03", "Industrial apps", "Built on production and equipment data"),
    ("04", "Security", "One-stop industrial information security"),
])

# 16 Petrochemical
s, pairs, logo = prep_i(15); panel(s, pairs, cols=2); place_logo(logo, h=0.5)
set_title(s, "Refining & Chemical Integration Smart Plant")
overview(s, "Intelligent plant construction for a 20 Mt/yr refined-oil and 2.6 Mt/yr PX complex — China's largest MAC project with independent IP.")
label(s, X0, Y_LABEL2, "RESULTS AFTER UPGRADE")
kpis(s, Y_SEC, 1.15, [("AUTOMATION", ">95%", "RATE"), ("STABILITY", "99%+", "UNIT STABILITY"),
                     ("ALARMS", "-80%", "FREQUENCY"), ("OPERATIONS", "-70%", "FREQUENCY")], compact=True)
label(s, X0, Y_SEC + 1.4, "SCALE")
stat_strip(s, Y_SEC + 1.68, [("177K", "DCS IO POINTS"), ("25", "NETWORK DOMAINS"),
                            ("2,165", "MACHINES"), ("442", "OPERATOR STATIONS")])
value_row(s, "Remote, real-time monitoring and support of the APC system's operational status.")

# 17 Huayi
s, pairs, logo = prep_i(16); panel(s, pairs, cols=1); place_logo(logo, h=0.42)
overview(s, "An integrated smart plant platform that eliminated data silos and turned scheduling meetings into real-time, data-driven reviews.")
label(s, X0, Y_LABEL2, "BUILT ON TIER0")
kpis(s, Y_SEC, 1.15, [("NATIVE", "56", "APPS DEVELOPED"), ("INTEGRATED", "22", "THIRD-PARTY SYSTEMS"),
                     ("PORTAL", "15", "PORTAL APPS")], compact=True)
label(s, X0, Y_SEC + 1.45, "OUTCOMES")
rows(s, Y_SEC + 1.75, [("01", "Digital scheduling meetings", "PPT reports → live dashboards"),
                     ("02", "No more data silos", "Integrated platform + interface tools"),
                     ("03", "Big data platform", "Real-time and heterogeneous data")], row_h=0.4)


# ================================================================== deck-wide cleanup
deck_cleanup(P, light_slides=range(2, 17))
for sh in P.slides[0].shapes:   # cover date
    if sh.has_text_frame:
        for p in sh.text_frame.paragraphs:
            for r in p.runs:
                r.text = r.text.replace("16th March 2026", "2nd November 2026")
P.save(OUT)
print("saved", OUT)
