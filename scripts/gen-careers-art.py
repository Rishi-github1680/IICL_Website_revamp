import io, math, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Careers hero: an infographic of how a team is actually built here — capability
# domains on the left feeding role clusters that assemble into a delivery pod.
# Strictly the site palette: near-black ground, IICL red as the only signal colour,
# white/grey for structure. No third hue anywhere.
W, H = 1600, 720
RED = "#ee2f2e"
RED_DIM = "#8f1d1c"

def rnd(i, s):
    return abs(math.sin(i * s) * 43758.5453) % 1

p = []
p.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Diagram: capability domains feeding role clusters that assemble into a delivery team">')

# defs
p.append('<defs>')
p.append(f'<radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="{RED}" stop-opacity=".55"/><stop offset="1" stop-color="{RED}" stop-opacity="0"/></radialGradient>')
p.append(f'<linearGradient id="wash" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d0d0f"/><stop offset="1" stop-color="#050506"/></linearGradient>')
p.append(f'<linearGradient id="flow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{RED}" stop-opacity="0"/><stop offset=".45" stop-color="{RED}" stop-opacity=".7"/><stop offset="1" stop-color="{RED}" stop-opacity="0"/></linearGradient>')
p.append('</defs>')

p.append(f'<rect width="{W}" height="{H}" fill="url(#wash)"/>')

# faint measurement grid
for x in range(0, W, 40):
    p.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}" stroke="#ffffff" stroke-opacity=".05" stroke-width="1"/>')
for y in range(0, H, 40):
    p.append(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}" stroke="#ffffff" stroke-opacity=".05" stroke-width="1"/>')

# ambient dust
for i in range(150):
    x, y = rnd(i, 12.9) * W, rnd(i, 45.1) * H
    r = 0.6 + rnd(i, 78.2) * 1.5
    o = 0.22 + rnd(i, 33.3) * 0.45
    col = RED if rnd(i, 57.5) > 0.62 else "#ffffff"
    p.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r:.1f}" fill="{col}" fill-opacity="{o:.2f}"/>')

# ── Column 1: six capability domains ──
DOMAINS = ["AI &amp; GenAI", "Data Platforms", "Cloud &amp; SRE", "Cybersecurity", "Product Eng", "Ent. Platforms"]
x0, top, step = 596, 132, 74
for i, d in enumerate(DOMAINS):
    y = top + i * step
    p.append(f'<rect x="{x0}" y="{y - 20}" width="228" height="42" rx="8" fill="#ffffff" fill-opacity=".07" stroke="#ffffff" stroke-opacity=".24"/>')
    p.append(f'<circle cx="{x0 + 22}" cy="{y + 1}" r="4.5" fill="{RED}"/>')
    p.append(f'<text x="{x0 + 40}" y="{y + 6}" font-family="IBM Plex Mono, monospace" font-size="14" fill="#f4f2ee">{d}</text>')

# ── Column 2: role clusters ──
CX, CY = 1078, 360
for i in range(6):
    y = top + i * step
    p.append(f'<path d="M {x0 + 232} {y} C 900 {y}, 940 {CY}, {CX - 96} {CY}" fill="none" stroke="url(#flow)" stroke-width="2.1"/>')

p.append(f'<circle cx="{CX}" cy="{CY}" r="168" fill="url(#glow)" opacity=".8"/>')
p.append(f'<circle cx="{CX}" cy="{CY}" r="96" fill="#0b0b0d" stroke="{RED}" stroke-opacity=".85" stroke-width="2"/>')
p.append(f'<circle cx="{CX}" cy="{CY}" r="130" fill="none" stroke="{RED_DIM}" stroke-opacity=".6" stroke-width="1.2" stroke-dasharray="3 7"/>')
p.append(f'<text x="{CX}" y="{CY - 6}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="12" letter-spacing="2.4" fill="{RED}">ROLE</text>')
p.append(f'<text x="{CX}" y="{CY + 16}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="12" letter-spacing="2.4" fill="{RED}">SCORECARD</text>')

# orbiting role nodes
ROLES = ["Lead", "Architect", "Engineer", "SRE", "QA", "Security", "Data", "Product"]
for i, r in enumerate(ROLES):
    a = -math.pi / 2 + i * (2 * math.pi / len(ROLES))
    rx, ry = CX + math.cos(a) * 150, CY + math.sin(a) * 150
    p.append(f'<line x1="{CX + math.cos(a) * 98:.0f}" y1="{CY + math.sin(a) * 98:.0f}" x2="{rx - math.cos(a) * 16:.0f}" y2="{ry - math.sin(a) * 16:.0f}" stroke="{RED}" stroke-opacity=".5" stroke-width="1.2"/>')
    p.append(f'<circle cx="{rx:.0f}" cy="{ry:.0f}" r="15" fill="#0b0b0d" stroke="#ffffff" stroke-opacity=".35"/>')
    p.append(f'<circle cx="{rx:.0f}" cy="{ry:.0f}" r="3.6" fill="{RED}"/>')

# ── Column 3: the assembled pod ──
PX, PY = 1436, 360
for i in range(4):
    a = -math.pi / 2 + i * (2 * math.pi / 8)
    p.append(f'<path d="M {CX + 168} {CY} C 1290 {CY}, 1320 {PY - 90 + i * 60}, {PX - 108} {PY - 90 + i * 60}" fill="none" stroke="url(#flow)" stroke-width="1.4"/>')

p.append(f'<rect x="{PX - 108}" y="{PY - 150}" width="216" height="300" rx="14" fill="#ffffff" fill-opacity=".06" stroke="{RED}" stroke-opacity=".7"/>')
p.append(f'<text x="{PX}" y="{PY - 118}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="11" letter-spacing="2.6" fill="{RED}">DELIVERY POD</text>')
for i in range(5):
    y = PY - 84 + i * 44
    p.append(f'<rect x="{PX - 84}" y="{y}" width="168" height="30" rx="6" fill="#0b0b0d" stroke="#ffffff" stroke-opacity=".22"/>')
    p.append(f'<circle cx="{PX - 66}" cy="{y + 15}" r="3.4" fill="{RED}" fill-opacity="{0.95 - i * 0.13:.2f}"/>')
    p.append(f'<rect x="{PX - 50}" y="{y + 11}" width="{104 - i * 11}" height="7" rx="3.5" fill="#ffffff" fill-opacity=".34"/>')

# stage captions
for cx_, label in [(x0 + 114, "CAPABILITY DOMAINS"), (CX, "ROLE DESIGN"), (PX, "MOBILISED TEAM")]:
    p.append(f'<text x="{cx_}" y="{H - 44}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10.5" letter-spacing="2.8" fill="#ffffff" fill-opacity=".55">{label}</text>')

# No vignette here: Layout's .hero-scrim already darkens the left side for the copy.
# Adding a second one made the artwork invisible.

p.append('</svg>')

out = 'public/img/careers-hero.svg'
open(out, 'w', encoding='utf-8').write('\n'.join(p))
print('wrote', out, '(%.1f KB)' % (len('\n'.join(p)) / 1024))
