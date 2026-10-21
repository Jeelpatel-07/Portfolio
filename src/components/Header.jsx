import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

function Header({ name, role = 'AI & ML Engineer', tagline, themeColor = '#2563eb' }) {
  return (
    <motion.header 
      className="header"
      style={{ '--primary': themeColor }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="greeting"
          >
            Hello, I'm
          </motion.p>
          <h1 className="hero-name">{name}</h1>
          <TypeAnimation
            sequence={[
              role,
              2000,
              'Full Stack Developer',
              2000,
              'Data Scientist',
              2000,
              'Problem Solver',
              2000,
            ]}
            wrapper="h2"
            repeat={Infinity}
            cursor={true}
            className="hero-role"
          />
          <p className="hero-tagline">
            {tagline}
          </p>
          <div className="hero-cta">
            <motion.a
              href="/projects"
              className="cta-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="/contact"
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>
          <div className="hero-social">
            <a href="https://github.com/jeelparsaniya" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/jeel-parsaniya" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="mailto:jeelpatel4428@gmail.com">
              <FaEnvelope />
            </a>
          </div>
        </motion.div>
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="avatar-container">
            <div className="avatar">
              <span className="avatar-emoji">🤖</span>
            </div>
            <div className="orbit-ring" />
            <div className="floating-icons">
              <span className="float-icon python">🐍</span>
              <span className="float-icon react">⚛️</span>
              <span className="float-icon ai">🧠</span>
              <span className="float-icon data">📊</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header