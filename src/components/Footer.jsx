import Icon from "./Icon";

export default function Footer({ name, links }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{name}</p>
          <p className="muted">PhD researcher, University of Bristol</p>
        </div>
        <ul className="social">
          {links.map((l) => (
            <li key={l.name}>
              <a href={l.url} aria-label={l.name} rel="me noopener">
                <Icon name={l.icon} size={20} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="legal">&copy; {new Date().getFullYear()} {name}</p>
    </footer>
  );
}
