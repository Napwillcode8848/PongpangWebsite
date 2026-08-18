import React, { useState } from 'react';
import './App.css';
import 'boxicons/css/boxicons.min.css';
import mainimg from './images/img1.jpg';
import connectimg from './images/connect.png';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectTab, setProjectTab] = useState('2025');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const basePath = process.env.PUBLIC_URL || '';

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
  };

  const slides = [
    { id: 1, src: mainimg, alt: 'banner1', caption: 'Caption Text' },
    { id: 2, src: mainimg, alt: 'banner2', caption: 'Caption Two' },
    { id: 3, src: mainimg, alt: 'banner3', caption: 'Caption Three' }
  ];

  const plusSlides = (n) => {
    setCurrentSlide((prev) => (prev + n + slides.length) % slides.length);
  };

  const goToSlide = (n) => {
    setCurrentSlide(n);
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
              Portfolio
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
            <h1 className="home__title">Hi, I'm Pongpang!</h1>
            <h2 className="home__subtitle">Computer Science Student Exploring AI, Research & Technology for Real-World Impact | International Scholar Award Recipient</h2>
            <p className="home__description">
              I’m passionate about computer vision and machine learning research, with a focus on applying CS to meaningful real-world problems.
              Explore my portfolio below to see how I blend computer science with research to build impactful technology across psychology, healthcare, sports, and HR.
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
              <a href="https://github.com/Napwillcode8848" target="_blank" rel="noopener noreferrer" className="social__link" title="GitHub">
                <i className='bx bxl-github'></i>
              </a>
              <a href="https://www.linkedin.com/in/napaorn-kao-ian" target="_blank" rel="noopener noreferrer" className="social__link" title="LinkedIn">
                <i className='bx bxl-linkedin'></i>
              </a>
              <a href="mailto:napasornkaoian@gmail.com" className="social__link" title="Email">
                <i className='bx bxs-envelope'></i>
              </a>
            </div>
          </div>
          <div className="home__image">
            <img
              src={mainimg}
              alt="Pongpang"
              className="home__img"
            />
          </div>
        </div>
      </section>

      {/* Blog Section
      <section id="about" className="blog__section">
        <h2 className="section__title">Pongpang's Blog</h2>
        <div className="slideshow__container">
              {slides.map((slide, index) => (
                <div key={slide.id} className="mySlides fade" style={{ display: index === currentSlide ? 'block' : 'none' }}>
                  <div className="numbertext">{slide.id} / {slides.length}</div>
                  <img src={slide.src} alt={slide.alt} style={{ width: '100%' }} />
                  <div className="text">{slide.caption}</div>
                </div>
              ))}

              <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
              <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
            </div>

            <div style={{ textAlign: 'center' }}>
              {slides.map((slide, index) => (
                <span
                  key={index}
                  className="dot"
                  onClick={() => goToSlide(index)}
                  style={{ backgroundColor: index === currentSlide ? '#717171' : '#bbb' }}
                ></span>
              ))}
            </div>
      </section> */}

      {/* Projects Section */}
      <section id="projects" className="projects section">
        <h2 className="section__title" style={{ color: '#fffdb4' }}>Pongpang's Portfolios</h2>

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
              src={`${process.env.PUBLIC_URL}/pdfs/${projectTab}.pdf#page=${currentPage}`}
              width="100%"
              height="100%"
              frameBorder="0"
              title={`Portfolio - ${projectTab}`}
            />
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
              I’d love to connect, hear different perspectives, and have a conversation. Feel free to reach out!
            </p>

            <div className="contact__details">
              <div className="contact__item">
                <i className='bx bxs-envelope'></i>
                <div>
                  <h4>Email</h4>
                  <p>napasornkaoian@gmail.com</p>
                </div>
              </div>
              <div className="contact__item">
                <i className='bx bxl-linkedin'></i>
                <div>
                  <h4>LinkedIn</h4>
                  <p>napaorn-kao-ian</p>
                </div>
              </div>
              <div className="contact__item">
                <i className='bx bxs-map'></i>
                <div>
                  <h4>Location</h4>
                  <p>Toronto, Canada</p>
                  <p>Bangkok, Thailand</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact__pongpangimg">
            <img src={connectimg} alt="Stay Positive!" className="contact__img"/>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <p>&copy; 2024 Napasorn Kao-ian. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;