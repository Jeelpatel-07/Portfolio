import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

function NavBar({ isDarkMode = false, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  // Build nav links dynamically based on auth state
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ]

  if (user) {
    navLinks.push({ path: '/tasks', label: 'Tasks' })
  }

  return (
    <motion.nav 
      className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="logo-link">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          JP
        </motion.div>
      </Link>

      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={location.pathname === link.path ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        {/* Auth-dependent links */}
        {!user && (
          <Link
            to="/login"
            className={location.pathname === '/login' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        )}

        {user && (
          <>
            <span className="nav-user-name">{user.name.split(' ')[0]}</span>
            <button className="nav-logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </>
        )}

        <a 
          href="https://github.com/Jeelpatel-07" 
          className="nav-resume-btn"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
        >
          GitHub
        </a>
      </div>

      <div className="nav-actions">
        {toggleDarkMode && (
          <button 
            type="button"
            className="theme-toggle-btn" 
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FaSun className="theme-icon sun" /> : <FaMoon className="theme-icon moon" />}
          </button>
        )}

        <div className="nav-social">
          <a href="https://github.com/Jeelpatel-07" target="_blank" rel="noopener noreferrer" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/jeel-parsaniya" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:jeelpatel4428@gmail.com" title="Email">
            <FaEnvelope />
          </a>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </motion.nav>
  )
}

export default NavBar