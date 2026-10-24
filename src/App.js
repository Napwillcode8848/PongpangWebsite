import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import './HiddenGarden.css';
import 'boxicons/css/boxicons.min.css';

// 👉 Put your 3 images in src/images/ with these names (or change the names here)
import object1 from './images/object1.png';
import object2 from './images/object2.png';
import object3 from './images/object3.png';

const WORLD_W = 3200;
const WORLD_H = 2200;

// Each object opens one of your portfolio PDFs (public/pdfs/<pdf>.pdf)
// x / y are positions in the big world (px). Move them around to hide them better!
const OBJECTS = [
  { id: 'highschool', label: 'Highschool Portfolio', pdf: 'highschool', src: object1, x: 2700, y: 400, size: 90 },
  { id: '2025', label: '2025 Portfolio', pdf: '2025', src: object2, x: 450, y: 1650, size: 90 },
  { id: '2026', label: '2026 Portfolio', pdf: '2026', src: object3, x: 1750, y: 1100, size: 90 },
];

const FLOWERS = ['🌸', '🌼', '🌷', '🌻', '🌺', '💐', '🪻', '🌹', '🏵️', '🪷', '🍀'];

// small seeded random so the garden looks the same on every load
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function App() {
  const basePath = process.env.PUBLIC_URL || '';
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [found, setFound] = useState([]);
  const [openObj, setOpenObj] = useState(null);

  const drag = useRef({ active: false, startX: 0, startY: 0, origX: 0, origY: 0, moved: false });

  const clamp = useCallback((x, y) => {
    const minX = Math.min(0, window.innerWidth - WORLD_W);
    const minY = Math.min(0, window.innerHeight - WORLD_H);
    return { x: Math.max(minX, Math.min(0, x)), y: Math.max(minY, Math.min(0, y)) };
  }, []);

  // start in the middle of the garden
  useEffect(() => {
    setOffset(clamp(-(WORLD_W - window.innerWidth) / 2, -(WORLD_H - window.innerHeight) / 2));
    const onResize = () => setOffset((o) => clamp(o.x, o.y));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [clamp]);

  // close popup with Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpenObj(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // lots of flowers!
  const flowers = useMemo(() => {
    const rand = mulberry32(2026);
    const list = [];
    for (let i = 0; i < 1100; i++) {
      list.push({
        id: i,
        emoji: FLOWERS[Math.floor(rand() * FLOWERS.length)],
        x: rand() * WORLD_W,
        y: rand() * WORLD_H,
        size: 28 + rand() * 46,
        rot: -30 + rand() * 60,
      });
    }
    return list;
  }, []);

  const onPointerDown = (e) => {
    drag.current = {
      active: true, startX: e.clientX, startY: e.clientY,
      origX: offset.x, origY: offset.y, moved: false,
    };
    setDragging(true);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.abs(dx) + Math.abs(dy) > 6) d.moved = true;
    setOffset(clamp(d.origX + dx, d.origY + dy));
  };

  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  const handleObjectClick = (obj) => {
    if (drag.current.moved) return; // it was a drag, not a click
    setFound((f) => (f.includes(obj.id) ? f : [...f, obj.id]));
    setOpenObj(obj);
  };

  return (
    <div
      className={`garden ${dragging ? 'dragging' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      {/* The big scrollable flower world */}
      <div
        className="garden__world"
        style={{ width: WORLD_W, height: WORLD_H, transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {flowers.map((f) => (
          <span
            key={f.id}
            className="flower"
            style={{ left: f.x, top: f.y, fontSize: f.size, transform: `rotate(${f.rot}deg)` }}
          >
            {f.emoji}
          </span>
        ))}

        {OBJECTS.map((o) => (
          <button
            key={o.id}
            className={`hidden-object ${found.includes(o.id) ? 'found' : ''}`}
            style={{ left: o.x, top: o.y, width: o.size, height: o.size }}
            onClick={() => handleObjectClick(o)}
            aria-label={o.label}
            title={found.includes(o.id) ? o.label : ''}
          >
            <img src={o.src} alt={o.label} draggable={false} />
          </button>
        ))}
      </div>

      {/* Overlay UI */}
      <div className="hud hud__title">
        <h1>Pongpang's Secret Garden</h1>
        <p>Computer Science · AI · Research</p>
      </div>

      <div className="hud hud__progress">
        Found {found.length}/3
        {OBJECTS.map((o) => (
          <div key={o.id} className={`progress__slot ${found.includes(o.id) ? 'done' : ''}`}>
            {found.includes(o.id) && <img src={o.src} alt="" />}
          </div>
        ))}
      </div>

      <div className="hud hud__socials">
        <a href="https://github.com/Napwillcode8848" target="_blank" rel="noopener noreferrer" title="GitHub">
          <i className="bx bxl-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/napaorn-kao-ian" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <i className="bx bxl-linkedin"></i>
        </a>
        <a href="mailto:napasornkaoian@gmail.com" title="Email">
          <i className="bx bxs-envelope"></i>
        </a>
      </div>

      <div className="hud hud__hint">Drag around to explore 🌸 Find 3 hidden objects to open my portfolio</div>

      {/* Portfolio popup */}
      {openObj && (
        <div className="modal" onPointerDown={(e) => e.stopPropagation()} onClick={() => setOpenObj(null)}>
          <div className="modal__box" onClick={(e) => e.stopPropagation()}>
            <div className="modal__bar">
              <span>{openObj.label}</span>
              <button className="modal__close" onClick={() => setOpenObj(null)} aria-label="Close">✕</button>
            </div>
            <iframe
              className="modal__frame"
              src={`${basePath}/pdfs/${openObj.pdf}.pdf`}
              title={openObj.label}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;