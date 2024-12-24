'use client'
import { useState } from 'react'
import { FiChevronRight, FiMenu } from 'react-icons/fi'
import LanguageChanger from '../locale/LanguageChanger'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { emailLink, instagramProfileLink, onelinkLink } from '@/constants'
import { motion } from 'framer-motion'

export const MobileNavMenu = ({}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  const variants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    closed: { opacity: 0, y: '-100%', transition: { duration: 0.6 } },
  }

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <FiMenu />
      </button>
      {isOpen ? (
        <motion.div
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={variants}
          className="absolute left-0 right-0 top-12 z-20 h-screen w-full flex-col items-center bg-surface-primary p-6"
        >
          <div className="divide-y" onClick={() => setIsOpen(false)}>
            <MenuItem href="/blog" label={t('layout:blog')} />
            <MenuItem href={onelinkLink} label={t('home:downloadNow')} />
            <MenuItem href={emailLink} label="Email" />
            <MenuItem href={instagramProfileLink} label="Instagram" />
          </div>
          <div className="mt-12 flex w-full justify-end">
            <LanguageChanger />
          </div>
          <div />
        </motion.div>
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
