'use client'

import { useState } from 'react'

import { GlitchText } from '@/components/op/GlitchText'
import { cn } from '@/lib/utils'
import site from '@/data/site.json'

const { contact, availability, social } = site
const { form } = contact

const labelClass = 'font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-op-dim mb-1.5 block'
const fieldClass =
  'bg-op-input shadow-[inset_0_0_0_1px_var(--color-op-line-strong)] px-3 py-3 text-op-text text-[0.9375rem] outline-none focus:shadow-[inset_0_0_0_1px_var(--color-op-yellow)] w-full'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState(form.projectTypes[0])
  const [budget, setBudget] = useState(form.budgetTiers[0])
  const [timeline, setTimeline] = useState(form.timelines[0])
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const subject = `New project inquiry from ${name || 'a visitor'}`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      '',
      message,
    ].join('\n')
    window.location.href = `mailto:${social.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="bg-op-elev-alt">
      <div
        className="mx-auto max-w-[1320px] px-7"
        style={{ padding: 'clamp(80px,10vw,140px) 28px' }}
      >
        <p className="text-op-dim font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
          <span className="text-op-magenta">{contact.eyebrow}</span> {'>'} {contact.kicker}
        </p>

        <div className="mt-10 grid grid-cols-1 items-start gap-[60px] lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <GlitchText
              as="h2"
              className="anton tm-glitch text-op-text"
              style={{ fontSize: 'clamp(2.2rem,6vw,5rem)', lineHeight: 0.92 }}
            >
              {contact.heading}
            </GlitchText>

            <p className="text-op-muted my-6 max-w-[42ch] text-[1.1875rem] leading-[1.6]">
              {contact.subhead}
            </p>

            <ul className="flex flex-col gap-4">
              {contact.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="text-op-cyan w-[22px] font-mono">▸</span>
                  <span className="text-op-text text-[1.0625rem]">{point}</span>
                </li>
              ))}
            </ul>

            <div className="bg-op-elev mt-8 inline-flex items-center gap-2.5 px-[15px] py-2.5 shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]">
              <span className="tm-pulse-dot bg-op-yellow h-2 w-2 rounded-full" />
              <span className="text-op-muted font-mono text-[0.8125rem] tracking-[0.08em]">
                {availability.statusLine}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-op-elev clip-notch-20 p-[34px] shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]">
            <a
              href={contact.calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="clip-notch-12 bg-op-yellow text-op-base mb-6 flex w-full items-center justify-center gap-2 px-[26px] py-4 font-mono text-[0.875rem] font-bold tracking-[0.06em] uppercase transition-[filter,transform] hover:translate-y-[-2px] hover:[filter:drop-shadow(0_0_16px_rgba(252,238,10,0.6))]"
            >
              Book a 20-min call ▸
            </a>

            <div className="mb-6 flex items-center gap-3">
              <span className="bg-op-line-strong h-px flex-1" />
              <span className="text-op-dim font-mono text-[0.75rem]">OR SEND A NOTE</span>
              <span className="bg-op-line-strong h-px flex-1" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="op-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="op-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="op-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="op-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="op-project" className={labelClass}>
                    Project type
                  </label>
                  <select
                    id="op-project"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className={fieldClass}
                  >
                    {form.projectTypes.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="op-budget" className={labelClass}>
                    Budget tier
                  </label>
                  <select
                    id="op-budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className={fieldClass}
                  >
                    {form.budgetTiers.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="op-timeline" className={labelClass}>
                  Timeline
                </label>
                <select
                  id="op-timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className={fieldClass}
                >
                  {form.timelines.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="op-message" className={labelClass}>
                  What are you building?
                </label>
                <textarea
                  id="op-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A one-liner is plenty to start."
                  className={cn(fieldClass, 'resize-none')}
                />
              </div>

              <button
                type="submit"
                className="clip-notch-12 bg-op-console text-op-cyan inline-flex w-full items-center justify-center gap-2 px-6 py-4 font-mono font-semibold shadow-[inset_0_0_0_1px_var(--color-op-cyan)] transition-[filter,transform] hover:translate-y-[-2px] hover:[filter:drop-shadow(0_0_12px_rgba(0,229,255,0.5))]"
              >
                {form.submitLabel} ▸
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
