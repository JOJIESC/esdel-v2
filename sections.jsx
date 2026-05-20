/* global React */
const { useState, useEffect, useRef } = React;

// Reveal-on-scroll hook
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    el.querySelectorAll('.reveal').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

// ---------------- ICONS ----------------
const I = {
  arrow: (p) =>
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  whatsapp: (p) =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.5A8.5 8.5 0 1 1 20.5 11.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1 0-2.5-1.5-2.5-2.5l1-1-1-2L9 9.5Z" fill="currentColor" />
    </svg>,

  phone: (p) =>
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M3 3.5C3 3 3.4 2.5 4 2.5h1.5c.4 0 .8.3.9.7l.6 2.4c.1.4 0 .8-.3 1l-1 .9c.8 1.7 2.1 3 3.8 3.8l1-1c.2-.3.6-.4 1-.3l2.4.6c.4.1.7.5.7.9V13c0 .6-.5 1-1 1A11 11 0 0 1 3 3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>,

  pin: (p) =>
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M8 14s5-4.5 5-8.5a5 5 0 1 0-10 0C3 9.5 8 14 8 14Z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="5.5" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    </svg>,

  menu: (p) =>
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...p}>
      <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>,

  close: (p) =>
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...p}>
      <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>,

  // Service line glyphs
  health: (p) =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 11h6M12 8v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>,

  home: (p) =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>,

  car: (p) =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 14l2-6h12l2 6v4h-2v-2H6v2H4v-4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="8" cy="15" r="1.3" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="16" cy="15" r="1.3" stroke="currentColor" strokeWidth="1.3" />
    </svg>,

  life: (p) =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M3 13c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 13c0-3 2-6 5-6s5 3 5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>,

  savings: (p) =>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 8v8M9.5 10c0-1 1-1.5 2.5-1.5s2.5.5 2.5 1.7c0 2.3-5 1-5 3.3 0 1.2 1 1.7 2.5 1.7S14.5 13 14.5 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>

};

// ---------------- NAV ----------------
function Nav({ onQuote }) {
  const [open, setOpen] = useState(false);
  const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#aseguradoras', label: 'Aseguradoras' },
  { href: '#oficinas', label: 'Oficinas' }];

  return (
    <header className="nav">
      <div className="wrap nav-row">
        <a href="#top" className="brand">
          <img src="assets/logo-mark.png" alt="ESDEL" className="brand-logo" style={{ borderRadius: "10px" }} />
          <div>
            <div className="brand-text">ESDEL
</div>
            <div className="brand-sub">Agentes de Seguros · MX</div>
          </div>
        </a>

        <nav className="nav-links">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>
          )}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="nav-cta" onClick={onQuote}>
            Cotizar <I.arrow />
          </button>
          <button className="burger" aria-label="Menú" onClick={() => setOpen(!open)}>
            {open ? <I.close /> : <I.menu />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {links.map((l) =>
        <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        )}
      </div>
    </header>);

}

// ---------------- HERO ----------------
function Hero({ onQuote }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow reveal">Querétaro · Monterrey · Cobertura nacional</div>
          <h1 className="reveal reveal-d1" style={{ marginTop: 24 }}>
            Seguros a tu<br />
            <span className="it">medida,</span><br />
            tranquilidad<br />
            para tu vida.
          </h1>
          <p className="hero-lede reveal reveal-d2">
            En ESDEL te ayudamos a proteger lo que más valoras. Soluciones flexibles,
            asesoría experta y el respaldo de las aseguradoras líderes del mercado mexicano.
          </p>
          <div className="hero-meta reveal reveal-d3">
            <button className="btn btn-primary" onClick={onQuote}>
              Cotizar mi seguro <span className="arrow">↗</span>
            </button>
            <a className="btn btn-ghost" href="#servicios">Ver servicios</a>
            <div className="hero-stat" style={{ marginLeft: 14 }}>
              <div className="hero-stat-num">+30<span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>.</span></div>
              <div className="hero-stat-lbl">Años de experiencia</div>
            </div>
          </div>
        </div>

        <div className="hero-art reveal reveal-d2">
          <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1400&q=80&auto=format&fit=crop" alt="Familia cálida en casa" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div className="hero-art-tag">Ed. 2026 · Familia</div>
          <div className="hero-art-cap">
            <span>Lo que más valoras</span>
            <span>N° 01 · Cobertura</span>
          </div>
          <div className="hero-art-floater">
            <span className="dot"></span>
            <div>
              <div className="l1">Asesor en línea</div>
              <div className="l2">Respuesta &lt; 2h</div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ---------------- PARTNERS ----------------
function Partners() {
  const list = ['Qualitas', 'MAPFRE', 'Seguros Potosí', 'HDI', 'ANA Seguros', 'AXA', 'GMX', 'Inbursa', 'Plan Seguro', 'Momento Seguros'];
  const row = [...list, ...list];
  const innerRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    let x = 0;
    let lastT = 0;
    let raf = 0;
    const tick = (t) => {
      if (!lastT) lastT = t;
      const dt = Math.min((t - lastT) / 1000, 0.1);
      lastT = t;
      const halfW = el.scrollWidth / 2;
      if (halfW > 0) {
        const loopSec = window.innerWidth < 720 ? 4 : 9;
        x -= (halfW / loopSec) * dt;
        if (-x >= halfW) x += halfW;
        el.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="partners" id="aseguradoras">
      <div className="wrap partners-row">
        <div className="partners-label">Trabajamos con</div>
        <div className="partners-track">
          <div className="partners-inner" ref={innerRef}>
            {row.map((n, i) =>
            <span key={i} className={(i % list.length) % 3 === 1 ? 'it' : ''}>{n}</span>
            )}
          </div>
        </div>
      </div>
    </div>);

}

// ---------------- SERVICES ----------------
function Services({ onQuote }) {
  const items = [
  { n: '01', icon: I.health, cls: 's1', dark: false, title: <>Gastos médicos <span className="it">mayores</span></>,
    desc: 'Protección integral ante enfermedades o accidentes graves. Hospitalización, tratamientos especializados y atención médica adaptada a tu familia.' },
  { n: '02', icon: I.car, cls: 's2', dark: true, title: <>Auto.</>,
    desc: 'Desde coberturas básicas contra daños y robo, hasta paquetes completos con asistencia vial y responsabilidad civil.' },
  { n: '03', icon: I.home, cls: 's3', dark: false, title: <>Hogar.</>,
    desc: 'Robos, incendios, daños por agua y fenómenos naturales. Tu patrimonio respaldado.' },
  { n: '04', icon: I.life, cls: 's4', dark: false, title: <>Vida & <span className="it">beneficiarios</span></>,
    desc: 'Respaldo económico para quienes dependen de ti. Algunas pólizas incluyen anticipos por diagnóstico de enfermedades graves para cubrir gastos sin esperas.' },
  { n: '05', icon: I.savings, cls: 's5', dark: true, title: <>Jubilación & <span className="it">ahorro</span></>,
    desc: 'Esquemas a tu medida para complementar tu pensión o ahorrar de forma inteligente. Rendimientos seguros, flexibilidad y respaldo a largo plazo.' }];

  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <div className="section-head">
          <h2 className="reveal">Servicios<span className="it">.</span></h2>
        </div>
        <div className="services">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.n} className={`svc ${it.cls} ${it.dark ? 'featured' : ''} reveal`} onClick={onQuote}>
                <div className="svc-num">{it.n} / 05</div>
                <div className="svc-icon"><Icon /></div>
                <h3>{it.title}</h3>
                <p className="svc-desc">{it.desc}</p>
                <span className="svc-link">Cotizar <span className="arr">→</span></span>
              </div>);

          })}
        </div>
      </div>
    </section>);

}

// ---------------- ABOUT ----------------
function About() {
  return (
    <section className="section" id="nosotros" style={{ paddingTop: 40, paddingBottom: 120 }}>
      <div className="wrap">
        <hr className="divider" style={{ marginBottom: 80 }} />
        <div className="about">
          <div className="about-side">
            <div className="eyebrow reveal" style={{ marginBottom: 24 }}>¿Quiénes somos?</div>
            <p className="about-quote reveal reveal-d1">
              Tres décadas administrando riesgos con <span className="it">seriedad,</span> compromiso y un equipo que entiende tu vida.
            </p>
          </div>

          <div className="about-body">
            <p className="reveal">
              En ESDEL aplicamos desde hace años un modelo eficaz de administración de
              riesgos, ofreciendo soluciones flexibles y personalizadas para cada cliente.
              Ponemos a tu disposición nuestra experiencia y conocimientos, respaldados por
              un equipo capacitado en áreas técnicas, comerciales y operativas.
            </p>
            <p className="reveal reveal-d1">
              Como especialistas en el sector asegurador, nos encargamos de gestionar tus
              riesgos con eficiencia y compromiso. Somos socios estratégicos de las
              aseguradoras más reconocidas del mercado, lo que garantiza que tu patrimonio
              esté siempre en buenas manos.
            </p>

            <div className="about-stats reveal reveal-d2">
              <div>
                <div className="about-stat-num">+30<span className="it">.</span></div>
                <div className="about-stat-lbl">Años de trayectoria</div>
              </div>
              <div>
                <div className="about-stat-num">10<span className="it">+</span></div>
                <div className="about-stat-lbl">Aseguradoras aliadas</div>
              </div>
              <div>
                <div className="about-stat-num">2<span className="it">.</span></div>
                <div className="about-stat-lbl">Oficinas — QRO &amp; MTY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ---------------- LOCATIONS ----------------
function Locations() {
  const offices = [
  {
    city: 'Querétaro',
    addr: 'Hacienda La Laja 605, El Jacal, 76180 Santiago de Querétaro, Qro.',
    phone: '+52 442 337 2540',
    tel: '+524423372540',
    maps: 'https://maps.app.goo.gl/haA6KHHLgGZYMUih9',
    embed: 'https://www.google.com/maps?q=Hacienda+La+Laja+605,+El+Jacal,+76180+Santiago+de+Quer%C3%A9taro,+Qro&output=embed'
  },
  {
    city: 'Monterrey',
    addr: 'David Alfaro Siqueiros 104, piso 16, Valle Oriente, San Pedro Garza García, N.L.',
    phone: '+52 81 3142 6571',
    tel: '+528131426571',
    maps: 'https://maps.app.goo.gl/jXVksQTJt6Gbt74G8',
    embed: 'https://www.google.com/maps?q=David+Alfaro+Siqueiros+104,+Valle+Oriente,+San+Pedro+Garza+Garc%C3%ADa,+Nuevo+Le%C3%B3n&output=embed'
  }];

  return (
    <section className="section" id="oficinas" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <hr className="divider" style={{ marginBottom: 80 }} />
        <div className="section-head">
          <h2 className="reveal">Dos oficinas.<br />Cobertura <span className="it">nacional.</span></h2>
          <p className="reveal reveal-d1">
            Atendemos desde Querétaro y Monterrey, pero asesoramos a clientes en toda la
            República. Visítanos, llámanos o escríbenos por WhatsApp.
          </p>
        </div>
        <div className="locations">
          {offices.map((o) =>
          <div key={o.city} className="loc-card reveal">
              <div className="loc-map">
                <iframe
                src={o.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa oficina ${o.city}`}
                allowFullScreen></iframe>
              </div>
              <div className="loc-body">
                <h3>{o.city}<span className="it">.</span></h3>
                <div className="loc-addr">{o.addr}</div>
                <div className="loc-actions">
                  <a className="chip solid" href={`tel:${o.tel}`}>
                    <I.phone /> {o.phone}
                  </a>
                  <a className="chip" href={o.maps} target="_blank" rel="noreferrer">
                    <I.pin /> ¿Cómo llegar?
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ---------------- CTA ----------------
function CtaStrip({ onQuote }) {
  return (
    <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="cta-strip reveal">
          <h2>¿Lista para una <span className="it">cotización</span> sin compromiso?</h2>
          <div className="cta-strip-actions">
            <button className="btn btn-primary" onClick={onQuote}>Cotizar ahora <span className="arrow">↗</span></button>
            <a className="btn" style={{ background: 'transparent', color: 'var(--paper)', border: '1px solid color-mix(in oklab, var(--paper) 30%, transparent)' }} href="https://wa.me/+524423372540" target="_blank" rel="noreferrer">
              <I.whatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>);

}

// ---------------- FOOTER ----------------
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-text">esdel<span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>.</span></div>
            <p>ESDEL Consultores SC. Agentes de seguros con más de 30 años respaldando lo que más importa.</p>
          </div>
          <div className="footer-col">
            <h4>Servicios</h4>
            <ul>
              <li><a href="#servicios">Gastos médicos</a></li>
              <li><a href="#servicios">Auto</a></li>
              <li><a href="#servicios">Hogar</a></li>
              <li><a href="#servicios">Vida</a></li>
              <li><a href="#servicios">Ahorro y jubilación</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Compañía</h4>
            <ul>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#oficinas">Oficinas</a></li>
              <li><a href="#aseguradoras">Aseguradoras</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Aviso de privacidad</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><a href="tel:+524423372540">Querétaro · 442 337 2540</a></li>
              <li><a href="tel:+528131426571">Monterrey · 81 3142 6571</a></li>
              <li><a href="https://wa.me/+524423372540" target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/esdel_agentes/" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://www.facebook.com/esdelagentes/" target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 ESDEL Consultores SC — Todos los derechos reservados</span>
          <span>Querétaro · Monterrey · MX</span>
        </div>
      </div>
    </footer>);

}

// ---------------- QUOTE MODAL ----------------
function QuoteModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ tipo: 'Auto', nombre: '', telefono: '', email: '' });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) { setStep(0); setError(null); setSending(false); }
  }, [open]);

  const setF = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const valid =
    data.nombre.trim().length > 1 &&
    data.telefono.trim().length >= 8 &&
    /\S+@\S+\.\S+/.test(data.email);

  const submit = async () => {
    if (!valid || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: window.WEB3FORMS_ACCESS_KEY,
          subject: `Nueva cotización ESDEL — ${data.tipo}`,
          from_name: 'Sitio ESDEL',
          tipo: data.tipo,
          name: data.nombre,
          email: data.email,
          phone: data.telefono,
          message:
            `Tipo de seguro: ${data.tipo}\n` +
            `Nombre: ${data.nombre}\n` +
            `Teléfono: ${data.telefono}\n` +
            `Email: ${data.email}`,
          botcheck: ''
        })
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'No se pudo enviar la solicitud.');
      setStep(2);
    } catch (e) {
      setError(e.message || 'Error de red. Inténtalo de nuevo en un momento.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`modal-bg ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="modal" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar"><I.close /></button>

        {step < 2 &&
        <div className="modal-step-row">
            <div className={`step ${step >= 0 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 1 ? 'active' : ''}`}></div>
          </div>
        }

        {step === 0 &&
        <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Paso 01 / 02</div>
            <h3>¿Qué quieres <span className="it">asegurar?</span></h3>
            <p>Selecciona la cobertura que te interesa. Un asesor te contactará con opciones a tu medida.</p>
            <div className="modal-form">
              <div className="field">
                <label>Tipo de seguro</label>
                <select value={data.tipo} onChange={setF('tipo')}>
                  <option>Auto</option>
                  <option>Gastos médicos mayores</option>
                  <option>Hogar</option>
                  <option>Vida</option>
                  <option>Jubilación y ahorro</option>
                </select>
              </div>
              <div className="modal-actions">
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>Tarda menos de 1 minuto</span>
                <button className="btn btn-primary" onClick={() => setStep(1)}>Continuar <span className="arrow">↗</span></button>
              </div>
            </div>
          </div>
        }

        {step === 1 &&
        <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Paso 02 / 02</div>
            <h3>Tus <span className="it">datos.</span></h3>
            <p>Te contactamos en menos de 2 horas hábiles, sin compromiso.</p>
            <div className="modal-form">
              <div className="field">
                <label>Nombre completo</label>
                <input value={data.nombre} onChange={setF('nombre')} placeholder="María Hernández" />
              </div>
              <div className="field">
                <label>Teléfono</label>
                <input value={data.telefono} onChange={setF('telefono')} placeholder="442 000 0000" />
              </div>
              <div className="field">
                <label>Correo electrónico</label>
                <input value={data.email} onChange={setF('email')} placeholder="[email protected]" type="email" />
              </div>
              {error &&
              <div style={{ color: '#c0392b', fontSize: 13, marginTop: 4 }}>{error}</div>
              }
              <div className="modal-actions">
                <button className="btn btn-ghost" onClick={() => setStep(0)} disabled={sending}>← Atrás</button>
                <button className="btn btn-primary" onClick={submit} disabled={!valid || sending}>
                  {sending ? 'Enviando…' : <>Enviar solicitud <span className="arrow">↗</span></>}
                </button>
              </div>
            </div>
          </div>
        }

        {step === 2 &&
        <div className="success">
            <div className="success-mark">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 11.5l4 4L17 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3>Solicitud <span className="it">recibida.</span></h3>
            <p style={{ maxWidth: '34ch' }}>Un asesor de ESDEL te contactará para preparar tu cotización de <strong>{data.tipo}</strong>. Gracias por confiar en nosotros.</p>
            <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
          </div>
        }
      </div>
    </div>);

}

Object.assign(window, { Nav, Hero, Partners, Services, About, Locations, CtaStrip, Footer, QuoteModal, useReveal });