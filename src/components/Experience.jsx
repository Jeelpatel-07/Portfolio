import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'

function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      period: '2023 - Present',
      type: 'work',
      description: 'Led development of microservices architecture, improving system performance by 40%'
    },
    {
      title: 'Full Stack Developer',
      company: 'StartUp Inc',
      period: '2021 - 2023',
      type: 'work',
      description: 'Built and deployed scalable web applications serving 100K+ users'
    },
    {
      title: 'B.Tech Computer Science',
      company: 'Your University',
      period: '2019 - 2023',
      type: 'education',
      description: 'Focused on software engineering and web technologies'
    }
  ]

  return (
    <section id="experience" className="experience">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Experience & Education</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="timeline-content">
                <div className="timeline-icon">
                  {exp.type === 'work' ? <FaBriefcase /> : <FaGraduationCap />}
                </div>
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <span className="period">{exp.period}</span>
                <p>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Experience