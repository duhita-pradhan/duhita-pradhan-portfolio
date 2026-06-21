import { useState } from 'react'
import { motion } from 'framer-motion'
import ButtonDemo from './ButtonDemo'
import ToastDemo from './ToastDemo'
import DataTableDemo from './DataTableDemo'

const DEMOS = [
  {
    id: 'button',
    label: 'Button',
    meta: '4 variants · 3 sizes · Loading · Icons',
    component: <ButtonDemo />,
  },
  {
    id: 'toast',
    label: 'Toast System',
    meta: 'Animated · Progress bar · Auto-dismiss',
    component: <ToastDemo />,
  },
  {
    id: 'table',
    label: 'Data Table',
    meta: 'Sortable · Filterable · Paginated',
    component: <DataTableDemo />,
  },
]

export default function ComponentShowcase() {
  const [active, setActive] = useState('button')
  const demo = DEMOS.find((d) => d.id === active)!

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="py-24 px-6 border-t border-white/[0.05]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="showcase-heading" className="section-heading">
            I don&apos;t just use components.{' '}
            <span className="text-violet-400">I architect them.</span>
          </h2>
          <p className="section-sub">
            Live interactive demos. Real React. Running in your browser right now.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Component demos">
          {DEMOS.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={active === d.id}
              aria-controls={`tabpanel-${d.id}`}
              onClick={() => setActive(d.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                active === d.id
                  ? 'bg-violet-600 text-white'
                  : 'glass text-white/45 hover:text-white'
              }`}
            >
              <span>{d.label}</span>
              <span
                className={`hidden md:inline text-xs ${
                  active === d.id ? 'text-white/65' : 'text-white/25'
                }`}
              >
                {d.meta}
              </span>
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          id={`tabpanel-${active}`}
          role="tabpanel"
          aria-label={demo.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          {demo.component}
        </motion.div>
      </div>
    </section>
  )
}
