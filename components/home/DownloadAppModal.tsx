'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import AppDowloadQR from '../shared/AppDownloadQR'
import Link from 'next/link'
import { onelinkLink } from '@/constants'
import { Modal } from '../shared/Modal'

export const DownloadAppModal = () => {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const modalShown = localStorage.getItem('modalShown')
    if (!modalShown) {
      setShowModal(true)
    }
  }, [])

  if (!showModal) return null

  return (
    <Modal>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="relative flex flex-col items-center space-y-6 bg-surface-primary p-6 sm:p-12"
      >
        <h1 className="mb-2 font-accent text-2xl italic md:text-3xl">{t('qrCodeDownloadTitle')}</h1>
        <div className="hidden sm:block">
          <AppDowloadQR width={120} />
        </div>
        <Link href={onelinkLink}>
          <button
            className="bg-surface-component px-4 py-2 font-medium text-text-invert hover:opacity-80"
            onClick={() => {
              localStorage.setItem('modalShown', 'true')
              setShowModal(false)
            }}
          >
            {t('downloadNow')}
          </button>
        </Link>
      </motion.div>
    </Modal>
  )
}

export default DownloadAppModal
