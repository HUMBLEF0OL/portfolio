'use client'

import config from '@/data/config.json'
import { useEffect } from 'react'

/**
 * Permanent DevTools console greeting for curious visitors (recruiters,
 * engineers, the merely nosy). This is NOT an easter egg — it always runs,
 * independent of EASTER_EGGS_ENABLED, and carries no personal content.
 */
export function ConsoleGreeting() {
  useEffect(() => {
    const { social, contact } = config

    const banner = [
      '    _   __  __ ___ _____   ___    _   _  _   _   ',
      '   /_\\ |  \\/  |_ _|_   _| | _ \\  /_\\ | \\| | /_\\  ',
      '  / _ \\| |\\/| || |  | |   |   / / _ \\| .` |/ _ \\ ',
      ' /_/ \\_\\_|  |_|___| |_|   |_|_\\/_/ \\_\\_|\\_/_/ \\_\\',
    ].join('\n')

    const headStyle =
      'color:#fcee0a;font-family:monospace;font-size:12px;line-height:1.15;font-weight:700'
    const roleStyle =
      'color:#00e5ff;font-family:monospace;font-size:13px;font-weight:700;letter-spacing:1px'
    const labelStyle = 'color:#7e8896;font-family:monospace'
    const linkStyle = 'color:#eaeef0;font-family:monospace'
    const ctaStyle =
      'color:#07080a;background:#fcee0a;font-family:monospace;font-weight:700;padding:2px 6px'

    /* eslint-disable no-console */
    console.log(`%c${banner}`, headStyle)
    console.log('%cSENIOR PRODUCT ENGINEER · FULL-STACK · AI · TOOLING', roleStyle)
    console.log(
      '%cStatus: %cavailable for new work — let’s build something.',
      labelStyle,
      linkStyle
    )
    console.log(
      '%cGitHub    %c' +
        social.github +
        '\n%cLinkedIn  %c' +
        social.linkedin +
        '\n%cEmail     %c' +
        social.email +
        '\n%cBook a call %c' +
        contact.calLink,
      labelStyle,
      linkStyle,
      labelStyle,
      linkStyle,
      labelStyle,
      linkStyle,
      labelStyle,
      linkStyle
    )
    console.log('%c ▸ Like what you see? Reach out. ', ctaStyle)
    /* eslint-enable no-console */
  }, [])

  return null
}
