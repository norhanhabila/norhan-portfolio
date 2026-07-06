import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setResponseMessage('Please fill out all required fields.');
      return;
    }

    setStatus('loading');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setResponseMessage(data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setResponseMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setResponseMessage('Unable to reach the server. Please check if the backend is running.');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
        </div>

        <div className="contact-grid">
          
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="contact-info-panel"
          >
            <div>
              <h3 className="contact-h3">Let's discuss your next project.</h3>
              <p className="contact-intro">
                Whether you need a mobile application, a scalable backend integration, or cloud hosting solutions, my inbox is always open. Let's build something exceptional.
              </p>

              {/* Direct lists */}
              <div className="contact-list">
                <a href="mailto:norhan.habila@gmail.com" className="contact-item-link">
                  <div className="contact-item-icon-box">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="contact-item-label">Email Me</span>
                    <div className="contact-item-value">norhan.habila@gmail.com</div>
                  </div>
                </a>

                <a href="tel:+201212028913" className="contact-item-link">
                  <div className="contact-item-icon-box">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="contact-item-label">Call / WhatsApp</span>
                    <div className="contact-item-value">+(20) 121 202 8913</div>
                  </div>
                </a>

                <div className="contact-item-link" style={{ cursor: 'default' }}>
                  <div className="contact-item-icon-box">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="contact-item-label">Location</span>
                    <div className="contact-item-value">Tanta, Egypt (Hybrid / Remote)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Panel */}
            <div className="contact-social-section">
              <h4>Follow & Connect</h4>
              <div className="contact-social-buttons">
                <a
                  href="https://github.com/norhanhabila"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
                >
                  <Github size={14} />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/norhan-habila/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="contact-form-panel"
          >
            <form onSubmit={handleSubmit} className="contact-form">
              
              <div className="form-row">
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">Your Name <span>*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Norhan Habila"
                    className="form-control"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Your Email <span>*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="norhan@example.com"
                    className="form-control"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Collaboration details"
                  className="form-control"
                />
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">Message <span>*</span></label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can I support your project?"
                  className="form-control"
                />
              </div>

              {/* Alerts */}
              {status === 'success' && (
                <div className="status-alert success">
                  <CheckCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{responseMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="status-alert error">
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{responseMessage}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="form-submit-btn"
              >
                {status === 'loading' ? (
                  <>
                    <div className="spinner"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
