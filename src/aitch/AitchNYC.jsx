import { useEffect, useRef, useState } from 'react';

const asset = (name) => `/aitch/nyc-design/${name}`;

function CornerMarks() {
  return ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
    <span className={`corner-mark ${position}`} key={position} aria-hidden="true">
      <img src={asset('corner-marks.svg')} alt="" />
    </span>
  ));
}

function Notice({ kind, onClose }) {
  const dialog = useRef(null);
  const isContact = kind === 'contact';
  useEffect(() => {
    const previousFocus = document.activeElement;
    dialog.current.showModal();
    return () => previousFocus?.focus();
  }, []);
  return (
    <dialog ref={dialog} className="aitch-dialog" aria-labelledby="notice-title" onCancel={onClose} onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <button type="button" className="dialog-close" aria-label="Close notice" onClick={onClose} autoFocus>×</button>
      <p className="dialog-eyebrow">Aitch NYC</p>
      <h2 id="notice-title">{isContact ? 'Contact us' : 'Memberships'}{!isContact && <><br />Coming soon</>}</h2>
      {isContact ? <>
        <p>Aitch is opening soon at<br />418 West 13th Street, New York, NY 10014.</p>
        <p>For opening enquiries, contact our NYC team.</p>
        <a href="mailto:info@aitchnyc.com">info@aitchnyc.com</a>
        <a href="tel:+14062840019">406 284 0019</a>
      </> : <>
        <p>Membership details will be announced here soon.</p>
        <p>For opening enquiries, contact our NYC team.</p>
        <a href="mailto:info@aitchnyc.com">info@aitchnyc.com</a>
      </>}
    </dialog>
  );
}

export default function AitchNYC() {
  const [notice, setNotice] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setMotionAllowed(!preference.matches); setVideoReady(false); };
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  const scene = useRef(null);
  useEffect(() => {
    const fit = () => {
      const { width, height } = scene.current.getBoundingClientRect();
      scene.current.style.setProperty('--scene-scale', Math.max(width / 1280, height / 824));
      scene.current.style.setProperty('--hero-scale', Math.min(Math.max(width / 1280, height / 824), width / 430));
    };
    const observer = new ResizeObserver(fit);
    observer.observe(scene.current);
    fit();
    return () => observer.disconnect();
  }, []);
  return (
    <main className="aitch-landing" ref={scene}>
      <div className={`aitch-scene${videoReady && motionAllowed ? ' video-ready' : ''}`} aria-hidden="true">
        <img className="scene-wall" src={asset('wall.png')} alt="" fetchPriority="high" />
        <div className="butterfly-shadow shadow-left"><div><img src={asset('butterfly-left-shadow.svg')} alt="" /></div></div>
        <div className="butterfly-shadow shadow-right"><div><img src={asset('butterfly-right-shadow.svg')} alt="" /></div></div>
        <div className="butterfly butterfly-left"><img src={asset('butterfly-left.png')} alt="" /></div>
        <div className="butterfly butterfly-right"><img src={asset('butterfly-right.png')} alt="" /></div>
        {motionAllowed && <video
          className="scene-video"
          src="/aitch/assets/VIDBG-6HyEBzEq.mp4"
          autoPlay loop muted playsInline preload="auto"
          onPlaying={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        />}
        <div className="scene-vignette" />
      </div>
      <CornerMarks />
      <div className="aitch-identity">
        <h1 className="aitch-title" aria-label="Aitch NYC">
          <span className="aitch-wordmark" aria-hidden="true">
            <img className="wordmark-shadow" src={asset('logo-shadow.svg')} alt="" />
            <img className="wordmark-face" src={asset('logo.svg')} alt="" />
          </span>
          <span className="aitch-city" aria-hidden="true">NYC</span>
        </h1>
        <nav className="aitch-nav" aria-label="Aitch navigation">
          <button type="button" onClick={() => setNotice('membership')}>Memberships</button>
          <button type="button" onClick={() => setNotice('contact')}>Contact us</button>
        </nav>
      </div>
      {notice && <Notice kind={notice} onClose={() => setNotice(null)} />}
    </main>
  );
}

