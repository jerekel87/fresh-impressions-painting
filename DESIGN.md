# Fresh Impressions Painting - Design Specification

## Overview

Marketing site for Fresh Impressions Painting, a residential and commercial painting company serving North Central Texas (Hood, Johnson, Parker, Erath, and Somervell counties). The home page is a vertically stacked series of full-width sections. Inner pages (About, Services, etc.) share the same global tokens, navbar, and footer.

---

## Global Design Tokens

### Colors
- **Navy 900**: `#10263C` (primary dark / text)
- **Navy 800**: `#12334E` (secondary dark)
- **Brand Yellow**: `#FACF10` (primary CTA / accents)
- **Brand Gold**: `#C6A312` (hover state for yellow)
- **Brand Olive**: `#9B821B`
- **Brand Teal**: `#2B98BE` (icons / supporting accent)
- **Brand Cyan**: `#23C5E8`
- **Light BG**: `#f4f7fa` (section backgrounds)

### Typography
- **Body font**: Inter (weights 300-900)
- **Display font**: Oswald (weights 400-700), used uppercase for headings
- **Body text**: 15-16px, line-height 1.8-1.85, gray-500/gray-600
- **H1 (page hero headings)**: Oswald uppercase, bold, `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` (36px / 48px / 60px / 72px), line-height 1.05
- **Home hero H1** (special): Oswald uppercase, bold, `text-[clamp(2rem,7vw,5.5rem)]` (fluid 32px–88px), line-height 1.08
- **H2 (section headings)**: Oswald uppercase, bold, `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` (30px / 36px / 48px / 60px), line-height 1.05
- **Section labels**: Brand-teal or brand-yellow, 12px, uppercase, tracking `0.2em`, font-semibold

### Inner Page Conventions
- All inner pages share the Navbar and Footer from the home page
- Inner pages begin with a navy-900 hero banner that accounts for the fixed navbar (pt-[120px] sm:pt-[140px])
- Hero banners include a breadcrumb link back to home and a large Oswald heading
- H1 hero headings on inner pages MUST use: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` with `line-height: 1.05`
- Maintain the same spacing system, color tokens, and component patterns across all pages

### Spacing System
- Section padding: `py-12 sm:py-20 md:py-32` (varies by section)
- Max content width: `max-w-7xl` (1280px) with `px-4 sm:px-6 lg:px-8`
- Card gaps: `gap-5` (20px)

---

## Section 1: Navbar (Fixed)

**Position**: Fixed top, z-50

### Top Bar (desktop only, hidden on scroll)
- Background: navy-900
- Height: 44px
- Left: Location pin icon (teal) + county names as links (white/40, hover white/70)
- Right: Phone icon (teal) + phone number link (white/60, hover brand-yellow)
- Animates out with max-height/opacity transition on scroll

### Main Nav Bar
- Background: `#0c2236`
- Height: 88px default, shrinks to 72px on scroll (60px mobile)
- Left: Company logo (responsive height 60px down to 48px on scroll)
- Center: Nav links (HOME, ABOUT, SERVICES, AREAS, REVIEWS, CONTACT) - white/80, active = brand-yellow with 2px underline indicator
- Right: Phone number (appears on scroll with slide-in) + "GET ESTIMATE" CTA button (brand-yellow bg, navy text, arrow icon)

### Mobile Menu
- Fullscreen overlay (navy-900)
- Header: logo + X close button
- Centered nav links with numbered indices (01-06), slide-in animation staggered by 80ms
- Footer: phone link + "GET ESTIMATE" full-width button

---

## Section 2: Hero

- Full viewport height (`h-[85vh] sm:h-screen`, min 560px, max 1100px)
- Background: Full-bleed image (`hero-bg-image1.png`) with gradient overlay (navy-900 at 70-80% opacity, stronger at top and bottom)
- Content centered vertically and horizontally:
  - Subheading: "North Central Texas" (brand-yellow, 11-13px, tracking 0.25em, uppercase)
  - Main heading: "Making Your Space Unrecognizably Fresh And New" (white, Oswald uppercase, clamp 2rem-5.5rem)
  - Supporting text: white/70, max-w-xl
  - CTA button: "GET FREE ESTIMATE" (brand-yellow bg, navy text, ArrowRight icon)

