import { useEffect, useState } from "react";

const sections = [
  ["about", "About"],
  ["experience", "Experience"],
  ["publications", "Publications"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["contact", "Contact"],
];

export default function Header({ name }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Primary">
        <a className="brand" href="#top">
          {name}
        </a>
        <ul>
          {sections.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
