import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

function Entry({ title, org, dates, description }) {
  return (
    <article className="entry">
      <header>
        <h3>{title}</h3>
        <p className="dates">{dates}</p>
      </header>
      <p className="org">{org}</p>
      <p>{description}</p>
    </article>
  );
}

export default function Experience({ education, work }) {
  return (
    <section id="experience" className="block">
      <Reveal className="container">
        <SectionHead eyebrow="Background" title="Education & experience" />
        <div className="two-col">
          <div>
            <h3 className="col-title">Education</h3>
            {education.map((e) => (
              <Entry key={e.degree} title={e.degree} org={e.school} dates={e.dates} description={e.description} />
            ))}
          </div>
          <div>
            <h3 className="col-title">Work</h3>
            {work.map((w) => (
              <Entry key={w.company} title={w.title} org={w.company} dates={w.dates} description={w.description} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
