import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Contact({ data }) {
  return (
    <section id="contact" className="block alt">
      <Reveal className="container contact">
        <p className="eyebrow">Contact</p>
        <h2>Get in touch</h2>
        <p className="prose">
          I'm happy to talk about research, collaborations or anything else on this page.
        </p>
        <a className="btn primary" href={`mailto:${data.email}`}>
          <Icon name="mail" /> {data.email}
        </a>
      </Reveal>
    </section>
  );
}
