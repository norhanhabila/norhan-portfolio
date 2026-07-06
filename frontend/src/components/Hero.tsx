import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      {/* Ambient glowing blurs in CSS */}
      <div className="glow-sphere glow-sphere-1 animate-pulse-slow"></div>
      <div className="glow-sphere glow-sphere-2"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-grid">
          
          {/* Left Column: Headline details */}
          <div>
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-tagline"
            >
              <span className="hero-tag-pulse"></span>
              Full-Stack Developer
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hero-title"
            >
              Crafting elegant, <br />
              <span className="gradient-text">scalable software</span> <br />
              from backend to interface.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hero-desc"
            >
              Hi, I'm <strong style={{ fontWeight: 600 }}>Norhan Habila</strong>. 
              I bridge the gap between network engineering foundations and dynamic, beautiful user ecosystems. I specialize in React, React Native, Node.js, and AWS cloud solutions.
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="hero-ctas"
            >
              <a href="#projects" className="btn-primary">
                View My Work
                <ArrowDown size={16} />
              </a>
              <a href="#contact" className="btn-secondary">
                Let's Connect
              </a>
              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="project-link-item"
                style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
              >
                <FileText size={16} />
                Read Professional CV
              </a>
            </motion.div>

            {/* Social Connects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="social-bar"
            >
              <a
                href="mailto:norhan.habila@gmail.com"
                className="social-icon-btn"
                title="Email Norhan"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://github.com/norhanhabila"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/norhan-habila/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Creative graphic display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-visual"
          >
            <div className="visual-canvas">
              <div className="visual-inner">NH</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
