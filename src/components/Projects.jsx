import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Projects({ projects }) {
  return (
    <section id="projects">
      <Reveal className="container">
        <h2>Projects</h2>
        <ul className="cards">
          {projects.map((p) => (
            <li key={p.title}>
              <a className="card" href={p.url} rel="noopener">
                <img src={p.image} alt="" loading="lazy" width="400" height="225" />
                <div className="card-body">
                  <h3>
                    {p.title} <Icon name="arrow" size={16} />
                  </h3>
                  <p>{p.description}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
