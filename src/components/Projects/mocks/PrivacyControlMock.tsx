import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const LOCALES = [
  {
    code: 'EN',
    heading: 'We use cookies',
    body: 'We use optional cookies to improve your experience and analyze site traffic. You can opt out at any time.',
    accept: 'Accept All',
    decline: 'Decline Optional',
    settings: 'Cookie Settings',
  },
  {
    code: 'FR',
    heading: 'Nous utilisons des cookies',
    body: 'Nous utilisons des cookies optionnels pour améliorer votre expérience et analyser le trafic.',
    accept: 'Tout accepter',
    decline: 'Refuser',
    settings: 'Paramètres',
  },
  {
    code: 'DE',
    heading: 'Wir verwenden Cookies',
    body: 'Wir verwenden optionale Cookies, um Ihre Erfahrung zu verbessern und den Website-Traffic zu analysieren.',
    accept: 'Alle akzeptieren',
    decline: 'Ablehnen',
    settings: 'Einstellungen',
  },
  {
    code: 'JP',
    heading: 'クッキーを使用します',
    body: '私たちはオプションのクッキーを使用して、あなたの体験を向上させます。',
    accept: '全て受け入れる',
    decline: '拒否する',
    settings: '設定',
  },
]

export default function PrivacyControlMock() {
  const [idx, setIdx] = useState(0)
  const locale = LOCALES[idx]

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % LOCALES.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d0d14]"
      aria-label="Cookie consent component demo"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 bg-white/[0.03] border-b border-white/[0.08]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" aria-hidden="true" />
        <div className="ml-3 flex-1 bg-white/5 rounded text-white/25 text-[10px] py-0.5 px-2 font-mono truncate">
          fortune500client.com/privacy
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={locale.code}
            className="text-[10px] font-mono text-violet-400 bg-violet-900/30 px-2 py-0.5 rounded flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {locale.code}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Page content skeleton */}
      <div className="relative h-52 overflow-hidden">
        <div className="p-4 space-y-2" aria-hidden="true">
          <div className="h-2.5 bg-white/[0.04] rounded w-3/4" />
          <div className="h-2.5 bg-white/[0.04] rounded w-1/2" />
          <div className="h-2.5 bg-white/[0.04] rounded w-2/3" />
          <div className="h-2.5 bg-white/[0.04] rounded w-4/5" />
          <div className="h-2.5 bg-white/[0.04] rounded w-1/3" />
          <div className="h-2.5 bg-white/[0.04] rounded w-3/5" />
        </div>

        {/* Cookie banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={locale.code}
            className="absolute bottom-0 left-0 right-0 bg-[#13131e] border-t border-violet-600/20 p-3.5"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Cookie consent"
          >
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div>
                <p className="text-white text-xs font-semibold mb-1">{locale.heading}</p>
                <p className="text-white/45 text-[10px] leading-relaxed">{locale.body}</p>
              </div>
              <button
                className="text-white/25 hover:text-white/60 flex-shrink-0 mt-0.5 transition-colors"
                aria-label="Close cookie banner"
              >
                <X size={12} aria-hidden="true" />
              </button>
            </div>
            <div className="flex gap-2">
              <button className="text-[10px] px-3 py-1 rounded-md bg-violet-600 text-white font-semibold">
                {locale.accept}
              </button>
              <button className="text-[10px] px-3 py-1 rounded-md border border-white/10 text-white/55">
                {locale.decline}
              </button>
              <button className="text-[10px] px-3 py-1 rounded-md text-white/30">
                {locale.settings}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
