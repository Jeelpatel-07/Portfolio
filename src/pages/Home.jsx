import { motion } from 'framer-motion'
import Header from '../components/Header'
import About from '../components/About'
import Skills from '../components/Skills'
import GitHubRepos from '../components/GitHubRepos'

function Home() {
  const skillsList = [
    { name: 'Python', category: 'Languages', level: 90 },
    { name: 'C++', category: 'Languages', level: 85 },
    { name: 'SQL', category: 'Languages', level: 85 },
    { name: 'JavaScript', category: 'Languages', level: 80 },
    { name: 'React.js', category: 'Frontend', level: 85 },
    { name: 'HTML5 & CSS3', category: 'Frontend', level: 90 },
    { name: 'Bootstrap', category: 'Frontend', level: 85 },
    { name: 'Node.js & Express', category: 'Backend', level: 80 },
    { name: 'Flask', category: 'Backend', level: 75 },
    { name: 'MongoDB', category: 'Databases', level: 80 },
    { name: 'MySQL', category: 'Databases', level: 85 },
    { name: 'Scikit-learn', category: 'AI & ML', level: 85 },
    { name: 'Pandas & NumPy', category: 'AI & ML', level: 85 },
    { name: 'XGBoost', category: 'AI & ML', level: 80 },
    { name: 'NLP', category: 'AI & ML', level: 75 },
    { name: 'Explainable AI', category: 'AI & ML', level: 80 },
    { name: 'Git & GitHub', category: 'Tools', level: 85 },
    { name: 'VS Code', category: 'Tools', level: 90 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header 
        name="Jeel Parsaniya" 
        role="AI & ML Engineer"
        tagline="Building Intelligent Software Solutions"
        themeColor="#2563eb"
      />
      <About 
        bio="Passionate about Artificial Intelligence, Machine Learning, and Data Science with a strong track record of building intelligent solutions for real-world problems. Experienced in developing AI-powered web applications and leveraging AI-assisted development for rapid prototyping. Reached the final round of Odoo Hackathon, demonstrating innovation and effective collaboration in fast-paced environments."
        highlights={[
          { number: '4+', label: 'Major Projects' },
          { number: '3+', label: 'Hackathons' },
          { number: '15+', label: 'Technologies' },
          { number: 'AI/ML', label: 'Specialization' }
        ]}
      />
      <Skills skillList={skillsList} />
      <GitHubRepos username="Jeelpatel-07" />
    </motion.div>
  )
}

export default Home