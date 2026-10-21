import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import GitHubRepos from '../components/GitHubRepos'

function Projects() {
  const [filter, setFilter] = useState('All')

  const projectList = [
    {
      title: 'City Navigator',
      description: 'Smart city exploration platform that helps users discover nearby places, navigate efficiently, and access important city information through an interactive interface.',
      tech: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Google Maps API'],
      github: 'https://github.com/jeelparsaniya/city-navigator',
      live: 'https://city-navigator.vercel.app',
      image: '🏙️',
      category: 'Full Stack',
      features: [
        'Interactive city map with real-time navigation',
        'Smart location search for nearby places',
        'Favorite places with ratings & contact info',
        'Responsive design for all devices'
      ]
    },
    {
      title: 'Explainable AI Cricket Prediction',
      description: 'AI application predicting cricket match outcomes using historical statistics with transparent explanations through SHAP/LIME techniques.',
      tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'Flask', 'Plotly', 'Matplotlib'],
      github: 'https://github.com/jeelparsaniya/cricket-prediction-ai',
      live: 'https://cricket-ai-predictor.vercel.app',
      image: '🏏',
      category: 'AI & ML',
      features: [
        'Match winner & win probability analysis',
        'Player performance prediction',
        'Explainable AI with SHAP/LIME',
        'Interactive analytics dashboard'
      ]
    },
    {
      title: 'SkillMate',
      description: 'AI-powered career development platform helping students improve employability through resume analysis, skill-gap detection, and personalized recommendations.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Flask', 'Scikit-learn', 'NLP'],
      github: 'https://github.com/jeelparsaniya/skillmate',
      live: 'https://skillmate-ai.vercel.app',
      image: '💼',
      category: 'AI & ML',
      features: [
        'ATS score calculation & resume analysis',
        'Skill-gap detection & course recommendations',
        'Career roadmap generation',
        'Job role prediction with progress tracking'
      ]
    },
    {
      title: 'Learnova',
      description: 'Intelligent learning management platform with AI-driven personalized recommendations, course management, and progress tracking for students and educators.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Flask', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/jeelparsaniya/learnova',
      live: 'https://learnova-lms.vercel.app',
      image: '🎓',
      category: 'Full Stack',
      features: [
        'Student & Instructor authentication',
        'Course management with video lectures',
        'AI-based course recommendations',
        'Certificates & progress tracking'
      ]
    }
  ]

  const categories = ['All', 'Full Stack', 'AI & ML']

  const filteredProjects = filter === 'All' 
    ? projectList 
    : projectList.filter(p => p.category === filter)

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <h1 className="page-title">Featured Projects</h1>
        <p className="page-subtitle">
          Building AI-powered solutions and full-stack applications that solve real-world problems
        </p>
      </div>
      
      <div className="projects-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      {/* Practical 3: REST API Integration on Projects Page */}
      <div style={{ marginTop: '60px' }}>
        <GitHubRepos username="Jeelpatel-07" />
      </div>
    </motion.div>
  )
}

export default Projects