import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa'

function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className="project-image">
        <span className="project-emoji">{project.image}</span>
        <span className="project-category-badge">{project.category}</span>
      </div>
      
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        
        <motion.div 
          className="project-features"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {project.features.map((feature, i) => (
            <div key={i} className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>{feature}</span>
            </div>
          ))}
        </motion.div>

        <button 
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Key Features'}
        </button>
        
        <div className="tech-stack">
          {project.tech.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>
        
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <FaGithub /> Code
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <FaExternalLinkAlt /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard