/* global React, ReactDOM, Nav, Hero, Partners, Services, About, Locations, CtaStrip, Footer, QuoteModal, useReveal,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle */
const { useEffect, useState, useRef } = React;

function App() {
  const [t, setT] = useTweaks(window.TWEAK_DEFAULTS);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const rootRef = useReveal();

  useEffect(() => {
    document.body.dataset.palette = t.palette;
    document.body.dataset.accent  = t.accent;
    document.body.classList.toggle('has-grain', !!t.showGrain);
  }, [t]);

  // ESC closes modal
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setQuoteOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div ref={rootRef}>
      <Nav onQuote={() => setQuoteOpen(true)} />
      <Hero onQuote={() => setQuoteOpen(true)} />
      <Partners />
      <Services onQuote={() => setQuoteOpen(true)} />
      <About />
      <Locations />
      <CtaStrip onQuote={() => setQuoteOpen(true)} />
      <Footer />

      <a className="fab" href="https://wa.me/+524423372540" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.5A8.5 8.5 0 1 1 20.5 11.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1 0-2.5-1.5-2.5-2.5l1-1-1-2L9 9.5Z" fill="currentColor"/>
        </svg>
      </a>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Paleta">
          <TweakRadio
            label="Modo"
            value={t.palette}
            onChange={(v) => setT('palette', v)}
            options={[
              { value: 'onyx',     label: 'Onyx' },
              { value: 'graphite', label: 'Grafito' },
              { value: 'pearl',    label: 'Perla' },
            ]}
          />
          <TweakRadio
            label="Acento"
            value={t.accent}
            onChange={(v) => setT('accent', v)}
            options={[
              { value: 'champagne', label: 'Champagne' },
              { value: 'platinum',  label: 'Platino' },
              { value: 'rust',      label: 'Óxido' },
              { value: 'cobalt',    label: 'Cobalto' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Textura">
          <TweakToggle label="Grano editorial" value={t.showGrain} onChange={(v) => setT('showGrain', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
