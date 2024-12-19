'use client'

import { LOCALE_MAPPING } from '@/constants'
import i18nConfig from '@/i18nConfig'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

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

  return (
    <select
      className="cursor-pointer px-4 py-2 text-sm focus:outline-0"
      onChange={handleChange}
      value={currentLocale}
    >
      {Object.entries(LOCALE_MAPPING).map(([key, value]) => (
        <option key={key} value={key}>
          {value == 'English' ? t('layout:english') : t('layout:japanese')}
        </option>
      ))}
    </select>
  )
}
