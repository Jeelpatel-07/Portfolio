import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaRocket, FaBrain, FaCode, FaTrophy } from 'react-icons/fa'

function About({ bio, highlights }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const icons = [FaRocket, FaBrain, FaCode, FaTrophy]

  return (
    <section id="about" className="about">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Passionate about building intelligent solutions</p>
        
        <div className="about-content">
          <motion.p 
            className="bio-text"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {bio}
          </motion.p>
          
          <div className="stats-grid">
            {highlights.map((highlight, index) => {
              const Icon = icons[index]
              return (
                <motion.div
                  key={index}
                  className="stat-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Icon className="stat-icon" />
                  <h3>{highlight.number}</h3>
                  <p>{highlight.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About