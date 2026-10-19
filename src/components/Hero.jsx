import Icon from "./Icon";
import { HeroSymbol } from "./Art";

export default function Hero({ data }) {
  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <div className="fade fade-0">
          <HeroSymbol />
        </div>
        <h1 className="fade fade-1">{data.name}</h1>
        <p className="hero-roles fade fade-2">
          PhD researcher &middot; Computer vision &middot; Machine learning
        </p>
        <p className="hero-lead fade fade-3">
          {data.tagline} <a href="#research">See my research</a>.
        </p>
        <ul className="hero-links fade fade-3">
          {data.links.map((l) => (
            <li key={l.name}>
              <a href={l.url} title={l.name} aria-label={l.name} rel="me noopener">
                <Icon name={l.icon} size={20} />
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${data.email}`} title="Email" aria-label="Email">
              <Icon name="mail" size={20} />
            </a>
          </li>
        </ul>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to About">
        <Icon name="down" size={20} />
      </a>
    </section>
  );
}
