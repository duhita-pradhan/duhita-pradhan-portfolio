import { useState, useEffect, useRef } from 'react'

const WORDS = [
  'Design Systems',
  'Component Libraries',
  'Accessible UI',
  'Performance-first React',
]

const TYPE_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_AFTER = 1800
const PAUSE_BEFORE = 400

export function useTypingEffect(): string {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'waiting'>('typing')
  const charIndex = useRef(0)

  useEffect(() => {
    const current = WORDS[wordIndex]

    if (phase === 'typing') {
      if (charIndex.current < current.length) {
        const t = setTimeout(() => {
          charIndex.current++
          setDisplayed(current.slice(0, charIndex.current))
        }, TYPE_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), PAUSE_AFTER)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'deleting') {
      if (charIndex.current > 0) {
        const t = setTimeout(() => {
          charIndex.current--
          setDisplayed(current.slice(0, charIndex.current))
        }, DELETE_SPEED)
        return () => clearTimeout(t)
      } else {
        setPhase('waiting')
      }
    }

    if (phase === 'waiting') {
      const t = setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length)
        setPhase('typing')
      }, PAUSE_BEFORE)
      return () => clearTimeout(t)
    }
  }, [phase, wordIndex, displayed])

  return displayed
}