---

## Section 3: Image Gallery Ticker (ServiceAreas)

- Background: navy-900, no vertical padding
- Continuously auto-scrolling horizontal strip of images (Pexels stock photos)
- 15 images at 200x200px (mobile) / 300x300px (desktop), no gaps
- Duplicated array for seamless infinite scroll
- Animation: JS requestAnimationFrame, 0.5px/frame speed

---

## Section 4: About Us

- Background: `#f4f7fa`
- Two-column grid (stacked on mobile):
  - **Left**: 5-star rating row + heading ("Expert craftsmanship, built on integrity.") + paragraph about founding + 3-column stats (10+ Years, 5 Counties, 5.0 Rating) with teal SVG icons
  - **Right**: Portrait image (`about-us.jpg`) with aspect-ratio 4:5, gradient overlay at bottom showing "Ian Rosenkranz / Founder & Owner"

---

## Section 5: Services Preview

- Background: white
- Header row: "Our Services" label (teal, uppercase) + "Our Solutions" heading + description + left/right scroll buttons (circle, border-2) 
- Horizontally scrollable card carousel (left edge aligns with header content via dynamic padding)
- 9 service cards, each:
  - 300-360px wide, 420-460px tall
  - Full-bleed background image (Pexels) with gradient overlay
  - Title always visible at bottom
  - On hover: image scales 105%, description + "GET ESTIMATE" CTA slide in from below
  - Top-right numbered badge (white/10 bg, backdrop-blur)
- Services: Interior Painting, Exterior Painting, Brick And Stone Lime Wash, Cabinet Finishing And Refinishing, Commercial Painting, Drywall Repair And Finishing, Metal Finishing And Refinishing, New Construction Painting, Staining

---

## Section 6: Service Area Map

- Background: navy-900
- Header: "Service Area" label (teal) + "Where we work" heading + "Five counties..." subtext
- Desktop: tab row for county selection (underline active indicator, brand-yellow)
- Interactive Leaflet map (light CartoDB tiles):
  - 400-560px tall
  - Circle markers for each county center
  - Click to fly-to and select county
  - Zoom controls top-right, no attribution
- Info card overlay (bottom-left, white, shadow):
  - County name, main city, description, city tags
- Mobile: horizontal pill selector above map
- Bottom CTA bar: "Need service outside these areas?" + "GET AN ESTIMATE" button
- Counties: Hood (HQ), Parker, Johnson, Erath, Somervell

---

## Section 7: Reviews Ticker

- Background: `#f4f7fa`
- Header: two-column - left has 5-star row + "What our clients say about us." heading; right has supporting paragraph
- Two auto-scrolling rows of review cards:
  - Row 1: scrolls left, 40s duration
  - Row 2: scrolls right, 45s duration
  - Both pause on hover
- Edge fade gradients (left and right, 32-128px)
- Review cards (320-380px wide):
  - White bg, border, padding 28-32px
  - Star rating row (amber-400 filled stars)
  - Review text truncated to 5 lines with ellipsis (`line-clamp-5`)
  - Author row: initial avatar (gray circle) + name + source badge ("Facebook")
  - Clickable: opens lightbox with full review text
- Lightbox modal:
  - Dark backdrop (black/60, backdrop-blur)
  - White card, max-w-lg, centered
  - Full review text, author info, X close button
  - Closes on backdrop click, X button, or Escape key
- 14 real customer testimonials from Facebook recommendations

---

## Section 8: Project Reels Showcase

- Background: navy-900
- Header: "Project Reels" label (brand-yellow) + "See the Difference" heading + description
- Controls: Left/right scroll buttons (circle, white border) + "Follow for More" link (brand-yellow button, links to Facebook)
- Horizontally scrollable carousel of embedded Facebook reels:
  - Cards: 197-281px wide, 350-500px tall
  - Embedded via Facebook SDK (`fb-video` XFBML plugin, data-width 281)
  - 11 Facebook reel URLs
