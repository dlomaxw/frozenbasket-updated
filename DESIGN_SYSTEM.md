# Frozen Basket Design System Documentation

## Brand Overview

Frozen Basket is a handcrafted ice cream delivery service based in Kampala, Uganda. The design system reflects a warm, inviting, and playful aesthetic while maintaining professionalism.

---

## Color Palette

### Brand Colors

| Color Name    | Hex Code  | OKLCH Value                | Usage                                      |
|---------------|-----------|----------------------------|--------------------------------------------|
| Cream         | `#fff8f0` | oklch(0.98 0.015 85)       | Primary background, cards, warm base       |
| Brand Blue    | `#2b6f9e` | oklch(0.52 0.12 240)       | Primary accent, headings, CTAs, links      |
| Brand Peach   | `#ffb47a` | oklch(0.82 0.13 60)        | Secondary accent, buttons, highlights      |
| Brand Lilac   | `#c8a2d0` | oklch(0.75 0.1 310)        | Decorative elements, soft accents          |
| Brand Cocoa   | `#3d2c29` | oklch(0.28 0.04 40)        | Text, dark elements, chocolate theme       |

### Tailwind Usage

\`\`\`css
/* In Tailwind classes */
bg-cream        /* Background cream color */
text-brandBlue  /* Blue text */
bg-brandPeach   /* Peach background */
text-brandLilac /* Lilac text */
bg-brandCocoa   /* Cocoa/chocolate background */
\`\`\`

### Semantic Colors (Light Mode)

| Token                    | OKLCH Value              | Hex Equivalent | Usage                        |
|--------------------------|--------------------------|----------------|------------------------------|
| `--background`           | oklch(1 0 0)             | `#ffffff`      | Page background              |
| `--foreground`           | oklch(0.145 0 0)         | `#1a1a1a`      | Primary text                 |
| `--primary`              | oklch(0.205 0 0)         | `#2a2a2a`      | Primary buttons, links       |
| `--primary-foreground`   | oklch(0.985 0 0)         | `#fcfcfc`      | Text on primary              |
| `--secondary`            | oklch(0.97 0 0)          | `#f7f7f7`      | Secondary backgrounds        |
| `--secondary-foreground` | oklch(0.205 0 0)         | `#2a2a2a`      | Text on secondary            |
| `--muted`                | oklch(0.97 0 0)          | `#f7f7f7`      | Muted backgrounds            |
| `--muted-foreground`     | oklch(0.556 0 0)         | `#7a7a7a`      | Muted/subtle text            |
| `--accent`               | oklch(0.97 0 0)          | `#f7f7f7`      | Accent backgrounds           |
| `--accent-foreground`    | oklch(0.205 0 0)         | `#2a2a2a`      | Text on accent               |
| `--destructive`          | oklch(0.577 0.245 27.3)  | `#dc2626`      | Error states, delete buttons |
| `--border`               | oklch(0.922 0 0)         | `#e5e5e5`      | Borders, dividers            |
| `--input`                | oklch(0.922 0 0)         | `#e5e5e5`      | Input borders                |
| `--ring`                 | oklch(0.708 0 0)         | `#a3a3a3`      | Focus rings                  |

### State Colors

| Token                  | OKLCH Value           | Usage                      |
|------------------------|-----------------------|----------------------------|
| `--success`            | oklch(0.6 0.16 145)   | Success messages, badges   |
| `--success-foreground` | oklch(0.98 0 0)       | Text on success            |
| `--warning`            | oklch(0.75 0.15 85)   | Warning messages           |
| `--warning-foreground` | oklch(0.2 0 0)        | Text on warning            |
| `--info`               | oklch(0.55 0.2 250)   | Info messages              |
| `--info-foreground`    | oklch(0.98 0 0)       | Text on info               |

### Chart Colors

| Token       | OKLCH Value              | Usage           |
|-------------|--------------------------|-----------------|
| `--chart-1` | oklch(0.646 0.222 41.1)  | Chart primary   |
| `--chart-2` | oklch(0.6 0.118 184.7)   | Chart secondary |
| `--chart-3` | oklch(0.398 0.07 227.4)  | Chart tertiary  |
| `--chart-4` | oklch(0.828 0.189 84.4)  | Chart fourth    |
| `--chart-5` | oklch(0.769 0.188 70.1)  | Chart fifth     |

