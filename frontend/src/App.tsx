import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Navigation */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main style={{ flexGrow: 1 }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          
          {/* Logo & Note */}
          <div className="footer-brand">
            <span className="footer-brand-title">
              Norhan Habila
            </span>
            <p className="footer-brand-desc">
              Full-Stack Developer bridging system performance with premium interface aesthetics.
            </p>
          </div>

          {/* Nav links shortcut */}
          <div className="footer-nav">
            <a href="#about" className="footer-nav-link">About</a>
            <a href="#experience" className="footer-nav-link">Experience</a>
            <a href="#projects" className="footer-nav-link">Projects</a>
            <a href="#skills" className="footer-nav-link">Skills</a>
            <a href="#contact" className="footer-nav-link">Contact</a>
          </div>

          {/* Socials & Copyright */}
          <div className="footer-right">
            <div className="footer-socials">
              <a href="mailto:norhan.habila@gmail.com" className="footer-social-link" title="Email Norhan"><Mail size={16} /></a>
              <a href="https://github.com/norhanhabila" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="GitHub"><Github size={16} /></a>
              <a href="https://linkedin.com/in/norhan-habila/" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="LinkedIn"><Linkedin size={16} /></a>
            </div>
            <span className="footer-copy">
              &copy; {new Date().getFullYear()} Norhan Habila. All rights reserved.
            </span>
          </div>

        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-top-btn"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

export default App;
