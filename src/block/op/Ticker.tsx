import { getMessages } from 'next-intl/server'
import { Marquee } from '@/components/op/Marquee'
import type { TickerContent } from '@/types/content'

export default async function Ticker() {
  const messages = await getMessages()
  const ticker = messages.Ticker as TickerContent
  return <Marquee items={ticker.items} />
}