---

## Typography

### Font Families

| Font Name   | Variable       | Usage                              | Weights      |
|-------------|----------------|------------------------------------|--------------|
| Geist       | `--font-sans`  | Body text, UI elements, headings   | 400-700      |
| Geist Mono  | `--font-mono`  | Code, technical content            | 400-700      |
| Pacifico    | `--font-logo`  | Logo text, decorative headings     | 400          |

### Font Import (layout.tsx)

\`\`\`tsx
import { Geist, Geist_Mono, Pacifico } from "next/font/google"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-logo",
})
\`\`\`

### Tailwind Font Classes

\`\`\`css
font-sans    /* Geist - Default body font */
font-mono    /* Geist Mono - Code/technical */
font-logo    /* Pacifico - Logo/decorative (custom) */
\`\`\`

### Typography Scale (Tailwind)

| Class       | Size    | Usage                          |
|-------------|---------|--------------------------------|
| `text-xs`   | 12px    | Small labels, captions         |
| `text-sm`   | 14px    | Secondary text, form labels    |
| `text-base` | 16px    | Body text                      |
| `text-lg`   | 18px    | Large body, intro paragraphs   |
| `text-xl`   | 20px    | Small headings                 |
| `text-2xl`  | 24px    | Section headings               |
| `text-3xl`  | 30px    | Page titles                    |
| `text-4xl`  | 36px    | Large page titles              |
| `text-5xl`  | 48px    | Hero headings                  |
| `text-6xl`  | 60px    | Extra large headings           |

### Font Weights

| Class           | Weight | Usage                    |
|-----------------|--------|--------------------------|
| `font-normal`   | 400    | Body text                |
| `font-medium`   | 500    | Emphasis, labels         |
| `font-semibold` | 600    | Subheadings, buttons     |
| `font-bold`     | 700    | Headings, strong emphasis|

---

## Border Radius

| Token         | Value                      | Computed  | Usage                |
|---------------|----------------------------|-----------|----------------------|
| `--radius`    | 0.625rem                   | 10px      | Base radius          |
| `--radius-sm` | calc(var(--radius) - 4px)  | 6px       | Small elements       |
| `--radius-md` | calc(var(--radius) - 2px)  | 8px       | Medium elements      |
| `--radius-lg` | var(--radius)              | 10px      | Large elements       |
| `--radius-xl` | calc(var(--radius) + 4px)  | 14px      | Extra large elements |

---

## Custom Utilities

### Text Stroke (Logo Effect)

\`\`\`css
.text-stroke-blue {
  text-shadow: -1px -1px 0 #2b6f9e, 1px -1px 0 #2b6f9e, 
               -1px 1px 0 #2b6f9e, 1px 1px 0 #2b6f9e;
}

.text-stroke-sm-blue {
  text-shadow: -0.5px -0.5px 0 #2b6f9e, 0.5px -0.5px 0 #2b6f9e, 
               -0.5px 0.5px 0 #2b6f9e, 0.5px 0.5px 0 #2b6f9e;
}
\`\`\`

### Scrollbar Hide

\`\`\`css
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
\`\`\`

---

## Animations

### Float Animations

| Class                  | Duration | Description                      |
|------------------------|----------|----------------------------------|
| `.animate-float`       | 6s       | Vertical floating motion         |
| `.animate-float-delayed`| 8s      | Slower floating with offset      |
| `.animate-bounce-slow` | 3s       | Gentle bouncing effect           |

### UI Animations

| Class                  | Duration | Description                      |
|------------------------|----------|----------------------------------|
| `.animate-scale-in`    | 0.3s     | Scale from 0.9 to 1              |
| `.animate-slide-up`    | 0.4s     | Slide up with fade               |
| `.animate-fade-in`     | 0.5s     | Simple fade in                   |
| `.animate-pop-in`      | 0.4s     | Bouncy scale entrance            |
| `.animate-shake`       | 0.5s     | Horizontal shake (errors)        |
| `.animate-cart-bounce` | 0.6s     | Cart icon bounce                 |

### Text Animations

| Class                    | Duration | Description                    |
|--------------------------|----------|--------------------------------|
| `.animate-typewriter`    | 0.8s     | Typewriter reveal effect       |
| `.animate-fade-in-up`    | 0.6s     | Fade in while moving up        |
| `.animate-fade-in-scale` | 0.7s     | Fade in with scale             |
| `.animate-text-glow`     | 2s       | Glowing text effect (infinite) |

### Carousel Animations

| Class                    | Duration | Description                    |
|--------------------------|----------|--------------------------------|
| `.animate-carousel-slide`| 0.7s     | Slide in from right            |
| `.animate-carousel-zoom` | 0.7s     | Zoom from 1.1 to 1             |

### Mascot Animations

| Class                      | Duration | Description                   |
|----------------------------|----------|-------------------------------|
| `.animate-mascot-wave`     | 1s       | Waving rotation               |
| `.animate-mascot-bounce-in`| 0.8s     | Bouncy entrance               |
| `.animate-pulse-ring`      | 1.5s     | Expanding ring effect         |
| `.animate-sparkle`         | 1.5s     | Sparkle fade in/out           |
| `.animate-gradient`        | 3s       | Gradient background shift     |

### Animation Delays

| Class        | Delay  |
|--------------|--------|
| `.delay-75`  | 0.75s  |
| `.delay-100` | 0.1s   |
| `.delay-150` | 1.5s   |
| `.delay-200` | 0.2s   |
| `.delay-300` | 0.3s   |
| `.delay-400` | 0.4s   |
| `.delay-500` | 0.5s   |
| `.delay-600` | 0.6s   |

---

## Usage Examples

### Brand Header with Logo

\`\`\`tsx
<h1 className="font-logo text-4xl text-brandBlue text-stroke-blue">
  frozen basket
</h1>
\`\`\`

### Primary Button

\`\`\`tsx
<button className="bg-brandBlue text-white hover:bg-brandBlue/90 
                   rounded-lg px-6 py-3 font-semibold">
  Order Now
</button>
\`\`\`

### Secondary/Peach Button

\`\`\`tsx
<button className="bg-brandPeach text-brandCocoa hover:bg-brandPeach/90 
                   rounded-lg px-6 py-3 font-medium">
  Learn More
</button>
\`\`\`

### Card Component

\`\`\`tsx
<div className="bg-cream rounded-xl border border-border p-6 shadow-sm">
  <h3 className="text-xl font-semibold text-brandCocoa">Card Title</h3>
  <p className="text-muted-foreground">Card description text</p>
</div>
\`\`\`

### Animated Text Entry

\`\`\`tsx
<h1 className="animate-fade-in-up delay-100">Coming Soon</h1>
<p className="animate-fade-in-up delay-300 animate-text-glow">
  Handcrafted Ice Cream Delivered
</p>
\`\`\`

---

## File Locations

| File                     | Purpose                              |
|--------------------------|--------------------------------------|
| `app/globals.css`        | All CSS variables, animations, utils |
| `app/layout.tsx`         | Font imports and configuration       |
| `components/logo.tsx`    | Brand logo component                 |
| `tailwind.config.js`     | (Not needed - TailwindCSS v4 inline) |

---

## Dark Mode

The design system includes full dark mode support via the `.dark` class. All semantic color tokens have dark mode variants defined in `globals.css`. However, the current Frozen Basket implementation primarily uses light mode to maintain the warm, inviting ice cream shop aesthetic.

---

## Notes

1. **OKLCH Color Format**: This project uses OKLCH (Oklab Lightness Chroma Hue) for color definitions, which provides better perceptual uniformity and easier color manipulation.

2. **TailwindCSS v4**: Uses the new `@theme inline` directive instead of `tailwind.config.js` for configuration.

3. **Brand Consistency**: Always use brand colors (`brandBlue`, `brandPeach`, `cream`, `brandCocoa`) for customer-facing elements to maintain brand identity.

4. **Accessibility**: Ensure sufficient contrast ratios when pairing colors. Brand Blue (#2b6f9e) on Cream (#fff8f0) provides excellent readability.

---

*Last Updated: December 2025*
*Version: 1.0*
