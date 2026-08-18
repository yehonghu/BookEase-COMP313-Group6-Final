import { useState } from 'react';

const services = [
  { key: 'home', label: 'Home care', caption: 'Everyday help', hotspot: 'home' },
  { key: 'repair', label: 'Repairs', caption: 'Practical fixes', hotspot: 'repair' },
  { key: 'garden', label: 'Garden', caption: 'Outside work', hotspot: 'garden' },
  { key: 'move', label: 'Moving', caption: 'A careful handoff', hotspot: 'move' },
];

const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`;

export default function ServiceOrbit({ onSelect }) {
  const [pointer, setPointer] = useState({ x: '0px', y: '0px' });
  const select = (key) => onSelect?.(key);
  const move = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({ x: `${(((event.clientX - bounds.left) / bounds.width - 0.5) * 14).toFixed(1)}px`, y: `${(((event.clientY - bounds.top) / bounds.height - 0.5) * 10).toFixed(1)}px` });
  };

  return (
    <section
      className="service-cinematic-map"
      style={{ '--shift-x': pointer.x, '--shift-y': pointer.y }}
      onPointerMove={move}
      onPointerLeave={() => setPointer({ x: '0px', y: '0px' })}
      aria-label="Explore BookEase service categories through a neighbourhood service map"
    >
      <div className="service-cinematic-map__art" aria-hidden="true">
        <img src={asset('service-map-cinematic-panel.jpg')} alt="" />
        <span className="service-cinematic-map__light" />
        <span className="service-cinematic-map__grain" />
      </div>
      <div className="service-cinematic-map__topline" aria-hidden="true"><span>Service coordination, made visible</span><b>01–04</b></div>
      <div className="service-cinematic-map__workflow" aria-hidden="true"><span>Request</span><i>→</i><span>Offer</span><i>→</i><span>Booking</span></div>

      <div className="service-cinematic-map__hotspots" aria-label="Select a service category from the map">
        {services.map((service) => <button key={service.key} type="button" className={`service-hotspot service-hotspot--${service.hotspot}`} onClick={() => select(service.key)} aria-label={`Browse ${service.label} requests`}><span>{service.label}</span></button>)}
      </div>

      <div className="service-cinematic-map__controls" aria-label="Service category shortcuts">
        {services.map((service, index) => <button key={service.key} type="button" onClick={() => select(service.key)}><b><i>0{index + 1}</i>{service.label}</b><small>{service.caption}</small></button>)}
      </div>
    </section>
  );
}
