import { motion } from 'framer-motion'

const STAGES = [
  { id: 'gdelt', label: 'GDELT', sub: 'News Ingestion', color: '#06B6D4' },
  { id: 'deberta', label: 'DeBERTa', sub: 'NLI Classification', color: '#7C3AED' },
  { id: 'gpt', label: 'GPT-4o-mini', sub: 'RAG Summarization', color: '#7C3AED' },
  { id: 'output', label: 'Insights', sub: 'G-Eval Scored', color: '#10B981' },
]

export default function AI4SustainMock() {
  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d0d14] p-4"
      aria-label="AI4Sustain pipeline diagram"
    >
      <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider mb-4">
        Processing Pipeline
      </p>

      <div className="flex items-stretch gap-0">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="flex items-center flex-1 min-w-0">
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
            >
              <div
                className="rounded-lg p-2.5 border text-center"
                style={{
                  borderColor: `${stage.color}28`,
                  background: `${stage.color}0a`,
                }}
              >
                <p className="text-[11px] font-semibold truncate" style={{ color: stage.color }}>
                  {stage.label}
                </p>
                <p className="text-[9px] text-white/30 mt-0.5 truncate">{stage.sub}</p>
              </div>
            </motion.div>

            {i < STAGES.length - 1 && (
              <div className="flex-shrink-0 w-5 flex items-center justify-center overflow-hidden">
                <div className="w-full h-px relative" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div
                    className="absolute inset-y-0 w-3"
                    style={{ background: 'linear-gradient(to right, transparent, #7C3AED, transparent)' }}
                    animate={{ x: ['-12px', '20px'] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.1,
                      ease: 'linear',
                      delay: i * 0.28,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: 'Score', value: '91/100' },
          { label: 'Eval', value: 'G-Eval' },
          { label: 'Task', value: 'RAG QA' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-white/[0.02] border border-white/[0.05] px-2 py-1.5 text-center"
          >
            <p className="text-[9px] text-white/25 font-mono">{stat.label}</p>
            <p className="text-xs text-white/65 font-semibold mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
