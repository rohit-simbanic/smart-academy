# Smart Academy - Kids Education & Kindergarten Platform

Smart Academy is a modern, high-performance, and visually stunning web platform designed for children's education, kindergarten classes, and learning centers. The UI design translates high-fidelity design tokens into a pixel-perfect, fully responsive React interface.

**Design Reference:** [Figma Design File](https://www.figma.com/design/5VO9eqmfkTbdTG6c2rcGkr/SmartAcademy-Kids-Education-Kindergarten--Community-?node-id=901-8&t=iS10KUr97meSxpsL-0)

---

## 🚀 Tech Stack

The application is built on top of a highly optimized, modern React stack:

- **Core Framework:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tooling:** [Vite 8](https://vite.dev/) (Native ESM loader, Rollup-based tree-shaking, and minification)
- **Styling Engine:** [Tailwind CSS v4](https://tailwindcss.com/) (Next-generation CSS compiler with zero-runtime utility compilation)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (Ultra-lightweight, selector-based state container)
- **Animation Engine:** [Framer Motion](https://www.framer.com/motion/) (Declarative spring physics and GPU-accelerated layout transitions)
- **Form Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) (Type-safe client-side schema enforcement)
- **Development & Testing:** [Storybook 10](https://storybook.js.org/), [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/)

---

## ✨ Key Features

1.  **Pixel-Perfect Design System:** A custom-tailored theme including brand colors, professional typography hierarchy (Outfit + Inter), premium buttons, modular cards, and custom components showcase page.
2.  **Smooth Interactive Elements:** Smooth scrolling page anchor links, hover scales, sticky headers with dynamic blurs, and animated mobile drawers.
3.  **macOS Spring-Pop Modal:** Accessible form overlays that pop open with custom spring properties matching Apple's native alert physics.
4.  **Continuous Infinite Marquees:** Smooth-sliding horizontal testimonials moving left and right continuously, with pause-on-hover capabilities.
5.  **Type-Safe Course Enrollment:** Comprehensive client-side validation for children's course enrollment using a strict Zod validator schema.

---

## ⚡ Performance Techniques

We have implemented several professional optimization patterns to keep the application running at a solid **60+ FPS** during viewport scrolling:

- **GPU Layer Promotion (Hardware Acceleration):** Continuous testimonial marquee tracks are promoted to separate compositing layers in CSS using `will-change: transform` and `transform: translate3d(0,0,0)`. This bypasses layout repaints and handles animations on the GPU.
- **Sticky Header Paint Isolation:** The sticky backdrop-blur navbar is isolated to its own composited layer (`[transform:translate3d(0,0,0)]`) to prevent expensive re-blurs and layout repaints of scrolling page elements passing underneath it.
- **Async Image Decoding:** Non-critical images below the fold use `decoding="async"`, allowing the browser to parse image data off the main thread and prevent scrolling frames from dropping (jank).
- **Viewport-Aware Lazy Loading:** Images below the fold use native browser `loading="lazy"` to delay network bandwidth consumption until they approach the user's viewport.
- **Layout Shift Prevention:** Opening a modal toggles `overflow: hidden` on the body, which typically causes page layout content to shift to the right when the scrollbar disappears. We dynamically measure the browser's scrollbar gutter width on modal mount and compensate with `padding-right` to ensure zero layout shift.

---

## 🛠️ Installation & Local Setup

### Prerequisites

- Node.js (v18.x or v20.x recommended)
- npm (v9.x+)

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/rohit-simbanic/smart-academy.git
    cd smart-academy
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Start Development Server:**
    ```bash
    npm run dev
    ```
4.  **Build and Preview Production Bundle:**
    ```bash
    npm run build
    npm run preview
    ```

---

## 🔒 Security Considerations

- **Schema Enforcement:** Input values on all forms are strictly parsed and validated against type-safe Zod schemas. Invalid payloads are rejected instantly on the client, mitigating injection patterns.
- **Referrer Protection:** All external links pointing to third-party domains (e.g., social links) use `rel="noopener noreferrer"` to prevent Tabnabbing vulnerabilities and protect referrer headers.
- **Zero Hardcoded Identifiers:** Deploy configurations do not store private org keys or build metadata in the public git tree. Identifiers are extracted to GitHub repository secrets.
- **Strict State Mutability:** Store state updates in Zustand are performed immutably to prevent side-effects and cross-component reactivity leaks.

---

## 📦 CI/CD Deployment Pipeline

This repository is integrated with a continuous deployment (CD) pipeline targeting **Vercel** via **GitHub Actions**:

### Workflow Configuration

When you push commits to the `main` branch, the workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) triggers:

1.  Loads Node.js environment on Ubuntu container.
2.  Clones and installs dependencies.
3.  Pulls the linked environment configuration.
4.  Builds the production assets.
5.  Deploys the prebuilt outputs directly to Vercel production servers.

### Integration Configuration

Ensure the following secrets are added to your GitHub repository under **Settings -> Secrets and variables -> Actions**:

| Secret Name            | Description                  | Value Example                      |
| :--------------------- | :--------------------------- | :--------------------------------- |
| `VERCEL_TOKEN_ACADEMY` | Vercel Personal Access Token | `lpGvSdfa...`                      |
| `VERCEL_ORG_ID`        | Vercel Team/User identifier  | `team_Ly4wzs3chr8RR7dgZ4kWjQvN`    |
| `VERCEL_PROJECT_ID`    | Vercel Project identifier    | `prj_qdsDGavXNVEjbpFY7AK8spCRSRGv` |
