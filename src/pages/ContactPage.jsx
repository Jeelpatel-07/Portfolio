import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa'

function ContactPage() {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <h1 className="page-title">Let's Connect</h1>
        <p className="page-subtitle">
          Have a project idea or want to collaborate? I'd love to hear from you
        </p>
      </div>
      
      <div className="contact-page-content">
        <div className="contact-grid">
          <div className="contact-info-cards">
            <motion.a 
              href="mailto:jeelpatel4428@gmail.com"
              className="contact-info-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FaEnvelope />
              <div>
                <h4>Email</h4>
                <p>jeelpatel4428@gmail.com</p>
              </div>
            </motion.a>

            <motion.a 
              href="https://www.linkedin.com/in/jeel-parsaniya"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FaLinkedin />
              <div>
                <h4>LinkedIn</h4>
                <p>linkedin.com/in/jeel-parsaniya</p>
              </div>
            </motion.a>

            <motion.a 
              href="https://github.com/jeelparsaniya"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FaGithub />
              <div>
                <h4>GitHub</h4>
                <p>github.com/jeelparsaniya</p>
              </div>
            </motion.a>

            <motion.div 
              className="contact-info-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FaMapMarkerAlt />
              <div>
                <h4>Location</h4>
                <p>India</p>
              </div>
            </motion.div>
          </div>

          <ContactForm />
        </div>
      </div>
    </motion.div>
  )
}

export default ContactPage