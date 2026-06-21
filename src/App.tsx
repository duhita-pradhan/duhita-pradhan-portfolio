import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import SpecialtyPills from './components/Specialties/SpecialtyPills'
import Projects from './components/Projects/Projects'
import ComponentShowcase from './components/Showcase/ComponentShowcase'
import Experience from './components/Experience/Experience'
import Skills from './components/Skills/Skills'
import Education from './components/Education/Education'
import Contact from './components/Contact/Contact'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SpecialtyPills />
        <Projects />
        <ComponentShowcase />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  )
}
