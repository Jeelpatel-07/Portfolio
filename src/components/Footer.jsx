import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'

function Footer({ 
  email = 'jeelpatel4428@gmail.com', 
  github = 'https://github.com/Jeelpatel-07', 
  linkedin = 'https://www.linkedin.com/in/jeel-parsaniya' 
}) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a href={github} target="_blank" rel="noopener noreferrer" title="GitHub">
            <FaGithub />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href={`mailto:${email}`} title="Email">
            <FaEnvelope />
          </a>
        </div>
        <div className="footer-text">
          <p>
            Built with <FaHeart className="heart-icon" /> by Jeel Parsaniya
          </p>
          <p className="copyright">
            © {currentYear} All Rights Reserved
          </p>
        </div>
        <div className="footer-email">
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer