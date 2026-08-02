import { FC } from 'react'
import Link from 'next/link'
import { getI18n } from '@/serverContexts'

import LanguageChanger from '../locale/LanguageChanger'
import MobileNavMenu from './MobileNavMenu'
import SiteContainer from './SiteContainer'

const GUIDE_LINK = 'https://nekonote-llc.mintlify.app/getting-started/what-is-souschef'
const IMPORTING_GUIDE_LINK =
  'https://nekonote-llc.mintlify.app/importing/supported-sources'

const navLinkClassName =
  'text-sm text-black/70 transition-colors hover:text-black hover:underline hover:underline-offset-4 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'

export const Navbar: FC = async ({}) => {
  const { t } = getI18n()

  return (
    <nav className="w-full">
      <SiteContainer className="flex items-center justify-between py-4">
        <Link href="/">
          <h1 className="font-accent text-2xl font-bold md:text-3xl">
            {t('layout:appName')}
          </h1>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href={GUIDE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClassName}
          >
            {t('layout:gettingStarted')}
          </Link>
          <Link
            href={IMPORTING_GUIDE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClassName}
          >
            {t('layout:importingGuide')}
          </Link>
          <LanguageChanger />
        </div>
        <div className="flex md:hidden">
          <MobileNavMenu />
        </div>
      </SiteContainer>
    </nav>
  )
}

export default Navbar
