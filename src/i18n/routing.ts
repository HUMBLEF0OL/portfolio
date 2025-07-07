import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'es', 'fr', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', "ar", 'hi', 'de'],

    // Used when no locale matches
    defaultLocale: 'en'
});