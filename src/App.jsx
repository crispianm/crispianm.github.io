import data from "./data.json";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header name={data.name} />
      <main>
        <About data={data} />
        <Experience education={data.education} work={data.work} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Contact data={data} />
      </main>
      <Footer name={data.name} links={data.links} />
    </>
  );
}
