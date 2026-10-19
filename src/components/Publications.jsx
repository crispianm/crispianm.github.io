import Art from "./Art";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Publications({ publications, scholar }) {
  return (
    <section id="research" className="block alt">
      <Reveal className="container">
        <SectionHead eyebrow="Research" title="Publications">
          Video restoration and enhancement: making frames sharper, cleaner and cheaper to compute.
        </SectionHead>
        <ul className="pubs">
          {publications.map((p) => (
            <li key={p.url}>
              <a className="pub" href={p.url} rel="noopener">
                <Art name={p.art} className="pub-art" />
                <div>
                  <span className="chip">{p.chip}</span>
                  <h3>{p.title}</h3>
                  {p.alias && <p className="alias">{p.alias}</p>}
                  <p className="authors">
                    {p.authors.map((a, i) => (
                      <span key={a} className={a === "C. Morris" ? "me" : undefined}>
                        {a}
                        {i < p.authors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <p className="venue">
                    {p.venue}, {p.year}
                  </p>
                  <p className="pub-desc">{p.description}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <a className="text-link" href={scholar} rel="noopener">
          View all on Google Scholar <Icon name="external" size={15} />
        </a>
      </Reveal>
    </section>
  );
}
