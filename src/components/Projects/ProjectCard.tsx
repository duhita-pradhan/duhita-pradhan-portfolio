import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import type { ReactNode } from 'react'

interface ProjectCardProps {
  tag: string
  title: string
  description: string
  pills: string[]
  stats?: string[]
  githubUrl?: string
  comingSoon?: boolean
  visual: ReactNode
  reversed: boolean
  index: number
}

export default function ProjectCard({
  tag,
  title,
  description,
  pills,
  stats,
  githubUrl,
  comingSoon,
  visual,
  reversed,
}: ProjectCardProps) {
  return (
    <motion.article
      className="glass rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      aria-label={title}
    >
      <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        {/* Visual side */}
        <div className="lg:w-[44%] p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.05] bg-white/[0.01]">
          <div className="w-full max-w-xs">{visual}</div>
        </div>

        {/* Content side */}
        <div className="lg:w-[56%] p-8 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-mono text-[10px] text-violet-400 bg-violet-950/60 px-2.5 py-1 rounded-full border border-violet-700/25 uppercase tracking-widest">
              {tag}
            </span>
            {comingSoon && (
              <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-700/25 uppercase tracking-widest">
                In Progress
              </span>
            )}
          </div>

          <h3
            className={`text-xl font-bold text-white mb-3 leading-snug tracking-tight ${
              comingSoon ? 'opacity-65' : ''
            }`}
          >
            {title}
          </h3>

          <p
            className={`text-white/45 text-sm leading-relaxed mb-5 ${comingSoon ? 'opacity-70' : ''}`}
          >
            {description}
          </p>

          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-1 mb-5">
              {stats.map((stat) => (
                <p key={stat} className="text-xs font-semibold text-white/70">
                  {stat}
                </p>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-5">
            {pills.map((pill) => (
              <span
                key={pill}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-white/55"
              >
                {pill}
              </span>
            ))}
          </div>

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all duration-200 self-start"
            >
              <Github size={13} aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
