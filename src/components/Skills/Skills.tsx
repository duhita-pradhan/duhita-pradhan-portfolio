import { motion } from 'framer-motion'
import type { SkillCategory } from '../../types'

const CATEGORIES: SkillCategory[] = [
  {
    label: 'Frontend Core',
    skills: [
      { name: 'React / Redux', descriptor: '5 years production, including design systems' },
      { name: 'TypeScript', descriptor: 'Strict mode, generics, utility types' },
      { name: 'CSS / SCSS', descriptor: 'BEM, CSS-in-JS, design tokens, animations' },
      { name: 'Next.js', descriptor: 'SSR, SSG, App Router' },
      { name: 'Accessibility', descriptor: 'WCAG 2.1 AA, screen reader testing' },
    ],
  },
  {
    label: 'Tooling & Architecture',
    skills: [
      { name: 'NX Monorepo', descriptor: 'Migrated a large codebase at Accenture' },
      { name: 'Bit Cloud', descriptor: 'Component versioning and distribution' },
      { name: 'Git / CI/CD', descriptor: 'GitHub Actions, branch strategies' },
      { name: 'Figma', descriptor: 'Design handoff, component inspection' },
      { name: 'Node.js', descriptor: 'REST APIs, Express' },
    ],
  },
  {
    label: 'Growing',
    skills: [
      { name: 'Python / ML', descriptor: 'Applied ML coursework, LLM pipeline projects' },
      { name: 'PyTorch / HuggingFace', descriptor: 'Beginner, actively building' },
    ],
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 px-6 border-t border-white/[0.05]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="skills-heading" className="section-heading">
            Skills
          </h2>
          <p className="section-sub">Honest signal. Not keyword stuffing.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
            >
              <h3 className="font-mono text-[11px] text-violet-400 uppercase tracking-widest mb-5">
                {cat.label}
              </h3>
              <dl className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <dt className="text-white font-semibold text-sm">{skill.name}</dt>
                    <dd className="text-white/38 text-xs mt-0.5 leading-relaxed">
                      {skill.descriptor}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
