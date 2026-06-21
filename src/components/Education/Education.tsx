import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const SCHOOLS = [
  {
    degree: 'MS Computer Science',
    school: 'Indiana University',
    period: 'Aug 2024 – May 2027',
    detail: 'Luddy School of Informatics, Computing, and Engineering',
  },
  {
    degree: 'BE Electronics Engineering',
    school: 'University of Pune',
    period: 'Jun 2015 – May 2019',
    detail: 'Pune Institute of Computer Technology',
  },
]

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
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
          <h2 id="education-heading" className="section-heading">
            Education
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {SCHOOLS.map((school, i) => (
            <motion.div
              key={school.school}
              className="glass rounded-2xl p-6 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: 'rgba(124,58,237,0.1)',
                  border: '1px solid rgba(124,58,237,0.2)',
                }}
              >
                <GraduationCap size={18} className="text-violet-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-snug">{school.degree}</p>
                <p className="text-violet-400 font-semibold text-sm mt-0.5">{school.school}</p>
                <time className="text-white/25 text-[11px] font-mono block mt-1">
                  {school.period}
                </time>
                <p className="text-white/35 text-xs mt-1.5 leading-relaxed">{school.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
