import { motion } from 'framer-motion'

const ITEMS = [
  {
    period: 'Aug 2025 – Present',
    role: 'Associate Instructor',
    org: 'Luddy School · Indiana University',
    points: [
      'Mentored 4 capstone teams through full-stack system design and implementation.',
      'Guided students on React, TypeScript, accessibility, and software architecture best practices.',
    ],
    accentColor: '#7C3AED',
  },
  {
    period: 'Oct 2019 – Jul 2025',
    role: 'Senior Software Developer',
    org: 'Accenture · Pune, India',
    points: [
      'Delivered 100+ production React components for Fortune 500 clients across multiple domains.',
      'Achieved 30% SEO lift and 30% performance improvement through architectural optimizations.',
      'Led monolith → monorepo migration using NX Workspaces and Bit Cloud for component versioning.',
      'Built globally deployed systems including cookie consent (millions of users), reusable footer, and a diagnostics-as-a-service platform.',
    ],
    accentColor: '#06B6D4',
  },
]

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 px-6 border-t border-white/[0.05]"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="experience-heading" className="section-heading">
            Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-white/[0.07]"
            aria-hidden="true"
          />

          <ol className="space-y-10 pl-12">
            {ITEMS.map((item, i) => (
              <motion.li
                key={item.role}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Glowing dot */}
                <div
                  className="absolute -left-[40px] top-1.5 w-[14px] h-[14px] rounded-full border-2 border-bg"
                  style={{
                    backgroundColor: item.accentColor,
                    boxShadow: `0 0 8px ${item.accentColor}80, 0 0 20px ${item.accentColor}30`,
                  }}
                  aria-hidden="true"
                />

                <time className="font-mono text-[11px] text-white/25 tracking-wider block mb-1">
                  {item.period}
                </time>
                <h3 className="text-lg font-bold text-white leading-snug">{item.role}</h3>
                <p className="text-sm text-white/40 mb-3 font-medium mt-0.5">{item.org}</p>

                <ul className="space-y-2" role="list">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-sm text-white/50 leading-relaxed"
                    >
                      <span
                        className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-violet-500/60"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
