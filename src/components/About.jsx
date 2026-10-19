import Icon from "./Icon";
import Reveal from "./Reveal";

export default function About({ data }) {
  return (
    <section id="about" className="block">
      <Reveal className="container about-grid">
        <img
          className="portrait"
          src={data.image}
          width="480"
          height="600"
          alt={`Portrait of ${data.name}`}
        />
        <div>
          <p className="eyebrow">About</p>
          <h2>Hello</h2>
          <p className="prose">{data.bio}</p>
          <p className="meta">
            <Icon name="pin" /> {data.location}
          </p>
          <p className="actions">
            <a className="btn primary" href={data.resume}>
              <Icon name="download" /> Download resume
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
