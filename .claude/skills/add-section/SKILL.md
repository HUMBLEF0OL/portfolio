---
name: add-section
description: Create a new page section/block component for this Next.js + next-intl portfolio, following the project's Server/Client split, i18n, and angular-frame design conventions. Use when asked to "add a section", "new block", "create a component for the page", "add About/Projects/Skills-style section", or build any new piece of the portfolio UI.
---

# Adding a new portfolio section

Page sections live in `src/block/` as PascalCase components and are composed into `src/app/[locale]/page.tsx` (or the relevant layout/page).

## Steps

1. **Create the component** in `src/block/MySection.tsx`.
   - Default to a **Server Component**. Add `"use client"` only if it needs hooks, browser APIs, or event handlers.
   - Type props explicitly; export `default`.
2. **Internationalize all text** (see the `add-translations` skill):
   - Server: `const t = await getTranslations("MySection")`.
   - Client: `const t = useTranslations("MySection")`.
   - Add the `MySection` namespace + keys to **every** file in `messages/*.json`.
3. **Style with the design system**:
   - Use `cn()` from `@/lib/utils` for conditional classes.
   - Use theme tokens: `bg-background`, `text-foreground`, `text-highlight`, `text-primary`, `border-border`.
   - Use angular-clip utilities (`angular-tl-br-lg`, `angular-all-md`, `angular-tl-tr-xl`, …) and corner components `TopLeft`/`TopRight`/`BottomLeft`/`BottomRight` from `@/block/AngularFrame` for the cyber aesthetic.
   - Use `next/image` `Image` for images.
4. **Static content** that isn't prose can go in `src/data/*.json`, referencing translations by `...Key` fields (see `project.json`).
5. **Wire it in**: import and render the section inside `src/app/[locale]/page.tsx` in the desired order.

## Template (server component)

```tsx
import { getTranslations } from 'next-intl/server';
import { TopLeft, BottomRight } from '@/block/AngularFrame';
import { cn } from '@/lib/utils';

const MySection = async () => {
    const t = await getTranslations('MySection');
    return (
        <section id="my-section" className="relative w-full px-4 py-8 flex flex-col gap-10">
            <TopLeft width={44} height={44} />
            <BottomRight width={44} height={44} />
            <h1 className="text-[30px] lg:text-[42px] uppercase text-highlight">{t('sectionTitle')}</h1>
            <p className="text-foreground">{t('body')}</p>
        </section>
    );
};

export default MySection;
```

## Rules
- No hardcoded user-facing strings — always go through next-intl.
- Keep all 12 locale files in sync.
- Don't add a `tailwind.config` (Tailwind v4 is CSS-first in `src/app/globals.css`).
- Match the spacing/typography patterns of existing blocks (e.g. `Projects.tsx`, `About.tsx`).

## Verify
- `npm run lint` and `npm run build`.
