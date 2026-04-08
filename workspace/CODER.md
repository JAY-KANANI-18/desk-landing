<instructions>
This file will be automatically added to your context. 
It serves multiple purposes:
  1. Storing frequently used tools so you can use them without searching each time
  2. Recording the user's code style preferences (naming conventions, preferred libraries, etc.)
  3. Maintaining useful information about the codebase structure and organization
  4. Remembering tricky quirks from this codebase

When you spend time searching for certain configuration files, tricky code coupled dependencies, or other codebase information, add that to this CODER.md file so you can remember it for next time.
Keep entries sorted in DESC order (newest first) so recent knowledge stays in prompt context if the file is truncated.
</instructions>

<coder>
## Animation System (as of 2026-04-07)
- **useInView** → `src/hooks/useInView.ts` — IntersectionObserver, threshold + rootMargin + once
- **useCountUp** → `src/hooks/useCountUp.ts` — easeOutExpo, inView-triggered
- **useTypewriter** → `src/hooks/useTypewriter.ts` — type/delete cycle for channel names in hero
- **AnimatedSection** → `src/components/AnimatedSection.tsx` — wrapper for up/left/right/scale/fade reveals
- **MagneticButton** → `src/components/MagneticButton.tsx` — mousemove magnetic pull effect
- **GlowCursor** → `src/components/GlowCursor.tsx` — lagging radial glow follows cursor (canvas RAF loop)
- **ParticleField** → `src/components/ParticleField.tsx` — canvas connected-dots particle system
- Key CSS: `.shimmer-bg`, `.text-shimmer`, `.scan-glow::after`, `.tilt-card`, `.glow-brand-hover` in tailwind.css

## Project Structure (as of 2026-04-07)
- **Framework:** React 18 + TypeScript + Vite + Tailwind CSS 3
- **Routing:** React Router v6 (BrowserRouter), routes: /, /features, /pricing, /industry, /industry/:slug
- **Theme:** Dark (#080c14), brand = #4f46e5 (brand-600 in tailwind), Inter font via Google Fonts
- **Icons:** lucide-react for UI icons, cdn.simpleicons.org for brand logos (whatsapp, instagram, etc.)
- **CSS Utilities:** .text-gradient, .bg-glass, .card-hover, .glow-brand, .nav-dropdown in tailwind.css
- **Pages:** src/pages/{HomePage, FeaturesPage, PricingPage, IndustryPage}.tsx
- **Navbar Dropdowns:** ProductDropdown, IndustriesDropdown, ResourcesDropdown (hover-activated, click-outside closes)
- **Alias:** @/* maps to src/* (configured in vite.config.ts + tsconfig)
- **Key pattern:** Section files are self-contained (no sub-components), all data inline
- **Brand logos:** Use `https://cdn.simpleicons.org/{name}/{hexcolor}` pattern
- **Tailwind config:** has `brand` color scale (50–900), custom animations fade-in, slide-down, pulse-slow
</coder>
