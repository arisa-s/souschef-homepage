import { FC } from 'react'
import LanguageChanger from '../locale/LanguageChanger'
import Form from 'next/form'
import { getI18n } from '@/serverContexts'
import AppDowloadQR from '../shared/AppDownloadQR'
import Link from 'next/link'
import MobileNavMenu from './MobileNavMenu'

export const Navbar: FC = async ({}) => {
  const { t } = getI18n()

  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between border-b">
      <div className="flex flex-grow divide-x">
        <div className="flex flex-grow flex-col divide-y">
          <div className="flex justify-between px-4 py-3 md:px-6">
            <Link href="/">
              <h1 className="font-accent text-xl font-bold sm:text-3xl">{t('layout:appName')}</h1>
            </Link>
            <div className="hidden sm:flex">
              <LanguageChanger />
            </div>
            <div className="flex sm:hidden">
              <MobileNavMenu />
            </div>
          </div>
          <div className="flex flex-grow divide-x">
            <div className="w-4" />
            <Form action="https://trysouschef.com/scrape/" className="flex">
              <input
                name="query"
                placeholder={t('layout:importRecipePlaceholder')}
                className="px-4 py-2 text-sm placeholder:text-sm focus:outline-0 sm:min-w-60"
              />
              <button
                type="submit"
                className="bg-surface-component px-4 text-sm font-medium text-text-invert hover:opacity-80 sm:text-base"
              >
                {t('layout:importRecipe')}
              </button>
            </Form>
            <div className="ml-auto hidden divide-x sm:flex">
              <Link href="/blog" className="flex items-center px-4 hover:bg-surface-hover">
                {t('layout:blog')}
              </Link>

              <button className="px-4 hover:bg-surface-hover">{t('layout:about')}</button>
            </div>
          </div>
        </div>
        <div className="hidden py-2 pl-2 pr-6 sm:block">
          <AppDowloadQR />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
