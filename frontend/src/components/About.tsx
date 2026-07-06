import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck, Paintbrush } from 'lucide-react';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <Paintbrush size={24} />,
      title: 'Pixel-Perfect Figma',
      desc: 'Translating high-fidelity Figma designs into clean, responsive web screens with meticulous detail and fluid layouts.',
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Bug-Free Quality',
      desc: 'Obsessing over edge cases and writing clean, defensive code to prevent issues before they reach production.',
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Brainstorming & Ideas',
      desc: 'Bringing a bright mind, creative solutions, positive energy, and active brainstorming to project development.',
    },
    {
      icon: <Heart size={24} />,
      title: 'Dedicated Drive',
      desc: 'Balancing family leadership with intense technical training, channeling focus into high-impact engineering.',
    },
  ];

  return (
    <section id="about" className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">My Story & Passion</h2>
        </div>

        <div className="about-grid">
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="about-bio"
          >
            <h3 className="about-h3">
              Crafting high-fidelity interfaces with absolute dedication.
            </h3>
            
            <p className="about-text">
              My path into software development is defined by focus, resilience, and curiosity. I spent my early 20s dedicating my time and care to raising my two daughters. Once they grew and I gained more flexibility, I channeled that same nurturing energy and focus directly into my career goals—completing intensive engineering programs and diving deep into modern web ecosystems.
            </p>

            <p className="about-text">
              I am a passionate web developer with a bright mind, a wealth of creative ideas, and a love for brainstorming. I try my best to keep my work bug-free by proactively thinking through all edge cases, focusing heavily on user experience details, and translating Figma designs into pixel-perfect, responsive code.
            </p>

            <p className="about-text" style={{ fontWeight: 500, color: 'var(--primary)' }}>
              🎯 Looking for a remote, part-time position focused on Front-End development, where I can build beautiful user environments and bring positive energy to a collaborative team.
            </p>

            {/* Metrics */}
            <div className="about-metrics">
              <div className="metric-item">
                <span className="metric-num">3+</span>
                <span className="metric-label">Years Coding</span>
              </div>
              <div className="metric-item">
                <span className="metric-num">2</span>
                <span className="metric-label">Beautiful Girls</span>
              </div>
              <div className="metric-item">
                <span className="metric-num">100%</span>
                <span className="metric-label">Pixel-Perfect</span>
              </div>
            </div>
          </motion.div>

          {/* Cards grid */}
          <div className="about-cards">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="about-card"
              >
                <div className="about-card-icon-box">
                  {item.icon}
                </div>
                <h4 className="about-card-title">{item.title}</h4>
                <p className="about-card-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
