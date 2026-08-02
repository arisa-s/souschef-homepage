'use client'

import { LOCALE_MAPPING } from '@/constants'
import i18nConfig from '@/i18nConfig'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'

export default function LanguageChanger() {
  const { i18n, t } = useTranslation()
  const currentLocale = i18n.language
  const router = useRouter()
  const currentPathname = usePathname()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value

    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = date.toUTCString()
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    // redirect to the new locale path
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.defaultLocale) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  const currentLabel =
    LOCALE_MAPPING[currentLocale as keyof typeof LOCALE_MAPPING] === 'English'
      ? t('layout:english')
      : t('layout:japanese')

  return (
    <label className="relative inline-flex min-h-11 min-w-11 cursor-pointer items-center gap-1.5 rounded-sm px-2 text-sm text-black/70 transition-colors hover:text-black focus-within:rounded-sm focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-black">
      <span className="pointer-events-none select-none">{currentLabel}</span>
      <FiChevronDown
        aria-hidden
        className="pointer-events-none size-3.5 shrink-0 opacity-70"
      />
      <select
        aria-label={currentLabel}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={handleChange}
        value={currentLocale}
      >
        {Object.entries(LOCALE_MAPPING).map(([key, value]) => (
          <option key={key} value={key}>
            {value == 'English' ? t('layout:english') : t('layout:japanese')}
          </option>
        ))}
      </select>
    </label>
  )
}
