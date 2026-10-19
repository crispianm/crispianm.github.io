import Art from "./Art";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Projects({ projects }) {
  return (
    <section id="projects" className="block">
      <Reveal className="container">
        <SectionHead eyebrow="Code" title="Projects" />
        <ul className="cards">
          {projects.map((p) => (
            <li key={p.title}>
              <a className="card" href={p.url} rel="noopener">
                <Art name={p.art} className="card-art" />
                <h3>
                  {p.title} <Icon name="arrow" size={15} />
                </h3>
                <p>{p.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
