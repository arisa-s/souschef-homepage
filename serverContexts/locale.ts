import { DEFAULT_LOCALE } from '@/constants'
import { i18n } from 'i18next'
import serverContext from 'server-only-context'
import { LocaleOptions } from '../constants/locales'

export const [getI18n, setI18n] = serverContext({} as i18n)
export const [getLocale, setLocale] = serverContext<LocaleOptions>(DEFAULT_LOCALE)
