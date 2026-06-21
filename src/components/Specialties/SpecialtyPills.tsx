const ITEMS = [
  'React',
  'TypeScript',
  'Design Systems',
  'Component APIs',
  'Accessibility (WCAG)',
  'CSS Architecture',
  'Performance Optimization',
  'Monorepo (NX)',
  'Bit Cloud',
  'CSS / SCSS',
  'Next.js',
  'Redux',
  'Responsive UI',
  'Figma-to-Code',
  'CI/CD',
  'Node.js',
]

export default function SpecialtyPills() {
  // Doubled for seamless loop
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <section aria-label="Frontend specialties" className="py-10 overflow-hidden border-y border-white/5">
      <div className="relative">
        {/* Fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'linear-gradient(to right, #0A0A0F, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'linear-gradient(to left, #0A0A0F, transparent)' }}
        />

        <div
          className="flex gap-3 animate-scroll"
          style={{ width: 'max-content' }}
          aria-hidden="true"
        >
          {doubled.map((item, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-5 py-2.5 rounded-full border border-white/[0.08] text-white/50 text-sm font-medium font-mono bg-white/[0.02] flex-shrink-0"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Accessible hidden list */}
      <p className="sr-only">Specialties: {ITEMS.join(', ')}</p>
    </section>
  )
}
