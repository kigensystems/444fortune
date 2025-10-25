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
- **GSAP** (GreenSock) - Timeline animations, scroll triggers, stagger effects (INTEGRATED)
- **react-spring** - Physics-based spring animations (INTEGRATED)
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

### Responsive Design System

**Philosophy:** Mobile-first with simplified Tailwind breakpoints
- **3 strategic breakpoints**: base (mobile) → md: (768px, tablet) → xl: (1280px, desktop)
- **5 core font sizes** to maintain visual consistency

**Typography Scale (base → md → xl):**
1. Hero "444": `text-7xl md:text-8xl xl:text-9xl`
2. Section headings: `text-4xl md:text-5xl xl:text-6xl`
3. Countdown/large elements: `text-6xl md:text-7xl xl:text-8xl`
4. Body text: `text-lg md:text-xl`
5. Small print: `text-sm md:text-base`

**Spacing System:**
- Section padding: `pt-16 md:pt-24 xl:pt-32` / `pb-20 md:pb-32 xl:pb-40`
- Card padding: `p-6 md:p-8 xl:p-10`
- Gaps: `gap-6 md:gap-8 xl:gap-10`
- Margins: `mb-8 md:mb-12 xl:mb-16` (varies by context)

**Layout Breakpoints:**
- Hero grid: `grid-cols-1 md:grid-cols-3` (mobile stack → 3-column at tablet)
- Countdown: `flex-col md:flex-row` (vertical stack → horizontal at tablet)
- All major layouts transition at md: (768px)

### Typography

**Display Font:**
- **Poppins** (Google Fonts) - Modern bold sans-serif
- Used for: All text throughout the site
- Class: `font-casino` and `font-sans` (both configured)
- Weights: 400, 500, 600, 700, 800, 900

**Text Effects (Simplified 3D - No Glow):**
- `.fortune-text` - Clean 3D depth for "FORTUNES" (cream fill, gold shadows)
- `.fortune-number` - Clean 3D depth for "444" (cream fill, gold shadows)
- Both use 2-layer shadow progression (no glow effects)

### Animation Philosophy
- **Continuous motion** - Slow scrolling marquees
- **GPU-accelerated** - Transform and opacity only for 60fps
- **GSAP scroll-triggered reveals** - Stagger animations for steps
- **react-spring physics** - Bouncy hover effects on step numbers
- **Hover microinteractions** - Lift effects on mascots, 3D press on buttons
- **Luxurious feel** - Slow, deliberate animations (40s marquee)

### Custom Animations (index.css)
- `particle-float` (4s) - Upward floating golden sparkles (available, not actively used)
- `marquee-slow` (40s) - Slow luxurious banner scroll (actively used)

---

## Component Architecture

### Main Sections (App.tsx)

1. **Top Marquee Banner**
   - Infinite slow scrolling ticker (40s cycle)
   - Antique gold gradient background
   - Dark red embossed text with 3D effect
   - Message: "✦ 444 FORTUNES ✦ PROSPERITY ✦ ABUNDANCE ✦ GOOD LUCK ✦"
   - Loop-based generation (6 repetitions, no hardcoded duplicates)

2. **Hero Section** (3-Column Layout on Tablet+)
   - **Background**: Chinese illustrated background (444background.jpg) with 25% black overlay
   - **Layout**: Mascot | Content | Mascot (stacks on mobile, 3-col on md:)
   - **LEFT**: Heyyi Mascot
     - Female prosperity goddess in glass-morphism frame
     - Responsive sizing: w-64 md:w-72 xl:w-80
   - **CENTER**: Content area
     - "444" number with clean 3D effect
     - "FORTUNES" headline matching style
     - Visual divider (golden gradient line)
     - Stacked subtitle: PROSPERITY / ABUNDANCE / LUCK
     - Social icon button row (Twitter, Telegram, Discord, Website)
     - Primary CTA: "BUY $FORTUNE" (antique gold gradient, scrolls to game section)
   - **RIGHT**: CZ Mascot
     - Male fortune bringer in glass-morphism frame
     - Responsive sizing: w-64 md:w-72 xl:w-80
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
   - **Background**: Illustrated background (gamebackground.jpg) with 25% black overlay
   - **Layout**: Two-column grid (`grid-cols-1 md:grid-cols-2`)
     - **Left Column**: Countdown card with pot size and progress
     - **Right Column**: Compact stepper "How It Works"
   - Mobile: Single column (stacked)
   - Desktop: Side-by-side columns

   **Countdown Card** (Left Column):
   - **TIME REMAINING** title
   - Large countdown display (MM:SS format)
   - Progress bar showing elapsed time (0-20 minutes)
     - Dark brown background with antique gold gradient fill
     - Animates as timer counts down
   - **Current Pot** section:
     - Label: "Current Pot"
     - Amount: "$12,847" (placeholder)
   - Wrapped in `.mascot-frame` glass card
   - GSAP number counter animation on digit changes
   - Pulse animation when < 10 seconds remaining

   **Compact Stepper** (Right Column):
   - Wrapped in `.mascot-frame` glass card
   - "How It Works" title
   - Three steps with circular numbered badges (gold gradient, dark red text)
   - Steps use horizontal layout (number badge + content)

   1. **PURCHASE $FORTUNE**
      - Wallet address, amount, and timestamp recorded

   2. **HOLD & WAIT**
      - When timer expires a snapshot is taken: all holders, balances, and transaction times

   3. **RECEIVE YOUR FORTUNE**
      - 50% of volume auto-distributed to 5 winners. Odds weighted by hold time and amount

   **Fortune Formula** (fine print at bottom of stepper):
   - Entries = Minutes held × % of supply. Example: 1% for 15min = 15 entries, 2% for 20min = 40 entries
   - Minimized styling: `text-sm md:text-base`, opacity 0.5

