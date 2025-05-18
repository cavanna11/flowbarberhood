import './App.css';
import { FaWhatsapp } from "react-icons/fa6";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Header hide on scroll top (ya implementado)
    const header = document.querySelector('.barber-header');
    function onScroll() {
      if (window.innerWidth > 900) return;
      if (!header) return;
      if (window.scrollY <= 10) {
        header.classList.add('hide-on-top');
      } else {
        header.classList.remove('hide-on-top');
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    // Scroll suave para los links del nav
    const navLinks = document.querySelectorAll('.barber-header nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            window.scrollTo({
              top: target.getBoundingClientRect().top + window.scrollY - (header?.clientHeight || 0),
              behavior: 'smooth'
            });
          }
        }
      });
    });
    // Efecto de aparición al hacer scroll
    const sections = document.querySelectorAll('section');
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach(section => observer.observe(section));
    return () => {
      window.removeEventListener('scroll', onScroll);
      navLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="barber-landing">
      {/* Header */}
      <header className="barber-header">
          <a href="#main" className="barber-logo"><img src="/logo2.jpg" alt="" id='logonav'/></a>
        <nav>
          <a href="#servicios">Servicios</a>
          <a href="#galeria">Redes</a>
          <a href="#contacto">Turnos</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="barber-hero">
        <h1 id="effect">
          <svg className="svg-stroke" viewBox="0 0 900 120">
            <text x="50%" y="80" textAnchor="middle">FLOW BARBER HOOD</text>
          </svg>
        </h1>
        <p>La experiencia del HOOD.</p>
        <a href="#contacto" className="barber-btn">Reservar turno</a>
      </section>

      {/* Servicios */}
      <section id="servicios" className="barber-servicios">
        <h3>Nuestros Servicios</h3>
        <div className="barber-servicios-list">
          <div className="barber-servicio">
            <h4>Corte & Cejas</h4>
            <p>Corte de pelo + cejas.</p>
            <p id='price'>$8000</p>
          </div>
          <div className="barber-servicio">
            <h4>Corte de pelo</h4>
            <p>Corte de pelo a eleccion</p>
            <p id='price'>$7000</p>
          </div>
          <div className="barber-servicio">
            <h4>Corte & Barba</h4>
            <p>Corte de pelo + barba.</p>
            <p id='price'>$9000</p>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="barber-galeria">
        <h3>Redes Sociales</h3>
        <div className="redes">
        <p>Seguinos en KICK</p>
        <iframe src="https://player.kick.com/lospibesdesanber" height="300" width="300"  scrolling="no"></iframe>
        </div>
        <div className="redes">
        <p>Seguinos en INSTAGRAM</p>
        <img src="/flowbarberhood_qr.png" alt="" width='300px' height='300px'/>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="barber-contacto">
        <div className="contacto-wsp">
          <h3>Contacto</h3>
          <p>Para reservar un turno, envíanos un mensaje a través de WhatsApp.</p>
          <a
            href="https://wa.me/5491123456789" // Reemplaza por el número real
            className="barber-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp /> WhatsApp
          </a>
        </div>
        <div className="contacto-mapa">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1345.264519847799!2d-56.688943253562314!3d-36.68420689300579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDQxJzAyLjgiUyA1NsKwNDEnMTguOSJX!5e0!3m2!1ses-419!2sar!4v1747520752945!5m2!1ses-419!2sar"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Barbería"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="barber-footer">
        <p>© {new Date().getFullYear()} FlowBarberHood. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
