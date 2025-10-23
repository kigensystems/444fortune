# CLAUDE.md — 444 Fortunes Project

## Project Overview
**444 Fortunes** is an energetic casino-themed memecoin landing page inspired by the "88 Fortunes" slot machine game. The design combines traditional Asian prosperity symbols with vibrant casino aesthetics and memecoin energy.

**Development Philosophy:** Building iteratively with evolving vision. Requirements and features will be refined as we develop.

---

## Tech Stack

### Core
- **React 18.3.1** + **TypeScript 5.4.5**
- **Vite 5.2.0** (build tool)
- **Tailwind CSS 3.4.3** (styling)
- **Framer Motion 11.0.0** (animations)

### Animation Libraries
- **GSAP** (GreenSock) - Professional timeline animations, scroll triggers (ready to integrate)
- **react-spring** - Physics-based bouncy animations (ready to integrate)
- **react-icons** - Social media icon components (integrated)

### Build Pipeline
- PostCSS + Autoprefixer
- ES Modules
- TypeScript strict mode

---

## Design System

### Brand Colors (Tailwind Theme + Custom)
**Updated Palette - Gold + Cream Elegance:**
```javascript
// Primary Colors
'#F4E5C3' - Cream/champagne gold (main titles, borders)
'#FFE5B4' - Peach/light gold (gradients, highlights)
'#D4AF37' - Antique gold (gradients, accents)
'#B8960B' - Dark gold (3D bases, shadows)
'#C4A137' - Mid gold (text shadows)
'#8B0000' - Dark red (text on gold backgrounds)
'#8B4513' - Dark brown (text shadows, depth)

// Tailwind Config (legacy - being phased out)
'fortune-red': '#C41E3A'
'deep-red': '#8B0000'
'lucky-gold': '#FFD700'
'rich-gold': '#B8860B'
'prosperity-orange': '#FF6B35'
```

### Typography

**Display Font:**
- **Poppins** (Google Fonts) - Modern bold sans-serif
- Used for: "444 FORTUNES" headline, major numbers, all text
- Class: `font-casino` and `font-sans` (both configured)
- Weights: 400, 500, 600, 700, 800, 900