5. **Sticky Mini-Bar**
   - Fixed position at top of viewport
   - Appears after scrolling 800px down the page
   - Gold gradient background (matches marquee)
   - **Content**: Countdown (MM:SS) | Pot: $12,847 (hidden on mobile) | BUY $FORTUNE button
   - Dark red gradient button with 3D press effect
   - Slides in/out with smooth animation (y: -100 to 0)
   - z-index: 50 (above all content)

6. **Bottom Marquee Banner**
   - Message: "✦ JOIN 444 FORTUNES ✦ PROSPERITY AWAITS ✦ GOOD LUCK ✦"

### Reusable Components

**Marquee**
- Takes text prop
- Loop-based generation (6 repetitions × 2 for seamless scroll)
- 40s animation cycle (slow, luxurious)
- Antique gold gradient background (`.bg-marquee-gold`)
- Dark red embossed text (`.marquee-text`)

**CountdownTimer**
- Receives `timeLeft` prop from parent App component
- Displays large countdown (MM:SS format)
- Progress bar animating 0-100% over 20 minutes
- Current Pot display ($12,847 placeholder)
- GSAP animations for rolling digit transitions
- Pulse animation at < 10 seconds
- Wrapped in `.mascot-frame` glass card

**CompactStepper**
- Displays "How It Works" in compact format
- Three steps with circular numbered badges
- Badges: Gold gradient background, dark red text, 3D shadow
- Horizontal layout: badge (40-48px) + content
- Step text condensed but maintains technical credibility
- Fortune formula at bottom as fine print

**StickyMiniBar**
- Receives `timeLeft` prop from parent App component
- Shows/hides based on scroll position (800px threshold)
- Displays countdown, pot amount (desktop only), and buy button
- Smooth slide-in animation (Framer Motion)
- Gold gradient background matching marquee aesthetic

**SocialButton**
- Icon component from react-icons
- Antique gold gradient background with 3D raised effect (`.social-button-3d`)
- Rounded square (16px border-radius)
- Hover: press down effect (reduces shadow)
- Props: icon, href, label

---

## Background & Visual Effects

### Background Strategy
**Hero Section:**
- Custom illustrated background image: `444background.jpg`
- Features: golden Chinese clouds, hanging lanterns, scattered coins, flowers
- 25% black overlay to reduce visual noise

**Game Section:**
- Illustrated background image: `gamebackground.jpg`
- Features: red background with golden swirls and stars
- 25% black overlay for consistency with hero

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
- `.glass-card-gold` - Enhanced glass morphism cards (stronger borders, glow, inset highlights) - NOT CURRENTLY USED
- `.mascot-frame` - Subtle glass morphism (used for mascots, countdown, and step cards)
  - Very subtle brown tint (15% opacity)
  - Thin semi-transparent golden borders (2px)
  - Inset highlights for beveled edge
  - Elegant and understated

---

## Current State

### ✅ Completed Features

**v5 - Two-Column Game Section + Sticky Mini-Bar:**
- Two-column layout for game section (countdown | stepper) on desktop
- Countdown card with progress bar and current pot display
- Compact stepper with circular numbered badges
- Sticky mini-bar appears at 800px scroll showing countdown | pot | buy button
- Condensed step text maintaining technical credibility
- Step headers all caps: PURCHASE / HOLD & WAIT / RECEIVE YOUR FORTUNE
- Step 2 rephrased: "When timer expires a snapshot is taken..."
- Removed "on-chain" and volume description from pot
- Single shared timer state managed in App component
- Removed unused react-spring and StepNumber component

