import { Fragment } from 'react'

const DOT_COLORS = ['#FCEE0A', '#00E5FF', '#FCEE0A', '#00E5FF', '#FF2A6D']

/** Infinite horizontal ticker. Items are duplicated for a seamless -50% loop. */
export function Marquee({ items }: { items: string[] }) {
  const set = (key: string) => (
    <Fragment>
      {items.map((item, i) => (
        <Fragment key={`${key}-${i}`}>
          <span>{item}</span>
          <span aria-hidden style={{ color: DOT_COLORS[i % DOT_COLORS.length] }}>
            ▰
          </span>
        </Fragment>
      ))}
    </Fragment>
  )

  return (
    <div className="border-op-line flex overflow-hidden border-b bg-[#0A0D10]">
      <div className="bg-op-magenta text-op-base flex-none px-[18px] py-[14px] font-mono text-[0.75rem] font-medium tracking-[0.12em] uppercase">
        ◉ REC
      </div>
      <div className="flex items-center overflow-hidden">
        <div
          data-op-marquee
          className="flex w-max items-center gap-[36px] py-[14px] pl-[36px] font-mono text-[0.875rem] tracking-[0.1em] whitespace-nowrap text-[#7A8290] uppercase will-change-transform"
          style={{ animation: 'tm-marquee 30s linear infinite' }}
        >
          {set('a')}
          {set('b')}
        </div>
      </div>
    </div>
  )
}
