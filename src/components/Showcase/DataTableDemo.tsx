import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface Row {
  company: string
  founded: number
  marketCap: string
  ceo: string
  hq: string
}

const DATA: Row[] = [
  { company: 'Apple', founded: 1976, marketCap: '$2.9T', ceo: 'Tim Cook', hq: 'Cupertino, CA' },
  { company: 'Microsoft', founded: 1975, marketCap: '$3.1T', ceo: 'Satya Nadella', hq: 'Redmond, WA' },
  { company: 'Alphabet', founded: 1998, marketCap: '$2.0T', ceo: 'Sundar Pichai', hq: 'Mountain View, CA' },
  { company: 'Amazon', founded: 1994, marketCap: '$1.8T', ceo: 'Andy Jassy', hq: 'Seattle, WA' },
  { company: 'Meta', founded: 2004, marketCap: '$1.4T', ceo: 'Mark Zuckerberg', hq: 'Menlo Park, CA' },
  { company: 'NVIDIA', founded: 1993, marketCap: '$3.2T', ceo: 'Jensen Huang', hq: 'Santa Clara, CA' },
  { company: 'Tesla', founded: 2003, marketCap: '$700B', ceo: 'Elon Musk', hq: 'Austin, TX' },
  { company: 'Salesforce', founded: 1999, marketCap: '$230B', ceo: 'Marc Benioff', hq: 'San Francisco, CA' },
  { company: 'Adobe', founded: 1982, marketCap: '$185B', ceo: 'Shantanu Narayen', hq: 'San Jose, CA' },
  { company: 'Oracle', founded: 1977, marketCap: '$390B', ceo: 'Safra Catz', hq: 'Austin, TX' },
  { company: 'Shopify', founded: 2006, marketCap: '$95B', ceo: 'Tobi Lütke', hq: 'Ottawa, Canada' },
  { company: 'Stripe', founded: 2010, marketCap: '$65B', ceo: 'Patrick Collison', hq: 'San Francisco, CA' },
  { company: 'Vercel', founded: 2015, marketCap: '$3.25B', ceo: 'Guillermo Rauch', hq: 'San Francisco, CA' },
  { company: 'Linear', founded: 2019, marketCap: '$0.3B', ceo: 'Karri Saarinen', hq: 'San Francisco, CA' },
  { company: 'Figma', founded: 2012, marketCap: '$12.5B', ceo: 'Dylan Field', hq: 'San Francisco, CA' },
  { company: 'Notion', founded: 2013, marketCap: '$10B', ceo: 'Ivan Zhao', hq: 'San Francisco, CA' },
  { company: 'Anthropic', founded: 2021, marketCap: '$60B', ceo: 'Dario Amodei', hq: 'San Francisco, CA' },
  { company: 'OpenAI', founded: 2015, marketCap: '$157B', ceo: 'Sam Altman', hq: 'San Francisco, CA' },
  { company: 'GitHub', founded: 2008, marketCap: '$7.5B', ceo: 'Thomas Dohmke', hq: 'San Francisco, CA' },
  { company: 'Atlassian', founded: 2002, marketCap: '$44B', ceo: 'Mike Cannon-Brookes', hq: 'Sydney, Australia' },
]

type SortKey = keyof Row
type SortDir = 'asc' | 'desc'

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'company', label: 'Company' },
  { key: 'founded', label: 'Founded' },
  { key: 'marketCap', label: 'Market Cap' },
  { key: 'ceo', label: 'CEO' },
  { key: 'hq', label: 'HQ' },
]

const PAGE_SIZE = 5

export default function DataTableDemo() {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return DATA
    return DATA.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(q)))
  }, [search])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const safeP = Math.min(page, totalPages - 1)
  const pageRows = sorted.slice(safeP * PAGE_SIZE, (safeP + 1) * PAGE_SIZE)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(0)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Filter companies, CEOs, cities…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(0)
          }}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 transition-colors"
          aria-label="Filter table rows"
        />
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Tech companies">
            <thead>
              <tr className="border-b border-white/[0.07]">
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="text-left px-4 py-3 text-white/35 font-mono text-[11px] uppercase tracking-wider cursor-pointer hover:text-white/65 transition-colors select-none whitespace-nowrap"
                    aria-sort={
                      sortKey === col.key
                        ? sortDir === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {col.label}
                      {sortKey === col.key ? (
                        sortDir === 'asc' ? (
                          <ChevronUp size={11} className="text-violet-400" aria-hidden="true" />
                        ) : (
                          <ChevronDown size={11} className="text-violet-400" aria-hidden="true" />
                        )
                      ) : (
                        <ChevronsUpDown size={11} className="text-white/15" aria-hidden="true" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {pageRows.length === 0 ? (
                  <tr key="empty">
                    <td colSpan={5} className="text-center py-8 text-white/25 text-sm">
                      No results for &quot;{search}&quot;
                    </td>
                  </tr>
                ) : (
                  pageRows.map((row, i) => (
                    <motion.tr
                      key={row.company}
                      className="border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <td className="px-4 py-3 text-white font-medium">{row.company}</td>
                      <td className="px-4 py-3 text-white/55 font-mono">{row.founded}</td>
                      <td className="px-4 py-3 text-white/55 font-mono">{row.marketCap}</td>
                      <td className="px-4 py-3 text-white/55">{row.ceo}</td>
                      <td className="px-4 py-3 text-white/40 text-xs">{row.hq}</td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-white/35">
        <span>
          {sorted.length === 0
            ? '0 results'
            : `${safeP * PAGE_SIZE + 1}–${Math.min((safeP + 1) * PAGE_SIZE, sorted.length)} of ${sorted.length}`}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safeP === 0}
            className="p-1.5 rounded-lg hover:bg-white/[0.07] disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label="Previous page"
          >
            <ChevronLeft size={14} aria-hidden="true" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-7 h-7 rounded-lg text-xs transition-all ${
                i === safeP ? 'bg-violet-600 text-white' : 'hover:bg-white/[0.07] text-white/35'
              }`}
              aria-label={`Page ${i + 1}`}
              aria-current={i === safeP ? 'page' : undefined}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={safeP >= totalPages - 1}
            className="p-1.5 rounded-lg hover:bg-white/[0.07] disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label="Next page"
          >
            <ChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
