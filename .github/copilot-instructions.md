# CRO Together — Copilot Instructions

## Design Context

### Users
Founders, bootstrappers, and growth-focused teams at businesses of varying maturity (early-stage to established) who want to improve their conversion funnels and begin personalizing to their customers. Audience spans B2B and B2C. Most visitors arrive warm — via referral or prior familiarity with the founder — with some cold outreach in the mix. They're pragmatic and results-oriented: they don't need to be sold on the concept of CRO, they need to trust that *this* person is worth hiring.

### Brand Personality
**Human · Curious · Collaborative**

The brand is a partner, not a vendor. It leads with empathy and intellectual curiosity rather than credentials and case-study metrics alone. The tone is warm and direct — never corporate, never hype-driven. It should feel like talking to a smart colleague who genuinely cares about your business.

### Aesthetic Direction
Editorial minimalism with warmth. The palette anchors on dark navy (`#060e1a`), cream (`#f5f0e8`), warm beige (`#ede8e0` / `#f1ede8`), and gold accents (`#ffddb1`). Muted blue (`#43617c`) plays a supporting role for badges and secondary elements.

Typography pairs Newsreader (serif — for authority, humanity, and editorial weight) with Manrope (sans — for clarity, utility, and modernity). Headlines use fluid sizing via `clamp()` and negative letter-spacing for a refined, intentional feel.

**Anti-references:** Avoid anything that reads as generic SaaS, growth-hacking culture, or cold corporate consulting. No neon gradients, no noise textures, no excessive motion.

**Theme:** Light mode only.

### Accessibility
WCAG AAA. All foreground/background color combinations must meet the 7:1 contrast ratio. Typography sizing, focus states, and interactive element spacing should be designed with high legibility as a baseline, not an afterthought.

### Design System Tokens
| Token | Value | Usage |
|---|---|---|
| Dark navy (`--navy`) | `#060e1a` | Primary text, dark section backgrounds, CTA buttons |
| Navy mid (`--navy-mid`) | `#1c2430` | Cards and panels on dark sections |
| Cream (`--cream`) | `#f5f0e8` | Nav, page background, primary section fill |
| Warm beige (`--beige`) | `#ede8e0` | Alternate section backgrounds |
| Tan (`--tan`) | `#f1ede8` | Footer, image backgrounds |
| Tan light (`--tan-light`) | `#ebe8e3` | Surfaces only, never under text |
| Gold accent (`--gold`) | `#ffddb1` | Highlights in dark sections, CTA accents |
| Muted blue (`--slate`) | `#43617c` | Secondary elements, eyebrows |
| Slate dark (`--slate-dark`) | `#46647e` | Badge text on blue badge bg |
| Blue badge bg (`--badge-blue`) | `#c1e0ff` | Info badge backgrounds |
| Text dark (`--text-dark`) | `#1c1c19` | Headings and form values on light backgrounds |
| Body gray (`--text-body`) | `#45474c` | Body copy |
| Muted gray (`--text-muted`) | `#434c5e` | Secondary labels on light backgrounds (AAA on cream/tan) |
| Muted gray, inverted (`--text-muted-invert`) | `#9aa3b2` | Secondary labels on navy (AAA on navy) |
| Destructive (`--destructive`) | `#d4183d` | Error states |

**Serif font:** Newsreader (200, 400, 600) — headlines, pull quotes, key metrics
**Sans font:** Manrope (200, 300, 400) — body text, labels, UI copy
**Design tokens file:** `src/styles/theme.css`

### Design Principles

1. **Partnership over performance.** Every design decision should reinforce the feeling that CRO Together is a collaborator, not a vendor. Warmth and approachability take precedence over impressive-but-cold.

2. **Let the work speak.** Resist over-decoration. Data, results, and client outcomes are the real heroes — design should frame them clearly, not compete with them.

3. **Precision as a form of care.** Tight typography, deliberate spacing, and consistent color usage signal that the same rigorous attention goes into client work. Sloppiness in the interface undermines trust.

4. **Earn trust incrementally.** Visual hierarchy should guide visitors from curiosity → credibility → confidence → contact. Don't ask for commitment before establishing trust.

5. **WCAG AAA is a baseline, not a ceiling.** High legibility and accessible contrast aren't constraints — they're a direct expression of the collaborative, human-first brand.
