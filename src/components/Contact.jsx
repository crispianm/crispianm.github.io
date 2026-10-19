import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Contact({ data }) {
  return (
    <section id="contact">
      <Reveal className="container contact">
        <h2>Get in touch</h2>
        <p className="lead">
          I'm happy to talk about research, collaborations or anything else on this page.
        </p>
        <a className="btn primary" href={`mailto:${data.email}`}>
          <Icon name="mail" /> {data.email}
        </a>
      </Reveal>
    </section>
  );
}
