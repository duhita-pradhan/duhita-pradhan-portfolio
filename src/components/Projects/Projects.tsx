import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import PrivacyControlMock from './mocks/PrivacyControlMock'
import FooterMock from './mocks/FooterMock'
import DiagnosticsMock from './mocks/DiagnosticsMock'
import AI4SustainMock from './mocks/AI4SustainMock'
import PrepMDMock from './mocks/PrepMDMock'

const PROJECTS = [
  {
    id: 'privacy',
    tag: 'Accenture · Fortune 500 · React + TypeScript',
    title: 'Global Privacy Control Component',
    description:
      'A globally deployed opt-out component for optional cookies, live across every domain-owned webpage for a Fortune 500 client. Built to be locale-aware, accessible, and brand-themeable, a single component serving millions of users across dozens of markets.',
    pills: ['React', 'TypeScript', 'Accessibility', 'i18n'],
    stats: ['Millions of users', 'Dozens of markets', 'WCAG AA'],
    visual: <PrivacyControlMock />,
  },
  {
    id: 'footer',
    tag: 'Accenture · Component Library',
    title: 'Global Footer: Reusable Across Every Domain Page',
    description:
      'Designed and built a single footer component deployed across every domain-owned page. The challenge: one component, infinite configurations, different nav structures, legal copy, social links, and regional variants, all driven by a single prop API.',
    pills: ['React', 'Prop API Design', 'SCSS', 'Responsive'],
    visual: <FooterMock />,
  },
  {
    id: 'diagnostics',
    tag: 'Accenture · Microsoft Adaptive Cards · React',
    title: 'Diagnostics as a Service',
    description:
      'A dynamic troubleshooting system that walks customers through diagnosing and resolving service issues in real time using Microsoft Adaptive Cards rendered in a React shell. Reduced support escalation rates significantly.',
    pills: ['React', 'Adaptive Cards', 'TypeScript', 'UX'],
    visual: <DiagnosticsMock />,
  },
  {
    id: 'ai4sustain',
    tag: 'LLM · Python · RAG · Course Project',
    title: 'AI4Sustain: Environmental Insight Agent',
    description:
      'Built the system architecture and data ingestion pipeline for an LLM-powered sustainability news analysis agent. Stack: GDELT ingestion, DeBERTa NLI classification, GPT-4o-mini RAG summarization, G-Eval quality scoring. Score: 91/100.',
    pills: ['Python', 'LLMs', 'RAG', 'HuggingFace', 'GPT-4o-mini'],
    githubUrl: 'https://github.com/duhita-pradhan',
    visual: <AI4SustainMock />,
  },
  {
    id: 'prepmd',
    tag: 'Gen AI · React · Healthcare · In Progress',
    title: 'PrepMD: AI Medical Appointment Assistant',
    description:
      'An LLM-powered tool that helps patients prepare structured summaries before doctor appointments and understand discharge notes in plain language. Built with empathy first.',
    pills: ['React', 'TypeScript', 'LLMs', 'Healthcare'],
    comingSoon: true,
    visual: <PrepMDMock />,
  },
]

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="projects-heading" className="section-heading">
            Things I&apos;ve shipped
          </h2>
          <p className="section-sub">Production components used by millions. Not side projects.</p>
        </motion.div>

        <div className="space-y-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              {...project}
              reversed={i % 2 === 1}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