**Text Effects (Simplified 3D - No Glow):**
- `.fortune-text` - Clean 3D depth for "FORTUNES"
  - Cream fill (#F4E5C3), layered gold shadows, dark shadow for depth
- `.fortune-number` - Clean 3D depth for "444"
  - Cream fill (#F4E5C3), layered gold shadows, dark shadow for depth
- Both use 2-layer shadow progression (no glow effects)

**Typography Scale:**
- Hero number "444": `text-9xl` with `.fortune-number` class
- Hero headline: `text-7xl md:text-8xl` with `.fortune-text` class
- Section titles: `text-5xl md:text-6xl`
- Taglines: `text-3xl md:text-4xl`
- Body text: `text-lg`
- Always use Tailwind scale values (no arbitrary sizes)

### Animation Philosophy
- **Continuous motion** - Floating coins, scrolling marquees, particles
- **GPU-accelerated** - Transform and opacity only for 60fps
- **Scroll-triggered reveals** - Intersection Observer for feature cards
- **Hover microinteractions** - Lift, scale, rotate, bounce effects
- **Energetic memecoin feel** - Always moving, alive, celebratory

### Custom Animations (index.css)
- `float` (6s) - Vertical float + rotation for decorative elements
- `shimmer` (3s) - Gradient text shimmer
- `particle-float` (4s) - Upward particle rise
- `glow-pulse` (2s) - Button/text glow effect (deprecated - not in use)
- `spin-slow` (20s) - Slow rotation for decorative elements
- `marquee` (20s) - Fast horizontal scroll for ticker text
- `marquee-slow` (40s) - Slow luxurious scroll (current banner speed)

---

## Component Architecture

### Main Sections (App.tsx)

1. **Top Marquee Banner**
   - Infinite slow scrolling ticker (40s cycle)
   - Antique gold gradient background (matches CTA button)
   - Dark red embossed text with 3D effect
   - Message: "✦ 444 FORTUNES ✦ PROSPERITY ✦ ABUNDANCE ✦ GOOD LUCK ✦"

2. **Hero Section** (3-Column Layout)
   - **LEFT**: Heyyi Mascot
     - Female prosperity goddess in glass-morphism frame
     - Portrait orientation (256-320px wide)
   - **CENTER**: Content area
     - "444" number with clean 3D effect
     - "FORTUNES" headline matching style
     - Visual divider (golden gradient line)
     - Stacked subtitle: PROSPERITY / ABUNDANCE / LUCK
     - Social icon button row (Twitter, Telegram, Discord, Website)
     - Primary CTA: "JOIN THE FORTUNE" (antique gold gradient)
   - **RIGHT**: CZ Mascot
     - Male fortune bringer in glass-morphism frame
     - Portrait orientation (256-320px wide)
     - Image positioned 6% left (44% horizontal position)

   **Mascot Containers:**
   - Glass morphism effect with subtle brown tint
   - Semi-transparent golden borders (2px)
   - Inset highlights for beveled edge
   - Hover: slight lift with enhanced shadow
   - Optimized images (1600px, ~1.4-2.5MB each)

3. **Features/Story Section**
   - 3 story cards in responsive grid (1 col mobile, 3 col desktop)
   - Gradient backgrounds (prosperity-orange → fortune-red)
   - Black borders, corner accents
   - Scroll-triggered reveals with stagger
   - Current stories:
     - Triple Fortune Power
     - Lucky Spin Energy
     - Eternal Celebration

4. **Footer Blessing**
   - Decorative flowers + 福 character
   - Blessing text

5. **Bottom Marquee Banner**
   - Similar to top ticker
   - Message: "✦ JOIN 444 FORTUNES ✦ PROSPERITY AWAITS ✦ GOOD LUCK ✦"

### Reusable Components

**Particle** (lines 5-27)
- Golden dots with randomized positions
- 20 instances with opacity + scale animation
- Creates subtle sparkle effect throughout page

**Marquee** (lines 29-50)
- Takes text prop
- Duplicates text for seamless infinite scroll
- CSS animation-based

**SocialButton** (lines 52-66)
- Icon component from react-icons
- Gold background, black border, rounded square
- Hover: lifts and scales
- Props: icon, href, label

---

## Background & Visual Effects

### Background
- Custom illustrated background image: `444background.png`
- Features: golden Chinese clouds, hanging lanterns, scattered coins, flowers
- Illustrated/cartoon style matching overall aesthetic
- Fixed attachment, cover sizing for responsive display
- Red gradient with golden decorative elements

### Layered Effects (z-index order, back to front)
1. Background image (444background.jpg) - fixed position
2. Golden particle sparkles (20 particles) - subtle movement
3. Content sections

### Text Effects
- Multi-layered shadows for 3D depth
- Glowing outlines using text-shadow
- -webkit-text-stroke for clean outlines
- All effects defined in index.css utility classes

---

## Development Rules

### Critical Workflows
1. **Build command**: `npm run build` (TypeScript check + production build)
2. **Preview**: `npm run preview` at `localhost:5173`
3. **Always verify build** before considering work complete

### Code Standards
- **Delete replaced code** - Zero comments, no old versions
- **Tailwind scale only** - No arbitrary values
- **Type safety** - Proper TypeScript refs and types
- **Semantic HTML** - Meaningful element choices
- **Accessibility** - aria-labels on icon buttons, semantic markup

### Animation Guidelines
- Use Framer Motion for complex interactions
- CSS keyframes for continuous loops
- Always include hover states on interactive elements
- Test animations at 60fps
- GPU-accelerated properties only (transform, opacity)

---

## Current State & Pending Work

### ✅ Completed (v2 - Elegant Gold Update)
**Design System Overhaul:**
- Replaced bright ketchup-mustard colors with sophisticated gold + cream palette
- Clean 3D depth effects (removed all glow)
- Poppins font with simplified text shadows
- Antique gold gradients throughout (buttons, banners)

**Layout & Components:**
- 3-column hero layout (mascot | content | mascot)
- Glass morphism mascot frames with golden borders
- Stacked subtitle with proper hierarchy
- Golden divider line between title and subtitle
- Slow marquee animation (40s) with embossed text
- Social buttons with 3D raised effect
- CTA button with chunky 3D press effect

**Performance:**
- Optimized mascot images (5.5MB → 1.4-2.5MB at 1600px)
- Removed backdrop-filter initially (caused lag, re-added for glass effect)
- Responsive breakpoints: mobile (256px) → XL (320px)

**Assets:**
- Illustrated background (444background.jpg, 2.4MB)
- Optimized mascots (heyyi.png 2.5MB, cz.png 1.4MB at 1600px)
- Removed original 5MB+ backups

### 🎨 Assets
1. **Background Image** ✅ COMPLETED
   - File: `public/444background.jpg` (upscaled version)
   - Illustrated style with Chinese clouds, lanterns, coins, flowers
   - Red and gold color scheme
   - Integrated with fixed positioning

2. **Mascot Illustrations** ✅ COMPLETED
   - **heyyi.png** - Female prosperity goddess character
     - Traditional Chinese outfit with ornate headdress
     - Holding golden bowl of prosperity
     - Illustrated cartoon style
   - **cz.png** - Male fortune bringer with glasses
     - Modern twist on traditional prosperity character
     - Also holding golden bowl
     - Quirky, memorable design for crypto space
   - **Integration:** Both mascots displayed side by side in hero section
   - **Animations:** Spring entrance with stagger, hover tilt effects
   - **Sizing:** 256px (mobile) → 320px (desktop)

3. **Potential Future Assets**
   - Additional decorative SVG elements
   - Mascot variations/poses
   - Custom icon set for features

### 🚀 Future Enhancements (Not Yet Implemented)
- **GSAP integration:**
  - Number counter animation (0 → 444 on load)
  - Stagger animations for social buttons
  - Advanced scroll triggers
  - Timeline-based entrance effects

- **react-spring integration:**
  - Physics-based button hover bounces
  - Spring animations on card interactions
  - Mouse-follow particle effects

- **Additional effects:**
  - Sparkle burst on button click
  - Floating Chinese cloud SVGs
  - More particle variety
  - Background texture overlay

---

## Design Inspirations

Based on memecoin landing page examples featuring:
- Split hero layouts with large mascot characters
- Vibrant yellow/orange sunburst gradients
- Marquee ticker text at top/bottom
- Comic book style text with multiple strokes
- Social icon button rows
- Story/feature card sections with illustrations
- High-energy, playful aesthetic

And "88 Fortunes" slot machine aesthetic:
- Multi-layered text effects (red, gold, white, shadow)
- Sparkle/glow effects around elements
- Chinese prosperity goddess imagery
- Gold ingot stacks and coins
- Red and gold color harmony
- Celebration of wealth and luck

---

## File Structure

```
/444 Fortune/
├── public/
│   ├── 444background.jpg # Illustrated background (upscaled)
│   ├── heyyi.png         # Female prosperity mascot
│   └── cz.png            # Male fortune mascot
├── src/
│   ├── App.tsx           # Main component (all sections, ~260 lines)
│   ├── main.tsx          # React entry point
│   ├── index.css         # Global styles + animations + text effects
│   └── vite-env.d.ts     # Vite types
├── dist/                 # Build output (gitignored)
├── index.html            # HTML template (includes Poppins font)
├── tailwind.config.js    # Casino color palette + font config
├── vite.config.ts        # Build config
├── package.json          # Dependencies (gsap, react-spring, react-icons)
└── CLAUDE.md             # This file - project documentation
```

---

## Quality Checklist

Before marking any task complete:
- [ ] Build succeeds (`npm run build`)
- [ ] Tested at mobile (375px) and desktop (1440px)
- [ ] All animations smooth at 60fps
- [ ] Hover states working on all interactive elements
- [ ] Spacing consistent with design system
- [ ] No arbitrary Tailwind values
- [ ] TypeScript has no errors
- [ ] No console errors/warnings
- [ ] Social links populated (currently placeholder "#")
- [ ] Accessibility: keyboard navigation works, aria-labels present

---

## Notes

- This is a **single-page application** (no routing needed)
- Focus on **memecoin energy** and **casino excitement**
- **Vision is evolving** - building iteratively, requirements will change
- Design philosophy: Bold, vibrant, energetic (not overly busy)
- Social media links currently point to "#" - update when available
- Mascot images have cropped edges - bordered boxes hide this intentionally
- Background elements in mascot images should be removed in future iterations

---

## Social Media Integration

**Current Buttons:**
- Twitter (FaTwitter icon)
- Telegram (FaTelegramPlane icon)
- Discord (FaDiscord icon)
- Website (FaGlobe icon)

**To Update:**
Replace `href="#"` in SocialButton components (App.tsx lines 198-201) with actual URLs when available.

---

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Animation frame rate: Consistent 60fps
- Bundle size: Keep under 500KB gzipped
- Mobile performance: Smooth on mid-range devices

---

## Deployment

- Platform: Netlify (as specified in global CLAUDE.md)
- Build command: `npm run build`
- Publish directory: `dist`
- No environment variables currently needed
