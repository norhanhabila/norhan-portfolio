import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  bullets: string[];
  skills: string[];
}

export const Experience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const experiences: ExperienceItem[] = [
    {
      role: 'Full-Stack Developer',
      company: 'StorkyApp',
      location: 'Tanta, Al Gharbiyah, Egypt (Hybrid)',
      period: 'May 2025 – Present',
      type: 'Hybrid',
      bullets: [
        'Developed a comprehensive platform website and mobile application for StorkyApp using Android and React Native.',
        'Implemented robust backend solutions utilizing MySQL, AWS, Node.js, and TypeScript to maximize performance and enhance user experience.',
        'Collaborated closely with cross-functional teams to ensure seamless feature integration, smooth production deployment, and continuous system support.'
      ],
      skills: ['React Native', 'Android SDK', 'Node.js', 'TypeScript', 'MySQL', 'AWS', 'React']
    },
    {
      role: 'Full-Stack Web Developer',
      company: 'Appout ITS',
      location: 'Tanta, Egypt',
      period: 'Apr 2024 – Jan 2025',
      type: 'On-site',
      bullets: [
        'Contributed to the end-to-end development of RoboDesk, an enterprise-level customer service solution using the MEAN stack (MongoDB, Express, Angular, Node).',
        'Integrated Facebook, Instagram, WhatsApp, and Telegram webhooks for centralized, real-time message and comment orchestration.',
        'Embedded SIP.js capabilities to unlock fully reliable, scalable in-app voice functionalities (receiving and initiating calls).',
        'Architected AI-assisted messaging features across the stack, including automatic AI responses for bots and smart reply suggestions for customer agents.'
      ],
      skills: ['MEAN Stack', 'AngularJS', 'Node.js', 'SIP.js', 'Webhooks', 'API Integration', 'AI Bots']
    },
    {
      role: 'Full-Stack Web Developer',
      company: 'Blue-Developments',
      location: 'Cairo, Egypt',
      period: 'Oct 2023 – Nov 2023',
      type: 'On-site',
      bullets: [
        'Delivered client-tailored web products for a specialized software commerce store utilizing modern React ecosystems.',
        'Turned fast-paced business specifications into clean, scalable code under tight commercial project timelines.'
      ],
      skills: ['React.js', 'React Ecosystem', 'JavaScript', 'HTML5/CSS3', 'Agile Delivery']
    },
    {
      role: 'Full-Stack Web Developer Intern',
      company: 'Manara',
      location: 'Remote (US-Based)',
      period: 'Apr 2023 – Oct 2023',
      type: 'Remote',
      bullets: [
        'Completed intensive software engineering acceleration program structured to vet top-tier technical talents for global production teams.',
        'Participated in mock interviews, algorithmic problem solving, clean code reviews, and large-scale architecture case-studies.'
      ],
      skills: ['Algorithms', 'Data Structures', 'System Design', 'Code Reviews', 'Collaborative Coding']
    },
    {
      role: 'Full-Stack Developer Intern',
      company: 'Udacity',
      location: 'Remote',
      period: 'Mar 2022 – Sep 2022',
      type: 'Remote',
      bullets: [
        'Engaged in hands-on architectures and labs focused on production-grade web delivery models, API designs, and full-stack integration.',
        'Built full-stack relational storefront APIs and structured automated CircleCI deployment pipelines to AWS.'
      ],
      skills: ['Node.js', 'PostgreSQL', 'Express.js', 'CircleCI', 'AWS S3/RDS', 'Unit Testing']
    }
  ];

  return (
    <section id="experience" className="section">
      <div className="glow-sphere glow-sphere-3"></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Career History</span>
          <h2 className="section-title">Professional Experience</h2>
        </div>

        {/* Experience Layout */}
        <div className="experience-layout">

          {/* Left Column: Job Selector List */}
          <div className="timeline-selectors">
            {experiences.map((exp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`timeline-btn ${activeIndex === idx ? 'active' : ''}`}
              >
                <span className="timeline-btn-company">{exp.company}</span>
                <span className="timeline-btn-role">{exp.role}</span>
              </button>
            ))}
          </div>

          {/* Right Column: Detailed Job Information */}
          <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="timeline-panel"
              >
                {/* Header detail */}
                <div className="timeline-header">
                  <div className="timeline-title-group">
                    <h3>{experiences[activeIndex].role}</h3>
                    <span className="timeline-company-label">
                      @{experiences[activeIndex].company}
                    </span>
                  </div>

                  <div className="timeline-meta-group">
                    <span className="timeline-meta-item">
                      <Calendar size={14} className="timeline-bullet-icon" />
                      {experiences[activeIndex].period}
                    </span>
                    <span className="timeline-meta-item">
                      <MapPin size={14} className="timeline-bullet-icon" />
                      {experiences[activeIndex].location}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <div className="timeline-bullets">
                  {experiences[activeIndex].bullets.map((bullet, idx) => (
                    <div key={idx} className="timeline-bullet-item">
                      <CheckCircle2 size={16} className="timeline-bullet-icon" />
                      <p className="timeline-bullet-text">{bullet}</p>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="timeline-tech-section">
                  <h4>Technologies & Skills</h4>
                  <div className="timeline-tech-tags">
                    {experiences[activeIndex].skills.map((skill, idx) => (
                      <span key={idx} className="tag-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
