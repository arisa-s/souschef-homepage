import { emailLink, instagramProfileLink, onelinkLink } from '@/constants'
import { getI18n } from '@/serverContexts'
import Link from 'next/link'
import { FC } from 'react'
import AppDowloadQR from '../shared/AppDownloadQR'

export const Footer: FC = ({}) => {
  const { t } = getI18n()
  return (
    <footer className="mx-auto flex max-w-7xl flex-col divide-y border-t">
      <div className="my-auto flex items-center justify-between px-2 py-6 sm:px-6 sm:py-0">
        <div className="flex flex-col">
          <SocialLink href={emailLink} label="Email" />
          <SocialLink href={instagramProfileLink} label="Instagram" />
        </div>
        <div className="flex flex-col text-center">
          <h1 className="font-accent text-xl font-black sm:text-2xl">{t('layout:appName')}</h1>
          <p className="text-xs text-text-secondary sm:text-sm">© 2024 Nekonote LLC</p>
        </div>
        <div className="hidden py-2 sm:flex">
          <AppDowloadQR />
        </div>
        <div className="sm:hidden">
          <SocialLink href={onelinkLink} label={t('home:downloadNow')} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between space-y-4 px-2 py-4 text-xs sm:flex-row sm:space-y-0 sm:px-6 sm:text-sm">
        <div className="flex space-x-4">
          <MiscLink href="/" label={t('layout:toc')} />
          <MiscLink href="/" label={t('layout:privacy')} />
        </div>
        <div>
          <p className="text-xs text-text-secondary">{t('layout:footerSign')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

const SocialLink: FC<{ href: string; label: string }> = ({ href, label }) => (
  <Link
    className="font-accent text-sm font-medium underline sm:text-lg"
    href={href}
    target="_blank"
  >
    {label}
  </Link>
)

const MiscLink: FC<{ href: string; label: string }> = ({ href, label }) => (
  <Link className="underline" href={href}>
    {label}
  </Link>
)
