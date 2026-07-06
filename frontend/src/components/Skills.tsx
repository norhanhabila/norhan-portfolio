import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Smartphone, Database, Cloud } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: <Code size={20} />,
      skills: [
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'TypeScript', level: 90 }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      icon: <Layout size={20} />,
      skills: [
        { name: 'React.js', level: 95 },
        { name: 'AngularJS', level: 80 },
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 90 }
      ]
    },
    {
      title: 'Mobile Development',
      icon: <Smartphone size={20} />,
      skills: [
        { name: 'React Native Ecosystem', level: 92 }
      ]
    },
    {
      title: 'Databases',
      icon: <Database size={20} />,
      skills: [
        { name: 'MySQL', level: 88 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 85 }
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: <Cloud size={20} />,
      skills: [
        { name: 'Amazon Web Services (AWS)', level: 90 },
        { name: 'CI/CD Pipelines (CircleCI)', level: 70 },
        { name: 'GitHub & Version Control', level: 95 },
        { name: 'Unit Testing & TDD', level: 82 }
      ]
    }
  ];

  return (
    <section id="skills" className="section">
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>

        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Capabilities</span>
          <h2 className="section-title">Technical Expertise</h2>
        </div>

        {/* Categories Grid */}
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="skills-card"
            >
              {/* Category Header */}
              <div className="skills-card-header">
                <div className="skills-card-icon-box">
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
              </div>

              {/* Skills list */}
              <div className="skills-list">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-bar-wrapper">
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span className="skill-level-text">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="skill-track">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.25 }}
                        className="skill-progress"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education & Certifications */}
        <div className="education-section">
          <div className="education-grid">

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="edu-card"
            >
              <span className="edu-card-tag">Academic Background</span>
              <h3>Education</h3>
              <div className="edu-item">
                <span className="edu-item-title">B.S. in Telecommunication Engineering</span>
                <span className="edu-item-meta">Tanta University | Graduated 2016</span>
                <p className="edu-item-desc">
                  Rigorous engineering foundations in data communications, cellular networks, digital signals processing, electronics, and electromagnetic wave theory.
                </p>
              </div>
            </motion.div>

            {/* Certifications Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="edu-card"
            >
              <span className="edu-card-tag">Professional Vetting</span>
              <h3>Certifications</h3>
              <div className="edu-item">
                <span className="edu-item-title">Udacity Professional Nanodegrees</span>
                <span className="edu-item-meta">Advanced Full-Stack Web Development | 2022</span>
                <p className="edu-item-desc">
                  Focused on production-level API architectures, database models, cloud orchestration (AWS), and automation pipelines.
                </p>
              </div>
              <div className="edu-item" style={{ marginTop: '1.5rem' }}>
                <span className="edu-item-title">React Cross-Skilling Program</span>
                <span className="edu-item-meta">Udacity | 2022</span>
                <p className="edu-item-desc">
                  Advanced React architectures, state lifecycle design, hooks, responsive interfaces, and validation structures.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
