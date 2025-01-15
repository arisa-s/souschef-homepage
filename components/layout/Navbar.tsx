import { FC } from 'react'
import LanguageChanger from '../locale/LanguageChanger'
import { getI18n } from '@/serverContexts'
import AppDowloadQR from '../shared/AppDownloadQR'
import Link from 'next/link'
import MobileNavMenu from './MobileNavMenu'
import ImportRecipeForm from './ImportRecipeForm'

export const Navbar: FC = async ({}) => {
  const { t } = getI18n()

  return (
    <nav className="max-w-8xl mx-auto flex items-center justify-between border-b">
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
            {/* <ImportRecipeForm /> */}
            <div className="ml-auto hidden divide-x sm:flex">
              <Link href="/blog" className="flex items-center px-4 hover:bg-surface-hover">
                {t('layout:blog')}
              </Link>

              <Link href="/faq" className="flex items-center px-4 hover:bg-surface-hover">
                {t('layout:faq')}
              </Link>
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
