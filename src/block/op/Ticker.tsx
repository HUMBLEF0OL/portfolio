import { Marquee } from '@/components/op/Marquee'
import site from '@/data/site.json'

export default function Ticker() {
  return <Marquee items={site.ticker.items} />
}
