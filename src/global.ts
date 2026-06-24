import messages from '../messages/en.json'

// next-intl v4 type augmentation: makes useTranslations/useMessages/getMessages
// key- and shape-aware from en.json (the source of truth). Missing or renamed
// keys then fail `tsc`.
declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages
  }
}
