# Smart Academy Frontend Technical QA (Ownership Verification)

This document contains 60 comprehensive, codebase-specific questions and answers designed to verify ownership, technical understanding, and design workflows of the Smart Academy frontend application.

---

## Section 1: Entry Points, Routing, and Workspace Configuration

### 1. What is the entry point of the React application, and how does it bootstrap the DOM?

The application is bootstrapped in [src/main.tsx](file:///c:/Users/rohit/Downloads/kindergarden_school/src/main.tsx). It imports `StrictMode` from `react` and `createRoot` from `react-dom/client`, linking the React virtual DOM tree directly to the browser DOM by querying the `#root` element container.

```tsx
// src/main.tsx:L6-L10
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 2. How is the HTML page structured to load the main React bundle, and where is the mounting root defined?

The HTML layout is defined in [index.html](file:///c:/Users/rohit/Downloads/kindergarden_school/index.html). It includes a viewport meta tag for mobile responsiveness and sets the target container `<div id="root"></div>`. The Javascript bundle is loaded using a module script pointing directly to the entry point:

```html
<!-- index.html -->
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

### 3. Which build tool and bundler are used in this project, and where is the dev server configured?

The project uses **Vite** as its bundler and development build tool, configured in [vite.config.ts](file:///c:/Users/rohit/Downloads/kindergarden_school/vite.config.ts). The configuration sets up the React compiler plugin `@vitejs/plugin-react` and Tailwind CSS integration `@tailwindcss/vite` within the plugins array:

```ts
// vite.config.ts:L15-L16
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ...
})
```

### 4. How does the application implement view routing without a traditional router package like `react-router-dom`?

The application uses state-based conditional rendering managed by a global Zustand store. In [src/App.tsx](file:///c:/Users/rohit/Downloads/kindergarden_school/src/App.tsx), the `view` property determines what to render in the main content area:

```tsx
// src/App.tsx:L24-L38
<main className="flex-grow">
  {view === 'showcase' && <Showcase />}
  {view === 'terms' && <Terms />}
  {view === 'home' && (
    <>
      <Hero />
      <Welcome />
      {/* ... */}
    </>
  )}
</main>
```

### 5. What TypeScript configuration files control compilation rules for the web application vs the node build context?

TypeScript compilation rules are split into three files:

- [tsconfig.json](file:///c:/Users/rohit/Downloads/kindergarden_school/tsconfig.json): References specific build configurations.
- [tsconfig.app.json](file:///c:/Users/rohit/Downloads/kindergarden_school/tsconfig.app.json): Governs compilation in the application context (`src/**/*.ts`, `src/**/*.tsx`), setting targets like `ES2022` and bundler resolution.
- [tsconfig.node.json](file:///c:/Users/rohit/Downloads/kindergarden_school/tsconfig.node.json): Controls Vite config file compilation context (`vite.config.ts`) using Node module resolution.

### 6. Where is the storybook documentation configuration located, and how does it resolve story locations?

The Storybook settings are located in [.storybook/main.ts](file:///c:/Users/rohit/Downloads/kindergarden_school/.storybook/main.ts). It exports a [StorybookConfig](file:///c:/Users/rohit/Downloads/kindergarden_school/.storybook/main.ts#L1) object defining search patterns for story files:

```ts
// .storybook/main.ts:L4
stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
```

It utilizes `@storybook/react-vite` as the framework to compile story bundles efficiently.

### 7. How are stylesheets or global styles injected into Storybook previews?

Global styles (Tailwind configuration, fonts, keyframes) are imported directly at the top of [.storybook/preview.tsx](file:///c:/Users/rohit/Downloads/kindergarden_school/.storybook/preview.tsx):

```ts
// .storybook/preview.tsx:L2
import '../src/index.css'
```

This guarantees that all rendered component stories represent the exact visual styles of the active website.

### 8. What ESLint configurations are set up to support React hooks and Storybook rules?

Lint rules are declared in the flat configuration layout in [eslint.config.js](file:///c:/Users/rohit/Downloads/kindergarden_school/eslint.config.js). It integrates:

- `eslint-plugin-react-hooks` (`reactHooks.configs.recommended`) for hook verification.
- `eslint-plugin-storybook` (`storybook.configs['flat/recommended']`) to check story parameters.
- `eslint-plugin-prettier` to enforce stylistic formatting and throw syntax errors on violation.

---

## Section 2: Global State Management (Zustand)

### 9. Where is the global application state stored, and what state properties are initialized?

Global state is managed by a Zustand store in [src/store/useAppStore.ts](file:///c:/Users/rohit/Downloads/kindergarden_school/src/store/useAppStore.ts). The store initializes three properties:

```ts
// src/store/useAppStore.ts:L20-L22
isRegisterModalOpen: false,
isMobileMenuOpen: false,
view: 'home',
```

### 10. How is TypeScript used to define the type of views acceptable in the store state?

An [AppView](file:///c:/Users/rohit/Downloads/kindergarden_school/src/store/useAppStore.ts#L3) union type restricts the acceptable states:

```ts
// src/store/useAppStore.ts:L3
export type AppView = 'home' | 'showcase' | 'terms'
```

This is mapped to the `AppState` interface to guarantee complete compile-time validation when calling [setView](file:///c:/Users/rohit/Downloads/kindergarden_school/src/store/useAppStore.ts#L16).

### 11. What action functions does the Zustand store provide for modal controls, and how are they implemented?

The store provides [openRegisterModal](file:///c:/Users/rohit/Downloads/kindergarden_school/src/store/useAppStore.ts#L10) and [closeRegisterModal](file:///c:/Users/rohit/Downloads/kindergarden_school/src/store/useAppStore.ts#L11):

```ts
// src/store/useAppStore.ts:L24-L25
openRegisterModal: () => set({ isRegisterModalOpen: true }),
closeRegisterModal: () => set({ isRegisterModalOpen: false }),
```

These actions directly update the boolean variable that controls the conditional portal render of the [RegisterModal](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/RegisterModal.tsx).

### 12. How does the mobile drawer close automatically when a page navigation view change occurs?

In `useAppStore.ts`, the [setView](file:///c:/Users/rohit/Downloads/kindergarden_school/src/store/useAppStore.ts#L30) action is programmed to mutate both `view` and `isMobileMenuOpen` flags simultaneously:

```ts
// src/store/useAppStore.ts:L30
setView: (view) => set({ view, isMobileMenuOpen: false }),
```

This avoids leaving the mobile sidebar open when a user redirects to pages like the terms layout.

### 13. How are store selectors extracted in React components to avoid unnecessary re-renders?

Components query only the specific slice of state they require rather than de-structuring the entire store. For example, in [src/App.tsx](file:///c:/Users/rohit/Downloads/kindergarden_school/src/App.tsx):

```tsx
// src/App.tsx:L16
const { view } = useAppStore()
```

This isolates component updates, triggering re-renders only when `view` changes, ignoring shifts in modal or menu flags.

### 14. Which component triggers the mobile menu opening action, and where is the toggle handled?

The [Navbar](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/Navbar.tsx) component handles the toggle on mobile breakpoints. It registers the click handler on a burger button that executes [openMobileMenu](file:///c:/Users/rohit/Downloads/kindergarden_school/src/store/useAppStore.ts#L27):

```tsx
// src/components/Navbar.tsx:L93-L99
<button
  onClick={openMobileMenu}
  className="p-2 rounded-xl hover:bg-slate-100 text-brand-dark cursor-pointer"
  aria-label="Open menu"
>
  <Menu className="w-6 h-6" />
</button>
```

### 15. Is there middleware or persistence configured in the Zustand store?

No. The store is created using standard `create` without middleware like `persist` or `devtools` to keep state transitions quick and memory footprint light:

```ts
// src/store/useAppStore.ts:L19
export const useAppStore = create<AppState>((set) => ({ ... }))
```

This is suitable since navigation routes and modal visibility do not need to persist across page reloads.

---

## Section 3: React Three Fiber & Three.js 3D Visual Experience

### 16. Which component is responsible for loading the 3D visual workspace on desktop viewports?

The 3D visualization scene is hosted within the [Hero](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/Hero.tsx) component under `src/components/Hero.tsx`.

### 17. How is the React Three Fiber Canvas element structured inside the Hero component?

The 3D Scene viewport is established using the `@react-three/fiber` `<Canvas>` wrapper inside [Hero.tsx](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/Hero.tsx):

```tsx
// src/components/Hero.tsx:L260-L273
<Canvas
  camera={{ position: [0, 0, 4.5], fov: 45 }}
  className="w-full h-full"
  gl={{ antialias: true }}
>
  <ambientLight intensity={0.9} />
  <directionalLight position={[5, 10, 5]} intensity={1.5} />
  <pointLight position={[-5, 5, -5]} intensity={0.5} />
  <Laptop3D scrollYProgress={scrollYProgress} />
</Canvas>
```

Key configurations include a defined perspective camera with a field-of-view of 45 degrees, manual antialiasing enabled, and multiple light meshes.

### 18. What Three.js types are referenced using refs in the Laptop3D component, and what is their purpose?

The [Laptop3D](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/Hero.tsx#L10) component holds refs to control the geometry transformations:

```ts
// src/components/Hero.tsx:L11-L12
const laptopGroupRef = useRef<THREE.Group>(null)
const lidRef = useRef<THREE.Group>(null)
```

- `laptopGroupRef`: Manipulates the translation, rotation, and base scaling of the entire laptop model.
- `lidRef`: Pivots the screen enclosure hinge relative to the base keyboard layout.

### 19. How does the application animate the laptop lid closing using page scroll progress?

The component utilizes Framer Motion's [useScroll](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/Hero.tsx#L167) hook. The resulting `scrollYProgress` (a value between `0` and `1`) is passed to `<Laptop3D />` and queried inside `@react-three/fiber`'s `useFrame` loop:

```ts
// src/components/Hero.tsx:L15-L24
useFrame(() => {
  if (!scrollYProgress) return
  const progress = scrollYProgress.get()

  // Lid rotation (X-axis): Starts open (-0.2 rad) at scroll 0,
  // and closes to fully flat (-Math.PI / 2 rad) at scroll 1.
  const lidAngle = -0.2 - progress * (Math.PI / 2 - 0.2)
  if (lidRef.current) {
    lidRef.current.rotation.x = lidAngle
  }
  // ...
})
```

### 20. How is the constant forward tilt and professional base angle of the laptop configured in the frame tick?

The laptop base is rotated slightly on the X-axis during each frame tick to display 3D depth. The values are hardcoded inside the `useFrame` handler to bypass layout drift:

```ts
// src/components/Hero.tsx:L28-L31
if (laptopGroupRef.current) {
  laptopGroupRef.current.rotation.x = 0.28 // Constant professional base tilt
  laptopGroupRef.current.rotation.y = 0 // Perfectly straight
  laptopGroupRef.current.rotation.z = 0 // Perfectly level
  // ...
}
```

### 21. What scale and initial height properties are applied to the laptop model group?

The laptop group scale is locked at `1.25` times, and its horizontal center aligns at a relative height offset of `-0.6` units:

```ts
// src/components/Hero.tsx:L33-L35
const scale = 1.25
laptopGroupRef.current.scale.set(scale, scale, scale)
laptopGroupRef.current.position.y = -0.6
```

### 22. How is the HTML dashboard screen embedded inside the WebGL 3D canvas object?

It uses the `<Html>` component from `@react-three/drei`. The element uses the `transform` attribute to translate HTML coordinates into WebGL space, mapping the pixel screen to the laptop lid mesh coordinates:

```tsx
// src/components/Hero.tsx:L88-L96
<Html
  transform
  distanceFactor={1.48}
  position={[0, 1.1, 0.035]}
  className="w-[800px] h-[500px] bg-slate-950 rounded-sm overflow-hidden select-text pointer-events-auto"
  style={{
    backfaceVisibility: 'hidden',
  }}
>
```

### 23. What lighting configurations provide studio-like brightness around the laptop object?

The light system is set up directly under the Canvas in `Hero.tsx`:

- `ambientLight` with `intensity={0.9}`: Provides uniform background ambient lighting to avoid deep dark areas.
- `directionalLight` positioned at `[5, 10, 5]` with `intensity={1.5}`: Mimics studio key light throwing sharp depth highlighting.
- `pointLight` positioned at `[-5, 5, -5]` with `intensity={0.5}`: Serves as fill light.

### 24. What materials and textures are configured on the keyboard base to simulate metal/plastic?

The 3D chassis uses standard mesh geometries configured with standard lighting material attributes:

```tsx
// src/components/Hero.tsx:L57-L60
<mesh>
  <boxGeometry args={[3.4, 0.08, 2.2]} />
  <meshStandardMaterial color="#b0b3b8" roughness={0.3} metalness={0.7} />
</mesh>
```

`metalness={0.7}` makes the body look aluminum, while `roughness={0.3}` adds a smooth metallic sheen. The keyboard recess uses `#1e293b` with high roughness to mimic matte keycap plastic.

### 25. How is the hinge bar structured inside the scene?

The hinge is modelled as a cylinder geometry, scaled and rotated ninety degrees to sit on the back axis of the keyboard:

```tsx
// src/components/Hero.tsx:L49-L52
<mesh position={[0, 0, -1.1]} rotation={[0, 0, Math.PI / 2]}>
  <cylinderGeometry args={[0.04, 0.04, 3.2, 16]} />
  <meshStandardMaterial color="#4a4d51" roughness={0.4} metalness={0.6} />
</mesh>
```

---

## Section 4: Responsive Visual Architecture (3D vs 2D Fallback)

### 26. Why does the application render a static 2D hero section instead of the 3D canvas on mobile layouts?

Mobile devices often suffer from limited GPU memory and CPU overhead. Loading high-polygon 3D calculations, running web shaders, and rendering absolute HTML frames through `<Html transform>` can cause frames-per-second drops and heat up devices. To address this, a mobile fallback is used.

### 27. How does the Hero component dynamically check screen sizes to determine which viewport layout to render?

A resize event listener is registered inside a `useEffect` hook inside the `Hero` component:

```ts
// src/components/Hero.tsx:L150-L157
useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768)
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
  return () => window.removeEventListener('resize', checkMobile)
}, [])
```

If `isMobile` is set to `true`, the layout bypasses WebGL rendering entirely and serves the 2D layout.

### 28. What styling elements are added in the mobile viewport fallback to preserve the branding?

The mobile fallback uses the same high-resolution Unsplash classroom photo as the laptop desktop screen, layered beneath a dark backdrop to keep text readable:

```tsx
// src/components/Hero.tsx:L180-L188
<div className="absolute inset-0 z-0">
  <img
    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600"
    alt="Classroom"
    className="w-full h-full object-cover"
    decoding="async"
  />
  <div className="absolute inset-0 bg-slate-950/65 backdrop-brightness-75" />
</div>
```

### 29. How are the interactive registration links wired into the laptop screen on desktop vs the mobile layout?

Both layouts call [openRegisterModal](file:///c:/Users/rohit/Downloads/kindergarden_school/src/store/useAppStore.ts#L10) from the Zustand store.

- Mobile: Wired to the flat screen button block.
- Desktop: Embedded inside the `<Html>` content container.

### 30. How is layout locking implemented to make the 3D scroll animation work on desktop?

Desktop viewport scrolling uses standard scroll progress but locks the screen relative layout to force users to watch the transition. In [src/components/Hero.tsx](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/Hero.tsx):

```tsx
// src/components/Hero.tsx:L250-L253
<div ref={containerRef} className="relative h-[200vh] bg-white select-none">
  {/* Sticky container to lock viewport */}
  <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
```

The container has a height of `200vh`, while the sticky wrapper captures `h-screen`, capturing the viewport and closing the laptop screen over the scroll duration.

---

## Section 5: Design Tokens & Tailwind CSS v4 Configuration

### 31. What version of Tailwind CSS does the project use, and how are files import-configured?

The project uses **Tailwind CSS v4**, configured in [src/index.css](file:///c:/Users/rohit/Downloads/kindergarden_school/src/index.css) using CSS imports:

```css
/* src/index.css:L2 */
@import 'tailwindcss';
```

### 32. Where are theme tokens (like primary/secondary colors and custom fonts) declared?

Theme properties are declared directly inside the `@theme` rule block in [src/index.css](file:///c:/Users/rohit/Downloads/kindergarden_school/src/index.css):

```css
/* src/index.css:L4-L14 */
@theme {
  --color-brand-pink: #ff2a74;
  --color-brand-pink-hover: #e01b5c;
  --color-brand-blue: #0082d4;
  --color-brand-blue-hover: #006bb0;
  --color-brand-dark: #0f172a;
  --color-brand-light: #f8fafc;

  --font-sans: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

### 33. What Google web fonts are imported, and how are they assigned to the layout?

The project loads **Inter** and **Outfit** font families:

```css
/* src/index.css:L1 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
```

- `--font-sans`: Uses 'Outfit' for headings and structural items.
- `--font-body`: Uses 'Inter' for paragraph descriptions.

### 34. How are color variables rendered in CSS class properties within components?

Tailwind v4 maps theme variables dynamically. For example, `--color-brand-pink` maps directly to utility class `bg-brand-pink` or `text-brand-pink`. For instance, in [src/components/Showcase.tsx](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/Showcase.tsx):

```tsx
// src/components/Showcase.tsx:L37
<div className="bg-brand-pink text-white p-6 rounded-2xl shadow-sm">
```

### 35. Explain how the background light glow spots are styled in the Hero container.

Large decorative background gradients create a subtle ambient studio glow on desktop viewports:

```tsx
// src/components/Hero.tsx:L255-L256
<div className="absolute top-[10%] left-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-brand-pink/[0.03] blur-[100px] pointer-events-none" />
<div className="absolute bottom-[10%] right-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-brand-blue/[0.03] blur-[100px] pointer-events-none" />
```

By combining fractional color transparency (`bg-brand-pink/[0.03]`) with extreme blur filters (`blur-[100px]`), the glows remain subtle without interfering with key layout elements.

### 36. What styling trick creates the arched image mask container inside the Welcome component?

The arched border styling uses a custom CSS layout class defined in [src/index.css](file:///c:/Users/rohit/Downloads/kindergarden_school/src/index.css):

```css
/* src/index.css:L34-L36 */
.arch-clip {
  border-radius: 9999px 9999px 0 0;
}
```

This is applied to the image wrapper in [src/components/Welcome.tsx](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/Welcome.tsx) to mask the layout into a rounded archway:

```tsx
// src/components/Welcome.tsx:L36
<div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[420px] arch-clip bg-brand-pink p-1.5 shadow-lg">
```

---

## Section 6: UI Component Library (Button, Card, Modal)

### 37. How are variant and size props configured in the reusable Button component?

The component accepts dynamic type keys mapped to style lookups in [src/components/ui/Button.tsx](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/ui/Button.tsx):

```ts
// src/components/ui/Button.tsx:L34-L46
const variants = {
  pink: 'bg-brand-pink text-white hover:bg-brand-pink-hover focus:ring-brand-pink',
  blue: 'bg-brand-blue text-white hover:bg-brand-blue-hover focus:ring-brand-blue',
  outline:
    'border-2 border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white focus:ring-brand-pink',
  text: 'text-brand-pink hover:bg-brand-pink/10 focus:ring-brand-pink',
}

const sizes = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
}
```

### 38. How are custom styles merged dynamically inside the Button component?

It uses `clsx` combined with `tailwind-merge` to resolve styling overrides:

```ts
// src/components/ui/Button.tsx:L54
className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
```

This guarantees that overrides passed in via `className` take precedence over default styles without duplication or layout glitches.

### 39. How is the Button component forward-referenced, and how does it support Framer Motion gestures?

The [Button](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/ui/Button.tsx) component uses `React.forwardRef` to pass DOM references. It extends `ComponentPropsWithoutRef<typeof motion.button>` to enable animations:

```tsx
// src/components/ui/Button.tsx:L49-L52
<motion.button
  ref={ref}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  // ...
```

### 40. Describe the three Card variant layouts managed inside the Card component.

The [Card](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/ui/Card.tsx) component supports:

- `service`: Centered design containing a rounded icon wrapper, custom background color, bold header, and text:
  ```tsx
  // src/components/ui/Card.tsx:L50-L55
  <div className={clsx('flex items-center justify-center w-14 h-14 rounded-2xl mb-5 text-white',
    iconBg === 'pink' ? 'bg-brand-pink' : 'bg-brand-blue',
  )}>
  ```
- `course`: Features an image container with a hover-zoom effect and a centered course title.
- `testimonial`: Left-aligned layout with a profile avatar, name, and star rating system.

### 41. How are lazy loading and decoding optimization parameters applied to image components?

To improve page load speeds, images use `loading="lazy"` and `decoding="async"` attributes:

```tsx
// src/components/ui/Card.tsx:L78-L79
className = 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
loading = 'lazy'
decoding = 'async'
```

This delays offscreen image loading and prevents main-thread rendering blocks during image decoding.

### 42. How does the Modal component handle browser window mounting isolation?

It uses `createPortal` to render the modal wrapper directly under `document.body`, avoiding z-index clipping issues from parent layouts:

```ts
// src/components/ui/Modal.tsx:L105
return createPortal(modalContent, document.body)
```

---

## Section 7: Form Architecture, Validation, & Zod Integration

### 43. Where is the validation schema for the registration modal defined, and what types of inputs does it validate?

The registration form schema is configured in [src/components/RegisterModal.tsx](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/RegisterModal.tsx) using the Zod validation library. It validates:

- `parentName` and `childName`: Minimum 2 characters.
- `email`: Valid email syntax.
- `phone`: Regular expression validating E.164 phone formats.
- `childAge`: Numeric constraints (must be between 2 and 18).
- `course`: Selected course string presence.

### 44. How does the age validation logic prevent invalid entries?

The schema uses chaining refinements to enforce numeric ranges:

```ts
// src/components/RegisterModal.tsx:L19-L23
childAge: z
  .number()
  .refine((val) => !isNaN(val), { message: 'Age is required' })
  .refine((val) => val >= 2, { message: 'Age must be at least 2' })
  .refine((val) => val <= 18, { message: 'Age must be 18 or under' }),
```

### 45. What regular expression patterns check phone number structures?

Phone verification uses a regex pattern to match international dialing formats:

```ts
// src/components/RegisterModal.tsx:L16-L18
phone: z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number (e.g., +1234567890)'),
```

This pattern allows optional leading `+` signs followed by up to 15 digits.

### 46. How is React Hook Form integrated with the Zod schema configuration?

It links the schema using the `@hookform/resolvers/zod` bridge:

```ts
// src/components/RegisterModal.tsx:L41-L51
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<RegisterFormValues>({
  resolver: zodResolver(registerSchema),
  defaultValues: {
    // ...
  },
})
```

### 47. Explain how the subscription schema works in the footer banner.

The [CtaBanner](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/CtaBanner.tsx) uses a simplified single-input schema:

```ts
// src/components/CtaBanner.tsx:L8-L10
const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})
```

This isolates validation to email checks without modal form overhead.

### 48. What visual states are updated when submitting the registration form?

During form submission, `loading` is set to true to display a spinner on the submit button. On success, `isSubmitted` switches to true to render the success state:

```tsx
// src/components/RegisterModal.tsx:L53-L60
const onSubmit = async (data: RegisterFormValues) => {
  setLoading(true)
  await new Promise((resolve) => setTimeout(resolve, 1500))
  setLoading(false)
  setIsSubmitted(true)
}
```

### 49. How are form states cleaned up when closing the modal?

To prevent stale validation errors from showing on next open, form values are reset after a short delay:

```ts
// src/components/RegisterModal.tsx:L62-L69
const handleClose = () => {
  closeRegisterModal()
  setTimeout(() => {
    setIsSubmitted(false)
    reset()
  }, 300)
}
```

---

## Section 8: CSS Animations and Layouts

### 50. How are the testimonial infinite scrolling loops implemented?

Testimonial rows slide continuously using custom marquee keyframe animations defined in `index.css`:

```css
/* src/index.css:L49-L65 */
@keyframes marquee-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
@keyframes marquee-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
```

Row items are duplicated to create a continuous seamless loop:

```ts
// src/components/Testimonials.tsx:L59-L60
const dblRow1 = [...row1Testimonials, ...row1Testimonials, ...row1Testimonials, ...row1Testimonials]
```

### 51. How does the testimonials marquee pause when hovered?

The scrolling containers apply the custom `.pause-hover` utility class:

```css
/* src/index.css:L79-L81 */
.pause-hover:hover {
  animation-play-state: paused;
}
```

This temporarily pauses the keyframe transition while a user hovers over a card, allowing them to read the review.

### 52. What overlay layouts prevent hard cutoffs at the margins of the scrolling testimonials container?

The carousel container uses absolute overlay gradients to fade the edges:

```tsx
// src/components/Testimonials.tsx:L75-L77
<div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
<div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
```

This softens visual edges by transitioning from solid slate background to transparent.

### 53. How is the default scrollbar hidden for clean layouts?

Scrollbars are hidden using custom utility configurations:

```css
/* src/index.css:L38-L47 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

### 54. What styling parameters customize the active page bullets for Swiper carousels?

The active Swiper pagination bullet color is customized to match the brand color:

```css
/* src/index.css:L29-L31 */
.swiper-pagination-bullet-active {
  background: var(--color-brand-pink) !important;
}
```

---

## Section 9: DOM, Window, & Accessibility (a11y) Integrations

### 55. What accessibility features are implemented in the Modal component?

The `Modal` component includes several access features:

- Backdrop click detection to exit the modal.
- Key listener looking for the `Escape` key.
- Custom `aria-label` tags for screen reader accessibility:
  ```tsx
  // src/components/ui/Modal.tsx:L87-L93
  <button
    onClick={onClose}
    className="..."
    aria-label="Close modal"
  >
  ```

### 56. How does the Modal component prevent background scrollbar layout shift?

When the modal opens, the document body overflow is hidden to lock scrolling. To prevent layout shift from the disappearing scrollbar, the scrollbar width is calculated and applied as padding:

```ts
// src/components/ui/Modal.tsx:L30-L36
if (isOpen) {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
  window.addEventListener('keydown', handleEscape)
}
```

### 57. How does the cleanup function revert overflow configurations when the modal closes?

The `useEffect` hook returns a cleanup function that resets the inline layout styles:

```ts
// src/components/ui/Modal.tsx:L38-L42
return () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  window.removeEventListener('keydown', handleEscape)
}
```

### 58. How is smooth scrolling implemented in the navigation system?

To scroll smoothly to page anchors on navigation clicks:

```ts
// src/components/Navbar.tsx:L17-L26
const handleLinkClick = (href: string) => {
  closeMobileMenu()
  setView('home')
  setTimeout(() => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, 50)
}
```

This ensures view resets occur before query executions run, preventing issues with missing target elements.

### 59. How does the scroll system navigate sections when headers are fixed?

Scrolling to content under sticky navigation headers requires offsetting scroll coordinates. The terms layout implements a custom viewport scroll calculation:

```ts
// src/components/Terms.tsx:L27-L36
const offset = 100 // offset for fixed header
const bodyRect = document.body.getBoundingClientRect().top
const elementRect = element.getBoundingClientRect().top
const elementPosition = elementRect - bodyRect
const offsetPosition = elementPosition - offset

window.scrollTo({
  top: offsetPosition,
  behavior: 'smooth',
})
```

---

## Section 10: Testing, Quality Assurance, & Stories

### 60. How are component testing workflows designed using Vitest and Storybook?

Tests are configured using the `@storybook/addon-vitest` plugin inside [vite.config.ts](file:///c:/Users/rohit/Downloads/kindergarden_school/vite.config.ts). Storybook stories serve as the test definitions, which are executed in a headless browser env managed by Playwright:

```ts
// vite.config.ts:L24-L39
storybookTest({
  configDir: path.join(dirname, '.storybook'),
}),
// ...
test: {
  name: 'storybook',
  browser: {
    enabled: true,
    headless: true,
    provider: playwright({}),
    instances: [
      {
        browser: 'chromium',
      },
    ],
  },
}
```

This environment runs automated validation tests across stories (such as [Button.stories.tsx](file:///c:/Users/rohit/Downloads/kindergarden_school/src/components/ui/Button.stories.tsx)) in a real browser context.
