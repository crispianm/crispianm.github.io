import Icon from "./Icon";
import Reveal from "./Reveal";

export default function About({ data }) {
  return (
    <section id="about" className="hero">
      <Reveal className="hero-inner">
        <img
          className="avatar"
          src={data.image}
          width="220"
          height="220"
          alt={`Portrait of ${data.name}`}
        />
        <div>
          <p className="eyebrow">Hello, I'm</p>
          <h1>{data.name}</h1>
          <p className="lead">{data.tagline}</p>
          <p>{data.bio}</p>
          <p className="meta">
            <Icon name="pin" /> {data.location}
          </p>
          <div className="actions">
            <a className="btn primary" href={data.resume}>
              <Icon name="download" /> Download resume
            </a>
            {data.links.map((l) => (
              <a className="btn" key={l.name} href={l.url} rel="me noopener">
                <Icon name={l.icon} /> {l.name}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
