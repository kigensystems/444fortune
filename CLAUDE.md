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
- **@lottiefiles/dotlottie-react** - Lottie animation player (integrated for countdown visual)

### Build Pipeline
- PostCSS + Autoprefixer
- ES Modules
- TypeScript strict mode

---

## Design System

### Brand Colors
**Current Palette - Elegant Gold + Cream:**
```javascript
'#F4E5C3' - Cream/champagne gold (main titles, borders)
'#FFE5B4' - Peach/light gold (gradients, highlights)
'#D4AF37' - Antique gold (gradients, accents)
'#B8960B' - Dark gold (3D bases, shadows)
'#C4A137' - Mid gold (text shadows)
'#8B0000' - Dark red (text on gold backgrounds)
'#8B4513' - Dark brown (text shadows, depth)
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
- Hero number "444": `text-8xl md:text-9xl`
- Hero headline: `text-6xl md:text-7xl`
- Subtitle words: `text-xl md:text-2xl`
- Section titles: `text-5xl md:text-6xl`
- Body text: `text-lg`
- Always use Tailwind scale values (no arbitrary sizes)

### Animation Philosophy
- **Continuous motion** - Slow scrolling marquees, floating particles
- **GPU-accelerated** - Transform and opacity only for 60fps
- **Scroll-triggered reveals** - Intersection Observer for feature cards
- **Hover microinteractions** - Lift effects on mascots, 3D press on buttons
- **Luxurious feel** - Slow, deliberate animations (40s marquee)

### Custom Animations (index.css)
- `particle-float` (4s) - Upward floating golden sparkles (available)
- `marquee-slow` (40s) - Slow luxurious banner scroll (actively used)
- Removed unused animations: `float`, `shimmer`, `glow-pulse`, `spin-slow`, `marquee` (20s version)

---

## Component Architecture

### Main Sections (App.tsx)

1. **Top Marquee Banner**
   - Infinite slow scrolling ticker (40s cycle)
   - Antique gold gradient background
   - Dark red embossed text with 3D effect
   - Message: "✦ 444 FORTUNES ✦ PROSPERITY ✦ ABUNDANCE ✦ GOOD LUCK ✦"
   - Loop-based generation (6 repetitions, no hardcoded duplicates)

2. **Hero Section** (3-Column Layout)
   - **Background**: Chinese illustrated background (444background.jpg) with 25% black overlay
   - **Layout**: Mascot | Content | Mascot
   - **LEFT**: Heyyi Mascot
     - Female prosperity goddess in glass-morphism frame
     - Portrait orientation (256-320px wide)
   - **CENTER**: Content area
     - "444" number with clean 3D effect
     - "FORTUNES" headline matching style
     - Visual divider (golden gradient line)
     - Stacked subtitle: PROSPERITY / ABUNDANCE / LUCK
     - Social icon button row (Twitter, Telegram, Discord, Website)
     - Primary CTA: "BUY $FORTUNE" (antique gold gradient, scrolls to game section)
   - **RIGHT**: CZ Mascot
     - Male fortune bringer in glass-morphism frame
     - Portrait orientation (256-320px wide)
     - Image positioned 6% left (44% horizontal position)

   **Mascot Containers:**
   - Glass morphism effect with subtle brown tint (`.mascot-frame`)
   - Semi-transparent golden borders (2px)
   - Inset highlights for beveled edge
   - Hover: slight lift with enhanced shadow
   - Optimized images (1600px, ~1.4-2.5MB each)

3. **Middle Marquee Banner**
   - Section divider between hero and game section
   - Message: "✦ JOIN 444 FORTUNES ✦ PROSPERITY AWAITS ✦ GOOD LUCK ✦"

4. **Game Section** (Two-Column Layout on Desktop)
   - **Background**: Clean dark gradient (red-900 → red-950 → black)
   - **Title**: "WILL YOU BE THE MOST FORTUNATE?"
   - **Desktop Layout (≥lg)**: Side-by-side columns
     - **LEFT**: How It Works (3 numbered steps + formula)
     - **RIGHT**: Countdown Timer (sticky positioned, stays visible while scrolling)
   - **Mobile Layout**: Stacked vertically

   **How It Works Steps:**
   1. Purchase $FORTUNE
      - Your wallet, amount purchased and timestamp of tx will be added to the draw
   2. HOLD & WAIT
      - After 20 minutes a snapshot is taken of current holders, amount of tokens, and tx time
   3. Claim Your Fortune
      - 50% of all volume distributed evenly to 5 holders
      - Odds greatly increased by hold time and amount held

   **Fortune Formula Disclaimer** (italic text):
   - Your entries = Minutes held × % of supply owned
   - Five winners drawn randomly from the pool
   - Example calculations showing entry multipliers

   **CountdownTimer Component:**
   - "NEXT FORTUNE DRAW" subtitle
   - 20-minute countdown (MM:SS format, cream gold color)
   - Lottie coin animation (max-w-lg size)
   - Dynamic message: "Hold strong, prosperity approaches" or "Fortune favors the ready..."
   - Pulse animation when < 10 seconds remaining

5. **Bottom Marquee Banner**
   - Message: "✦ JOIN 444 FORTUNES ✦ PROSPERITY AWAITS ✦ GOOD LUCK ✦"

### Reusable Components

**Marquee**
- Takes text prop
- Loop-based generation (6 repetitions × 2 for seamless scroll)
- 40s animation cycle (slow, luxurious)
- Antique gold gradient background (`.bg-marquee-gold`)
- Dark red embossed text (`.marquee-text`)

**CountdownTimer**
- 20-minute auto-resetting timer
- Lottie animation from lottie.host
- Cream gold countdown text with 3D shadow
- Conditional message based on time remaining
- Pulse animation at < 10 seconds

**SocialButton**
- Icon component from react-icons
- Antique gold gradient background with 3D raised effect (`.social-button-3d`)
- Rounded square (16px border-radius)
- Hover: press down effect (reduces shadow)
- Props: icon, href, label

---

## Background & Visual Effects

### Background Strategy
**Hero Section Only:**
- Custom illustrated background image: `444background.jpg`
- Features: golden Chinese clouds, hanging lanterns, scattered coins, flowers
- Illustrated/cartoon style matching overall aesthetic
- 25% black overlay to reduce visual noise
- Applied only to hero section (not site-wide)

**Rest of Site:**
- Clean dark gradient: `bg-gradient-to-b from-red-900 via-red-950 to-black`
- No background image to keep focus on game mechanics

### CSS Utility Classes (index.css)
**Text Effects:**
- `.fortune-text` - Clean 3D depth for "FORTUNES" (cream fill, gold shadows)
- `.fortune-number` - Clean 3D depth for "444" (cream fill, gold shadows)
- `.text-subtitle-gold` - Subtitle styling (peach gold with brown shadow)

**Component Styles:**
- `.bg-marquee-gold` - Marquee background gradient
- `.marquee-text` - Embossed marquee text
- `.social-button-3d` - Social button gradient with chunky shadow
- `.cta-button-3d` - CTA button with deep 3D press effect
- `.glass-card-gold` - Enhanced glass morphism cards (stronger borders, glow, inset highlights)
- `.mascot-frame` - Glass morphism mascot containers

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

### ✅ Completed

**v3 - Game Mechanics & Layout Improvements:**
- Replaced MoneyBagGrowth component with Lottie coin animation
- Two-column desktop layout (steps left, countdown right with sticky positioning)
- Comprehensive game mechanics documentation (3 clear steps)
- Fortune formula with ticket-based entry system (Minutes × % Supply)
- Background limited to hero section only (25% overlay)
- Clean dark gradient for game section
- Removed decorative footer elements
- Middle marquee banner as section divider
- Code refactoring: ~163 lines reduced, cleaner utilities

**v2 - Elegant Gold Update:**
- Replaced bright colors with sophisticated gold + cream palette
- Clean 3D depth effects (removed all glow)
- Poppins font with simplified text shadows
- Antique gold gradients throughout (buttons, banners)
- 3-column hero layout (mascot | content | mascot)
- Glass morphism mascot frames with golden borders
- Slow marquee animation (40s) with embossed text
- Social buttons with 3D raised effect
- CTA button with chunky 3D press effect

**Performance:**
- Optimized mascot images (5.5MB → 1.4-2.5MB at 1600px)
- Responsive breakpoints: mobile (256px) → XL (320px)
- Removed unused CSS animations
- Loop-based Marquee component (no hardcoded repetitions)

**Assets:**
- Illustrated background (444background.jpg, 2.4MB) - hero section only
- Optimized mascots (heyyi.png 2.5MB, cz.png 1.4MB at 1600px)
- Lottie animation hosted on lottie.host

### 📋 Potential Future Enhancements
- Smart contract integration for actual draws
- Live wallet connection (Web3/ethers.js)
- Real-time holder statistics
- Winner history display
- Blockchain transaction verification

### 🚀 Advanced Animation Ideas (Dependencies Installed)
GSAP and react-spring are installed but not yet integrated. Potential uses:

**GSAP:**
- Number counter animation (0 → 444 on load)
- Stagger animations for social buttons
- Advanced scroll triggers
- Timeline-based entrance effects

**react-spring:**
- Physics-based button hover bounces
- Spring animations on card interactions
- Mouse-follow particle effects

**Additional effects:**
- Sparkle burst on button click
- More particle variety
- Texture overlays

---

## Design Inspirations

**Memecoin Landing Pages:**
- Split hero layouts with large mascot characters
- Marquee ticker text at top/bottom
- Comic book style text with 3D depth
- Social icon button rows
- Story/feature card sections with illustrations
- Energetic, playful aesthetic

**"88 Fortunes" Slot Machine:**
- Multi-layered text effects for 3D depth
- Chinese prosperity goddess imagery
- Gold ingot stacks and coins
- Elegant gold color harmony
- Celebration of wealth and luck
- Luxurious casino feel

**V2 Design Evolution:**
- Moved away from "ketchup and mustard" bright colors
- Adopted sophisticated gold + cream palette
- Clean 3D effects without glow
- Glass morphism elements
- Slower, more deliberate animations

---

## File Structure

```
/444 Fortune/
├── public/
│   ├── 444background.jpg # Illustrated background (hero section only)
│   ├── heyyi.png         # Female prosperity mascot
│   └── cz.png            # Male fortune mascot
├── src/
│   ├── App.tsx           # Main component (~400 lines)
│   │                     # - Marquee, CountdownTimer, SocialButton components
│   │                     # - Hero section, Game section with 2-col layout
│   ├── main.tsx          # React entry point
│   ├── index.css         # Global styles + animations + utility classes
│   │                     # - Reduced unused animations
│   │                     # - Added reusable utility classes
│   └── vite-env.d.ts     # Vite types
├── dist/                 # Build output (gitignored)
├── index.html            # HTML template (includes Poppins font)
├── tailwind.config.js    # Updated color palette (actual design tokens)
├── vite.config.ts        # Build config
├── package.json          # Dependencies (gsap, react-spring, react-icons, @lottiefiles/dotlottie-react)
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
- **Vision is evolving** - building iteratively, requirements will change
- Design philosophy: Elegant gold aesthetic with luxurious feel, clean game section without distractions
- Social media links currently point to "#" - update when available
- CZ mascot positioned 6% left (44% horizontal) to account for wider image dimensions
- Background strategy: Hero has illustrated background, game section uses clean gradient
- Game mechanics use simple ticket formula: Minutes held × % supply owned = entries

---

## Social Media Integration

**Current Buttons:**
- Twitter (FaTwitter icon)
- Telegram (FaTelegramPlane icon)
- Discord (FaDiscord icon)
- Website (FaGlobe icon)

**To Update:**
Replace `href="#"` in SocialButton components (App.tsx) with actual URLs when available.

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