- Facebook SDK loaded dynamically, dispatches custom `fb-sdk-ready` event

---

## Section 9: Estimate Form (Contact)

- Background: full-bleed texture image (`DSC_TEXTURE_S_3.jpg`) with white/30 overlay
- Two-column layout:
  - **Left - Form card** (white/90 bg, backdrop-blur, border):
    - Heading: "Request a free quote." (teal accent)
    - Fields: First name, Last name (2-col), Email, Phone, Service type dropdown, Description textarea
    - All inputs: icon left-aligned, border-gray-200, focus border teal
    - Submit: "GET ESTIMATE" full-width button (brand-yellow)
    - Footnote: "No contracts, no obligation. We respond within 24 hours."
    - Success state: CheckCircle icon + confirmation message
  - **Right - Info panel**:
    - Heading: "Ready to transform your space?"
    - Supporting paragraph
    - 2x2 grid of contact cards (white/80 bg, border, backdrop-blur):
      - Call or Text: (817) 243-9116
      - Email: info@freshimpressionspainting.com
      - Service Area: North Central Texas
      - Response Time: Within one business day
- Service options: Interior Painting, Exterior Painting, Cabinet Refinishing, Drywall Repair, Staining, Lime Wash, Commercial, Other

---

## Section 10: Footer

- Background: `#0b1e2f`

### Top CTA Band
- Border-bottom separator
- "Let's start your project." heading + subtext + "REQUEST ESTIMATE" button (brand-yellow, ArrowUpRight icon)

### Main Footer (4-column grid)
- **Brand**: Logo, description paragraph, Facebook + Instagram social icons (hover: brand-yellow bg)
- **Navigation**: Links to About, Services, Reviews, Service Areas, Contact
- **Services**: Interior Painting, Exterior Painting, Cabinet Refinishing, Drywall Repair, Staining, Commercial
- **Get In Touch**: Phone, email, location (with teal SVG icons)

### Bottom Bar
- Border-top separator
- Copyright notice (dynamic year) + Privacy Policy + Terms of Service links

---

## Animations & Interactions

- **Navbar**: Scroll-triggered shrink with smooth height/opacity transitions (700ms cubic-bezier)
- **Image ticker**: Continuous JS-driven translateX animation at 0.5px/frame
- **Reviews ticker**: CSS keyframe infinite scroll (left 40s, right 45s), pauses on hover
- **Service cards**: Hover reveals description with max-height transition + scale on image
- **Map**: Leaflet flyTo with 0.6-0.8s duration on county selection
- **Horizontal carousels**: Smooth scroll-by with calculated card width + gap distance
- **Mobile menu**: Staggered slide-in with cubic-bezier easing per link
- **Review lightbox**: Fade-in + scale animation (0.2s ease-out), body scroll lock
- **CTA buttons**: Background color transition on hover (300ms)
- **Nav links**: Underline width transition on hover/active

---

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px-1024px (sm to lg)
- **Desktop**: > 1024px (lg)
- Max content: 1400px for navbar, 1280px (max-w-7xl) for all other content

---

## External Dependencies

- **Leaflet** (v1.9.4): Interactive map with CartoDB light tiles
- **Facebook SDK** (v19.0): Embedded video reels via XFBML
- **Lucide React** (v0.344.0): Icon system
- **Pexels**: Stock photography (service cards, gallery ticker)
- **Google Fonts**: Inter + Oswald

---

## Assets Used

- `src/assets/hero-bg-image1.png` - Hero background (company van in front of home)
- `src/assets/freshimpressionspainting-web-logo.png` - Company logo (navbar + footer)
- `src/assets/about-us.jpg` - Portrait of Ian Rosenkranz (About section)
- `src/assets/DSC_TEXTURE_S_3.jpg` - Paint texture (Estimate form background)
