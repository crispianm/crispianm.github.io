import data from "./data.json";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Publications from "./components/Publications";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header initials={data.initials} />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Publications publications={data.publications} scholar={data.scholar} />
        <Experience education={data.education} work={data.work} />
        <Skills skills={data.skills} />
        <Contact data={data} />
      </main>
      <Footer name={data.name} links={data.links} />
    </>
  );
}
