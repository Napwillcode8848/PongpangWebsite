import React, { useState } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectTab, setProjectTab] = useState('highschool');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState({
    name: 'Napasorn (Pongpang) Kao-ian',
    email: 'napasornkaoian@gmail.com',
    message: ''
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    alert('Thank you! I\'ll get back to you soon.');
  };

  return (
    <div className="App">
      {/* Navigation Header */}
      <header className="header">
        <div className="nav__container">
          <div className="nav__logo">
            <span className="nav__logo-text">Pongpang</span>
          </div>
          
          <nav className={`nav ${menuOpen ? 'nav__mobile' : ''}`}>
            <a 
              href="#home" 
              className={`nav__link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              Home
            </a>
            <a 
              href="#about" 
              className={`nav__link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </a>
            <a 
              href="#projects" 
              className={`nav__link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => scrollToSection('projects')}
            >
              Project
            </a>
            <a 
              href="#contact" 
              className={`nav__link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </a>
          </nav>

          <div className="nav__toggle" onClick={toggleMenu}>
            <i className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`}></i>
          </div>
        </div>
      </header>

      {/* Home Section */}
      <section id="home" className="home section">
        <div className="home__container">
          <div className="home__content">
            <h1 className="home__title">Hi, I'm Napasorn Kao-ian</h1>
            <h2 className="home__subtitle">Ambitious Web Developer & Designer</h2>
            <p className="home__description">
              I create beautiful, functional digital experiences that solve real problems.
              Let's build something amazing together.
            </p>
            <div className="home__buttons">
              <a href="#projects" className="button button__primary">
                View My Work
              </a>
              <a href="#contact" className="button button__secondary">
                Get In Touch
              </a>
            </div>
            <div className="home__socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social__link" title="GitHub">
                <i className='bx bxl-github'></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social__link" title="LinkedIn">
                <i className='bx bxl-linkedin'></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social__link" title="Twitter">
                <i className='bx bxl-twitter'></i>
              </a>
              <a href="mailto:pongpang@example.com" className="social__link" title="Email">
                <i className='bx bxs-envelope'></i>
              </a>
            </div>
          </div>
          <div className="home__image">
            <div className="image__blob"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <h2 className="section__title">About Me</h2>
        <div className="about__container">
          <div className="about__content">
            <h3 className="about__heading">Who I Am</h3>
            <p className="about__text">
              I'm a passionate web developer with a keen eye for design. I specialize in 
              creating responsive, user-friendly applications using modern technologies like React.js.
            </p>
            <p className="about__text">
              With a background in both design and development, I bridge the gap between 
              beautiful interfaces and robust functionality. My goal is to deliver solutions 
              that not only look great but also provide exceptional user experiences.
            </p>
            
            <h3 className="about__heading" style={{ marginTop: '2rem' }}>Skills</h3>
            <div className="skills__container">
              <div className="skill__item">
                <span className="skill__name">React.js</span>
              </div>
              <div className="skill__item">
                <span className="skill__name">JavaScript</span>
              </div>
              <div className="skill__item">
                <span className="skill__name">CSS/HTML</span>
              </div>
              <div className="skill__item">
                <span className="skill__name">UI/UX Design</span>
              </div>
              <div className="skill__item">
                <span className="skill__name">Responsive Design</span>
              </div>
              <div className="skill__item">
                <span className="skill__name">Web Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects section">
        <h2 className="section__title">Featured Project</h2>
        
        <div className="portfolio__tabs">
          <button 
            className={`portfolio__tab ${projectTab === 'highschool' ? 'active' : ''}`}
            onClick={() => {
              setProjectTab('highschool');
              setCurrentPage(1);
            }}
          >
            Highschool
          </button>
          <button 
            className={`portfolio__tab ${projectTab === '2025' ? 'active' : ''}`}
            onClick={() => {
              setProjectTab('2025');
              setCurrentPage(1);
            }}
          >
            2025
          </button>
          <button 
            className={`portfolio__tab ${projectTab === '2026' ? 'active' : ''}`}
            onClick={() => {
              setProjectTab('2026');
              setCurrentPage(1);
            }}
          >
            2026
          </button>
        </div>

        <div className="pdf__viewer-container">
          <div className="pdf__viewer">
            <iframe 
              src={`/pdfs/${projectTab}.pdf#page=${currentPage}`}
              width="100%"
              height="100%"
              frameBorder="0"
              title={`Portfolio - ${projectTab}`}
            />
          </div>

          <div className="pdf__controls">
            <button 
              className="pdf__button"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <i className='bx bx-chevron-left'></i> Previous
            </button>
            
            <div className="pdf__page-info">
              Page <input 
                type="number" 
                value={currentPage} 
                onChange={(e) => setCurrentPage(Math.max(1, parseInt(e.target.value) || 1))}
                className="pdf__input"
                min="1"
              /> of {totalPages || '?'}
            </div>

            <button 
              className="pdf__button"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage >= totalPages}
            >
              Next <i className='bx bx-chevron-right'></i>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <h2 className="section__title">Get In Touch</h2>
        <div className="contact__container">
          <div className="contact__info">
            <h3 className="contact__heading">Let's work together</h3>
            <p className="contact__text">
              I'm always interested in hearing about new projects and opportunities.
              Feel free to reach out if you'd like to collaborate!
            </p>
            
            <div className="contact__details">
              <div className="contact__item">
                <i className='bx bxs-envelope'></i>
                <div>
                  <h4>Email</h4>
                  <p>pongpang@example.com</p>
                </div>
              </div>
              <div className="contact__item">
                <i className='bx bxs-phone'></i>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact__item">
                <i className='bx bxs-map'></i>
                <div>
                  <h4>Location</h4>
                  <p>Your City, Country</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__form">
            <div className="form__group">
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                className="form__input"
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form__group">
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                className="form__input"
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form__group">
              <textarea 
                name="message"
                placeholder="Your Message" 
                className="form__input form__textarea"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button 
              type="button"
              className="button button__primary"
              onClick={handleSubmit}
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <p>&copy; 2024 Napasorn Kao-ian. All rights reserved.</p>
          <p>Built with React.js and a passion for clean code.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;