'use client'

import { useEffect, useState } from 'react'

/** Live HH:MM:SS clock in a fixed timezone (default IST). Mono, cyan. */
export function LiveClock({
  timezone = 'IST',
  offsetMinutes = 330,
}: {
  timezone?: string
  offsetMinutes?: number
}) {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const fmt = () => {
      const now = new Date()
      const utc = now.getTime() + now.getTimezoneOffset() * 60000
      const tz = new Date(utc + offsetMinutes * 60000)
      const hh = String(tz.getHours()).padStart(2, '0')
      const mm = String(tz.getMinutes()).padStart(2, '0')
      const ss = String(tz.getSeconds()).padStart(2, '0')
      setTime(`${hh}:${mm}:${ss} ${timezone}`)
    }
    fmt()
    const id = setInterval(fmt, 1000)
    return () => clearInterval(id)
  }, [timezone, offsetMinutes])

  return (
    <span suppressHydrationWarning className="text-op-cyan min-w-[116px] font-mono tabular-nums">
      {time || `00:00:00 ${timezone}`}
    </span>
  )
}
