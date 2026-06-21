import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VARIANTS = [
  {
    label: 'E-Commerce',
    groups: [
      { title: 'Shop', links: ['Products', 'Deals', 'New Arrivals'] },
      { title: 'Support', links: ['Help Center', 'Returns', 'Track Order'] },
      { title: 'Company', links: ['About', 'Careers', 'Press'] },
    ],
    social: ['Twitter', 'Instagram', 'Facebook'],
  },
  {
    label: 'B2B SaaS',
    groups: [
      { title: 'Product', links: ['Features', 'Pricing', 'Changelog'] },
      { title: 'Developers', links: ['Docs', 'API', 'SDKs'] },
      { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
    ],
    social: ['Twitter', 'LinkedIn', 'GitHub'],
  },
  {
    label: 'Enterprise',
    groups: [
      { title: 'Solutions', links: ['Enterprise', 'Government', 'Healthcare'] },
      { title: 'Partners', links: ['Resellers', 'Integrations', 'Consultants'] },
      { title: 'Resources', links: ['Blog', 'Webinars', 'Case Studies'] },
    ],
    social: ['LinkedIn', 'YouTube', 'Twitter'],
  },
]

export default function FooterMock() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % VARIANTS.length), 2800)
    return () => clearInterval(t)
  }, [])

  const variant = VARIANTS[idx]

  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d0d14]"
      aria-label="Footer component demo"
    >
      {/* Controls */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border-b border-white/[0.08]">
        <span className="text-white/25 text-[10px] font-mono">variant=</span>
        <div className="flex gap-1.5">
          {VARIANTS.map((v, i) => (
            <button
              key={v.label}
              onClick={() => setIdx(i)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all duration-200 ${
                i === idx
                  ? 'bg-violet-600 text-white'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.footer
          key={variant.label}
          className="p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28 }}
          aria-label={`Footer variant: ${variant.label}`}
        >
          <div className="grid grid-cols-3 gap-4 mb-4">
            {variant.groups.map((group) => (
              <div key={group.title}>
                <p className="text-white/30 text-[9px] font-mono uppercase tracking-wider mb-2">
                  {group.title}
                </p>
                <ul className="space-y-1.5" role="list">
                  {group.links.map((link) => (
                    <li key={link}>
                      <span className="text-white/55 text-[10px] hover:text-violet-400 cursor-pointer transition-colors block">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between gap-2">
            <span className="text-white/20 text-[9px] font-mono">
              © 2025 Client Corp. All rights reserved.
            </span>
            <div className="flex gap-2.5">
              {variant.social.map((s) => (
                <span
                  key={s}
                  className="text-white/25 text-[9px] font-mono hover:text-white/60 cursor-pointer transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.footer>
      </AnimatePresence>
    </div>
  )
}
