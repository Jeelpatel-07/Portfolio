import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import Home from './pages/Home'

// Lazy-loaded pages (Practical 8)
const Projects = lazy(() => import('./pages/Projects'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const TasksPage = lazy(() => import('./pages/TasksPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

// PageLoader component for Suspense fallback
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  )
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const location = useLocation()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <ParticleBackground />
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer 
        email="jeelpatel4428@gmail.com"
        github="https://github.com/Jeelpatel-07"
        linkedin="https://www.linkedin.com/in/jeel-parsaniya"
      />
    </div>
  )
}

export default App