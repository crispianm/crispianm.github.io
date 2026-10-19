import Reveal from "./Reveal";

export default function Skills({ skills }) {
  return (
    <section id="skills">
      <Reveal className="container">
        <h2>Skills</h2>
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
