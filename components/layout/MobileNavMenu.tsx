'use client'
import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import LanguageChanger from '../locale/LanguageChanger'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { emailLink, instagramProfileLink, onelinkLink } from '@/constants'

export const MobileNavMenu = ({}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <FiMenu />
      </button>
      {isOpen ? (
        <div className="absolute left-0 right-0 top-12 h-screen w-full flex-col items-center bg-surface-primary p-6">
          <div className="divide-y">
            <MenuItem href="/blog" label={t('layout:blog')} />
            <MenuItem href={onelinkLink} label={t('home:downloadNow')} />
            <MenuItem href={emailLink} label="Email" />
            <MenuItem href={instagramProfileLink} label="Instagram" />
          </div>
          <LanguageChanger />
          <div />
        </div>
      ) : null}
    </>
  )
}

const MenuItem = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="flex items-center p-4 text-lg hover:bg-surface-hover">
    {label}
  </Link>
)

export default MobileNavMenu
