import { motion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'

const LINKS = [
  {
    label: 'Email',
    href: 'mailto:dpradhan@iu.edu',
    Icon: Mail,
    display: 'dpradhan@iu.edu',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/duhita-pradhan',
    Icon: Linkedin,
    display: 'linkedin.com/in/duhita-pradhan',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/duhita-pradhan',
    Icon: Github,
    display: 'github.com/duhita-pradhan',
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 px-6 border-t border-white/[0.05]"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-violet-400 text-xs uppercase tracking-widest mb-5">
            Let&apos;s work together
          </p>

          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug tracking-tight"
          >
            Open to Fall 2026 co-ops, internships
            <br className="hidden sm:block" />
            and full-time 2027 roles.
          </h2>

          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Particularly interested in frontend platform, design systems, and AI-integrated
            product engineering.
          </p>

          <nav aria-label="Contact links" className="flex flex-wrap justify-center gap-4">
            {LINKS.map(({ label, href, Icon, display }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl glass hover:border-violet-600/30 hover:bg-violet-600/[0.05] text-white/55 hover:text-white transition-all duration-200 font-medium text-sm"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                aria-label={`${label}: ${display}`}
              >
                <Icon size={15} aria-hidden="true" />
                <span>{display}</span>
              </motion.a>
            ))}
          </nav>

          <p className="mt-16 text-white/12 text-xs font-mono">
            Duhita Pradhan · Built with React, TypeScript &amp; Framer Motion ·{' '}
            {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
