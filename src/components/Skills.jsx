import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Skills({ skills }) {
  return (
    <section id="skills" className="block alt">
      <Reveal className="container">
        <SectionHead eyebrow="Toolkit" title="Skills" />
        <div className="skill-groups">
          {skills.map((g) => (
            <div key={g.group}>
              <h3 className="col-title">{g.group}</h3>
              <ul className="chips">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
