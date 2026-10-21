import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function Skills({ skillList }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Group skills by category
  const categories = {
    'Languages': skillList.filter(s => s.category === 'Languages'),
    'Frontend': skillList.filter(s => s.category === 'Frontend'),
    'Backend': skillList.filter(s => s.category === 'Backend'),
    'AI & ML': skillList.filter(s => s.category === 'AI & ML'),
    'Databases': skillList.filter(s => s.category === 'Databases'),
    'Tools': skillList.filter(s => s.category === 'Tools')
  }

  return (
    <section id="skills" className="skills">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">Technologies and tools I work with</p>

        <div className="skills-container">
          {Object.entries(categories).map(([category, skills]) => (
            skills.length > 0 && (
              <motion.div
                key={category}
                className="skill-category"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <h3 className="category-title">{category}</h3>
                <div className="skill-tags">
                  {skills.map((skill) => (
                    <span key={skill.name} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Skills