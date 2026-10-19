export default function SectionHead({ eyebrow, title, children }) {
  return (
    <header className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </header>
  );
}
