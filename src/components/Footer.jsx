import Icon from "./Icon";

export default function Footer({ name, links }) {
  return (
    <footer className="site-footer">
      <ul className="social">
        {links.map((l) => (
          <li key={l.name}>
            <a href={l.url} aria-label={l.name} rel="me noopener">
              <Icon name={l.icon} size={22} />
            </a>
          </li>
        ))}
      </ul>
      <p>
        &copy; {new Date().getFullYear()} {name}
      </p>
      <a className="to-top" href="#top">
        Back to top
      </a>
    </footer>
  );
}
