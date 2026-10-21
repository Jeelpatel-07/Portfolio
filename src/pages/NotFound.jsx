import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaHome, FaArrowLeft } from 'react-icons/fa'

function NotFound() {
  return (
    <motion.div
      className="not-found-page"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="not-found-content">
        <motion.div
          className="error-code"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
        >
          404
        </motion.div>
        <h1>Page Not Found</h1>
        <p>
          Oops! The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="back-home-btn">
            <FaHome /> Back to Home
          </Link>
          <button onClick={() => window.history.back()} className="go-back-btn">
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default NotFound