import { useState } from "react";
import Art from "./Art";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const bibtex = (p) =>
  [
    `@inproceedings{${p.id},`,
    `  title={${p.title}},`,
    `  author={${p.authorsFull.join(" and ")}},`,
    `  booktitle={${p.venue}},`,
    p.pages && `  pages={${p.pages.replace("-", "--")}},`,
    `  year={${p.year}},`,
    p.doi && `  doi={${p.doi}},`,
    `  eprint={${p.arxiv}},`,
    `  archivePrefix={arXiv}`,
    "}",
  ]
    .filter(Boolean)
    .join("\n");

function Teaser({ pub }) {
  return (
    <div className="teaser">
      <span className="badge">{pub.abbr}</span>
      <div className="teaser-frame">
        {pub.teaser ? (
          <img src={pub.teaser} alt={`Teaser figure for ${pub.title}`} loading="lazy" />
        ) : (
          <Art name={pub.art} />
        )}
      </div>
    </div>
  );
}

function Authors({ names }) {
  return (
    <p className="authors">
      {names.map((a, i) => (
        <span key={a} className={a === "C. Morris" ? "me" : undefined}>
          {a}
          {i < names.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

function Paper({ pub }) {
  const [open, setOpen] = useState(null);
  const [copied, setCopied] = useState(false);
  const toggle = (name) => setOpen(open === name ? null : name);
  const bib = bibtex(pub);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bib);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable; the text is still selectable */
    }
  };

  return (
    <li id={pub.id} className="paper">
      <Teaser pub={pub} />
      <div className="paper-body">
        <h3 className="paper-title">{pub.title}</h3>
        {pub.alias && <p className="alias">{pub.alias}</p>}
        <Authors names={pub.authors} />
        <p className="venue">
          <em>{pub.venue}</em>
          {pub.pages && `, pp. ${pub.pages}`}, {pub.year}
        </p>

        <div className="links">
          <button type="button" aria-expanded={open === "summary"} onClick={() => toggle("summary")}>
            Summary
          </button>
          <a href={`https://arxiv.org/abs/${pub.arxiv}`} rel="noopener">
            arXiv
          </a>
          {pub.doi && (
            <a href={`https://doi.org/${pub.doi}`} rel="noopener">
              DOI
            </a>
          )}
          {pub.code && (
            <a href={pub.code} rel="noopener">
              Code
            </a>
          )}
          <button type="button" aria-expanded={open === "bib"} onClick={() => toggle("bib")}>
            BibTeX
          </button>
        </div>

        {open === "summary" && <p className="panel">{pub.description}</p>}
        {open === "bib" && (
          <div className="panel bib">
            <button type="button" className="copy" onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </button>
            <pre>{bib}</pre>
          </div>
        )}
      </div>
    </li>
  );
}

export default function Publications({ publications, scholar }) {
  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <section id="research" className="block alt">
      <Reveal className="container">
        <SectionHead eyebrow="Research" title="Publications">
          Video restoration and enhancement: making frames sharper, cleaner and cheaper to compute.
        </SectionHead>
        {years.map((year) => (
          <div key={year} className="year-group">
            <h3 className="year">{year}</h3>
            <ol className="papers">
              {publications
                .filter((p) => p.year === year)
                .map((p) => (
                  <Paper key={p.id} pub={p} />
                ))}
            </ol>
          </div>
        ))}
        <a className="text-link" href={scholar} rel="noopener">
          View all on Google Scholar <Icon name="external" size={15} />
        </a>
      </Reveal>
    </section>
  );
}
