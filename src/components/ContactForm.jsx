import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaSpinner, FaCheckCircle } from 'react-icons/fa'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (name === 'message') {
      setCharCount(value.length)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setCharCount(0)
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <motion.form 
      className="contact-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {submitted && (
        <motion.div 
          className="success-message"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaCheckCircle /> Message sent successfully! I'll get back to you soon.
        </motion.div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Jeel Parsaniya"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Project Collaboration / Job Opportunity"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">
          Message * <span className="char-count">{charCount}/500</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project or opportunity..."
          rows="6"
          maxLength="500"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <motion.button
        type="submit"
        className="submit-btn"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="spinner" /> Sending...
          </>
        ) : (
          <>
            <FaPaperPlane /> Send Message
          </>
        )}
      </motion.button>
    </motion.form>
  )
}

export default ContactForm