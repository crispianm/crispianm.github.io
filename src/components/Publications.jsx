import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Publications({ publications, scholar }) {
  return (
    <section id="publications">
      <Reveal className="container">
        <h2>Publications</h2>
        <ol className="pubs">
          {publications.map((p) => (
            <li key={p.url}>
              <h3>
                <a href={p.url} rel="noopener">
                  {p.title}
                </a>
              </h3>
              <p className="authors">
                {p.authors.map((a, i) => (
                  <span key={a} className={a.startsWith("Crispian") ? "me" : undefined}>
                    {a}
                    {i < p.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p className="venue">
                {p.venue}, {p.year}
                {p.note && <span> &middot; {p.note}</span>}
              </p>
            </li>
          ))}
        </ol>
        <p>
          <a className="btn" href={scholar} rel="noopener">
            <Icon name="scholar" /> All publications on Google Scholar
          </a>
        </p>
      </Reveal>
    </section>
  );
}
