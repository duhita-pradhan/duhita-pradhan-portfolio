import { motion } from 'framer-motion'
import { Stethoscope, Loader2, FileText, MessageSquare } from 'lucide-react'

export default function PrepMDMock() {
  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d0d14] relative"
      aria-label="PrepMD: in active development"
    >
      {/* Active development overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d0d14]/75 backdrop-blur-[2px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <Loader2 size={22} className="text-cyan-500 mb-2" />
        </motion.div>
        <span className="text-cyan-400 text-xs font-mono font-semibold">In active development</span>
        <span className="text-white/30 text-[10px] mt-1 font-mono">Expected: Fall 2026</span>
      </div>

      {/* Blurred background content */}
      <div className="p-4 opacity-25 select-none pointer-events-none" aria-hidden="true">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope size={15} className="text-cyan-400" />
          <span className="text-white text-sm font-bold">PrepMD</span>
          <span className="ml-auto text-[10px] font-mono text-cyan-400/60 bg-cyan-900/20 px-2 py-0.5 rounded-full border border-cyan-700/20">
            AI-Powered
          </span>
        </div>

        <div className="rounded-lg border border-white/10 p-3 mb-2.5">
          <div className="flex items-center gap-1.5 mb-2">
            <FileText size={10} className="text-violet-400" />
            <p className="text-white/60 text-[10px] font-semibold">Appointment Summary</p>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 bg-white/10 rounded w-full" />
            <div className="h-1.5 bg-white/10 rounded w-4/5" />
            <div className="h-1.5 bg-white/10 rounded w-3/5" />
          </div>
        </div>

        <div className="rounded-lg border border-white/10 p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <MessageSquare size={10} className="text-cyan-400" />
            <p className="text-white/60 text-[10px] font-semibold">Discharge Notes (Plain Language)</p>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 bg-white/10 rounded w-full" />
            <div className="h-1.5 bg-white/10 rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
  )
}