**v4 - Responsive Design System & Advanced Animations:**
- Implemented simplified responsive system (base → md → xl breakpoints)
- 5 core font sizes for visual consistency
- GSAP number counter for countdown digits
- Responsive spacing system throughout
- Changed step 3 from "Claim" to "Receive Your Fortune"
- All cards use subtle `.mascot-frame` styling

**v3 - Game Mechanics & Layout Improvements:**
- Replaced MoneyBagGrowth component with Lottie coin animation
- Comprehensive game mechanics documentation (3 clear steps)
- Fortune formula with ticket-based entry system (Minutes × % Supply)
- Added gamebackground.jpg to game section with 25% overlay
- Middle marquee banner as section divider

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
- Removed unused CSS animations
- Loop-based Marquee component (no hardcoded repetitions)
- Responsive breakpoints optimized for mobile-first

**Assets:**
- Illustrated backgrounds (444background.jpg, gamebackground.jpg)
- Optimized mascots (heyyi.png 2.5MB, cz.png 1.4MB at 1600px)
- Lottie animation hosted on lottie.host

### 📋 Potential Future Enhancements
- Smart contract integration for actual draws
- Live wallet connection (Web3/ethers.js)
- Real-time holder statistics
- Winner history display
- Blockchain transaction verification

---

## File Structure

```
/444 Fortune/
├── public/
│   ├── 444background.jpg    # Illustrated background (hero section)
│   ├── gamebackground.jpg   # Illustrated background (game section)
│   ├── heyyi.png           # Female prosperity mascot
│   └── cz.png              # Male fortune mascot
├── src/
│   ├── App.tsx             # Main component (~470 lines)
│   │                       # - Marquee, CountdownTimer, CompactStepper, StickyMiniBar, SocialButton
│   │                       # - Hero section (3-col on tablet+)
│   │                       # - Game section (2-col on desktop: countdown | stepper)
│   ├── main.tsx            # React entry point
│   ├── index.css           # Global styles + animations + utility classes
│   └── vite-env.d.ts       # Vite types
├── dist/                   # Build output (gitignored)
├── index.html              # HTML template (includes Poppins font)
├── tailwind.config.js      # Color palette and design tokens
├── vite.config.ts          # Build config
├── package.json            # Dependencies
└── CLAUDE.md               # This file - project documentation
```

---

## Development Rules

### Critical Workflows
1. **Build command**: `npm run build` (TypeScript check + production build)
2. **Preview**: `npm run preview` at `localhost:5173`
3. **Always verify build** before considering work complete

### Code Standards
- **Delete replaced code** - Zero comments, no old versions
- **Tailwind scale only** - No arbitrary values (except rare cases)
- **Type safety** - Proper TypeScript refs and types
- **Semantic HTML** - Meaningful element choices
- **Accessibility** - aria-labels on icon buttons, semantic markup

### Responsive Design Standards
- **Mobile-first** - Start with base styles, add md: and xl: as needed
- **3 breakpoints max** - base, md: (768px), xl: (1280px)
- **5 core font sizes** - Maintain visual hierarchy
- **Consistent spacing** - Use the defined spacing scale

### Animation Guidelines
- Use GSAP for scroll-triggered reveals and timeline-based animations
- Use react-spring for physics-based interactions
- Use Framer Motion for simple component animations
- CSS keyframes for continuous loops only
- Always include hover states on interactive elements
- Test animations at 60fps
- GPU-accelerated properties only (transform, opacity)

---

## Quality Checklist

Before marking any task complete:
- [ ] Build succeeds (`npm run build`)
- [ ] Tested at mobile (375px), tablet (768px), and desktop (1280px+)
- [ ] All animations smooth at 60fps
- [ ] Hover states working on all interactive elements
- [ ] Spacing consistent with design system
- [ ] Responsive breakpoints working correctly
- [ ] TypeScript has no errors
- [ ] No console errors/warnings
- [ ] Social links populated (currently placeholder "#")
- [ ] Accessibility: keyboard navigation works, aria-labels present

---

## Notes

- This is a **single-page application** (no routing needed)
- **Vision is evolving** - building iteratively, requirements will change
- Design philosophy: Elegant gold aesthetic with luxurious feel and sophisticated motion design
- Social media links currently point to "#" - update when available
- CZ mascot positioned 6% left (44% horizontal) to account for wider image dimensions
- Both hero and game sections have illustrated backgrounds with 25% overlay
- Game mechanics use simple ticket formula: Minutes held × % supply owned = entries
- Responsive system follows modern mobile-first best practices

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
