import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt, FaSpinner, FaExclamationTriangle, FaSync, FaSearch } from 'react-icons/fa'

function GitHubRepos({ username = 'Jeelpatel-07' }) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const fetchRepos = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=12&type=public`
      )
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }
      
      const data = await response.json()
      setRepos(data)
    } catch (err) {
      console.error('Error fetching repos:', err)
      setError(err.message || 'Failed to fetch repositories')
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    if (inView) {
      fetchRepos()
    }
  }, [inView, fetchRepos])

  // Extract unique languages for filter
  const languages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))]

  // Filter repositories based on search query and language filter
  const filteredRepos = repos.filter(repo => {
    const matchesSearch = 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage
    return matchesSearch && matchesLanguage
  })

  // Loading state
  if (loading) {
    return (
      <section className="github-section" ref={ref}>
        <div className="github-loading">
          <FaSpinner className="spinner" />
          <p>Loading GitHub repositories from REST API...</p>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="github-section" ref={ref}>
        <div className="github-error">
          <FaExclamationTriangle />
          <h3>Unable to load repositories</h3>
          <p>{error}</p>
          <button onClick={fetchRepos} className="retry-btn">
            <FaSync /> Retry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="github-section" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">GitHub Repositories</h2>
        <p className="section-subtitle">Real-time open source repositories fetched via GitHub REST API</p>

        {/* Search and Filter Controls (Practical 3 requirement) */}
        <div className="github-controls" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '25px 0'
        }}>
          <div className="github-search-box" style={{
            position: 'relative',
            flex: '1 1 280px',
            maxWidth: '400px'
          }}>
            <FaSearch style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)'
            }} />
            <input
              type="text"
              placeholder="Search repositories by name or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 15px 10px 40px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '14px'
              }}
            />
          </div>

          <div className="github-lang-filter" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {languages.map(lang => (
              <button
                key={lang}
                type="button"
                className={`filter-btn ${selectedLanguage === lang ? 'active' : ''}`}
                onClick={() => setSelectedLanguage(lang)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px'
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {filteredRepos.length === 0 ? (
          <div className="github-empty" style={{ textAlign: 'center', padding: '40px 0' }}>
            <FaGithub style={{ fontSize: '40px', color: 'var(--text-secondary)', marginBottom: '10px' }} />
            <p>No repositories match your search/filter criteria.</p>
          </div>
        ) : (
          <div className="github-grid">
            {filteredRepos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="github-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="github-card-header">
                  <FaGithub className="github-icon" />
                  <h3>{repo.name}</h3>
                </div>
                
                <p className="github-description">
                  {repo.description || 'No description available'}
                </p>
                
                <div className="github-stats">
                  {repo.language && (
                    <span className="github-stat">
                      <span 
                        className="language-dot" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }} 
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="github-stat">
                    <FaStar /> {repo.stargazers_count}
                  </span>
                  <span className="github-stat">
                    <FaCodeBranch /> {repo.forks_count}
                  </span>
                </div>
                
                <div className="github-link">
                  <FaExternalLinkAlt /> View Repository
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <div className="github-cta">
          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button primary"
          >
            <FaGithub /> View GitHub Profile
          </a>
        </div>
      </motion.div>
    </section>
  )
}

// Helper function to get language colors
function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f7df1e',
    'Python': '#3776ab',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'TypeScript': '#3178c6',
    'Ruby': '#701516',
    'PHP': '#4f5d95',
    'Go': '#00add8',
    'Jupyter Notebook': '#DA5B0B',
    'Shell': '#89e051',
  }
  return colors[language] || '#6e7681'
}

export default GitHubRepos