import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, Server, Smartphone, Globe } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  category: 'fullstack' | 'frontend' | 'mobile-cloud';
  tech: string[];
  github?: string;
  demo?: string;
  icon: React.ReactNode;
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'fullstack' | 'frontend' | 'mobile-cloud'>('all');

  const projects: Project[] = [
    {
      title: 'StorkyApp Platform',
      description: 'Architected and engineered a comprehensive web platform and dual-ecosystem mobile application. Developed robust backend integrations and API configurations deployed natively on AWS infrastructure.',
      category: 'fullstack',
      tech: ['React Native', 'React', 'Node.js', 'MySQL', 'AWS EC2/RDS/SQS/Lambda/S3'],
      github: 'https://github.com/norhanhabila',
      icon: <Smartphone size={24} />
    },
    {
      title: 'RoboDesk',
      description: 'Centralized omnichannel customer support workspace using MEAN stack. Integrates Facebook, Instagram, WhatsApp, Telegram webhooks. Features built-in SIP.js voice calling and automatic AI-suggested agent smart replies.',
      category: 'fullstack',
      tech: ['AngularJS', 'Express.js', 'Node.js', 'MongoDB', 'SIP.js', 'Webhooks', 'AI', 'CRM'],
      github: 'https://github.com/norhanhabila',
      icon: <Server size={24} />
    },
    {
      title: 'Padel Application',
      description: 'High-performance interactive sports scheduling application. Features state-of-the-art UI state transitions, responsive slide-out filters, customized calendar reservation modals, and error boundaries.',
      category: 'frontend',
      tech: ['React.js', 'CSS Modules', 'JavaScript', 'State Management'],
      github: 'https://github.com/norhanhabila',
      icon: <Globe size={24} />
    },
    {
      title: 'Multi-step Registration Wizard',
      description: 'Secure, high-integrity user verification and onboarding wizard. Implements robust client-side validation models, MERN database persistence, and integration testing coverage.',
      category: 'fullstack',
      tech: ['MERN Stack', 'React.js', 'Node.js', 'Express', 'MongoDB', 'React Hook Form'],
      github: 'https://github.com/norhanhabila',
      icon: <Code2 size={24} />
    },
    {
      title: 'MyReads Library App',
      description: 'A single page digital bookcase tracker that lets users categorize book inventories (Currently Reading, Want to Read, Read) synchronously connecting with a remote virtual backend.',
      category: 'frontend',
      tech: ['React.js', 'React Router', 'Fetch API', 'CSS Grid'],
      github: 'https://github.com/norhanhabila',
      icon: <Globe size={24} />
    },
    {
      title: 'Hosting a Full-Stack App',
      description: 'Designed secure AWS cloud hosting solutions. Programmed end-to-end continuous deployment pipelines integrating GitHub commits, CircleCI automated test runners, and AWS S3/RDS.',
      category: 'mobile-cloud',
      tech: ['AWS RDS/EC2/S3', 'CircleCI', 'CI/CD Pipelines', 'GitHub Actions'],
      github: 'https://github.com/norhanhabila',
      icon: <Server size={24} />
    },
    {
      title: 'Storefront Backend API',
      description: 'Modeled complete database architectures for ecommerce clients. Created a solid, authenticated RESTful API structure managing user roles, inventories, and secure checkouts.',
      category: 'fullstack',
      tech: ['Node.js', 'Express.js', 'PostgreSQL', 'JWT Authentication', 'Unit Testing'],
      github: 'https://github.com/norhanhabila',
      icon: <Code2 size={24} />
    }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>

        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Case Studies</span>
          <h2 className="section-title">Technical Projects</h2>
        </div>

        {/* Filter Navigation */}
        <div className="projects-filters">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'fullstack', label: 'Full-Stack' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'mobile-cloud', label: 'Mobile & Cloud' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`filter-btn ${filter === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="project-card"
              >
                <div>
                  {/* Top Bar with Icon and Category */}
                  <div className="project-card-header">
                    <div className="project-icon-box">
                      {project.icon}
                    </div>
                    <span className="project-category">
                      {project.category === 'fullstack'
                        ? 'Full-Stack'
                        : project.category === 'frontend'
                          ? 'Frontend'
                          : 'Mobile / Cloud'}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3>{project.title}</h3>

                  {/* Project Description */}
                  <p className="project-desc">
                    {project.description}
                  </p>
                </div>

                {/* Tags and Links */}
                <div className="project-footer">
                  {/* Tech Tags */}
                  <div className="project-tags">
                    {project.tech.map((tag, i) => (
                      <span key={i} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="project-links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-item"
                      >
                        <Github size={14} />
                        GitHub Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-item"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
