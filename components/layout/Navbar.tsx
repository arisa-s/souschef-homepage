import { FC } from 'react'
import LanguageChanger from '../locale/LanguageChanger'
import Form from 'next/form'
import { getI18n } from '@/serverContexts'
import AppDowloadQR from '../shared/AppDownloadQR'
import Link from 'next/link'

export const Navbar: FC = async ({}) => {
  const { t } = getI18n()

  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between border-b">
      <div className="flex flex-grow divide-x">
        <div className="flex flex-grow flex-col divide-y">
          <div className="flex justify-between px-6 py-3">
            <Link href="/">
              <h1 className="font-accent text-3xl font-bold">{t('layout:appName')}</h1>
            </Link>
            <LanguageChanger />
          </div>
          <div className="flex flex-grow divide-x">
            <div className="w-4" />
            <Form action="https://trysouschef.com/scrape/" className="flex">
              <input
                name="query"
                placeholder={t('layout:importRecipePlaceholder')}
                className="min-w-60 px-4 py-2 text-sm placeholder:text-sm focus:outline-0"
              />
              <button
                type="submit"
                className="bg-surface-component px-4 font-medium text-text-invert hover:opacity-80"
              >
                {t('layout:importRecipe')}
              </button>
            </Form>
            <div className="ml-auto flex divide-x">
              <Link href="/blog" className="flex items-center px-4 hover:bg-surface-hover">
                {t('layout:blog')}
              </Link>

              <button className="px-4 hover:bg-surface-hover">{t('layout:about')}</button>
            </div>
          </div>
        </div>
        <div className="py-2 pl-2 pr-6">
          <AppDowloadQR />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
