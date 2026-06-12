import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Welcome } from './components/Welcome'
import { Services } from './components/Services'
import { FeaturedCourses } from './components/FeaturedCourses'
import { Testimonials } from './components/Testimonials'
import { Articles } from './components/Articles'
import { CtaBanner } from './components/CtaBanner'
import { Footer } from './components/Footer'
import { RegisterModal } from './components/RegisterModal'
import { Showcase } from './components/Showcase'
import { Terms } from './components/Terms'
import { useAppStore } from './store/useAppStore'

function App() {
  const { view } = useAppStore()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Universal Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {view === 'showcase' && <Showcase />}
        {view === 'terms' && <Terms />}
        {view === 'home' && (
          <>
            <Hero />
            <Welcome />
            <Services />
            <FeaturedCourses />
            <Testimonials />
            <Articles />
            <CtaBanner />
          </>
        )}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Modals & Portal Overlays */}
      <RegisterModal />
    </div>
  )
}

export default App
