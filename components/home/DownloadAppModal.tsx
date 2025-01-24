'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import AppDowloadQR from '../shared/AppDownloadQR'
import Link from 'next/link'
import { androidDownloadLink, iosDownloadLink } from '@/constants'
import { Modal } from '../shared/Modal'
import Image from 'next/image'
import { HiArrowLongDown } from 'react-icons/hi2'

export const DownloadAppModal = () => {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const modalShown = localStorage.getItem('modalShown')
    if (!modalShown) {
      setTimeout(() => {
        setShowModal(true)
      }, 8000)
    }
  }, [])

  if (!showModal) return null

  return (
    <Modal>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="relative flex flex-col items-center space-y-6 bg-surface-primary py-12 sm:p-12"
      >
        <h1 className="mb-2 font-accent text-xl md:text-2xl">{t('qrCodeDownloadTitle')}</h1>

        <p className="text-3xl md:text-4xl">(っ˘ڡ˘ς)</p>
        <div className="flex items-center space-x-6 text-text-secondary">
          <HiArrowLongDown />
          <p>{t('downloadNow')}</p>
          <HiArrowLongDown />
        </div>
        <div className="hidden md:block">
          <AppDowloadQR width={120} />
        </div>
        <div className="flex w-full flex-col items-center justify-center space-y-2 text-lg sm:space-x-12 md:hidden">
          <Link href={iosDownloadLink} className="max-w-44" target="_blank">
            <Image
              src="/images/app-store-download-light.png"
              alt="adjustIngredients"
              width={1000}
              height={500}
            />
          </Link>
          <Link href={androidDownloadLink} className="max-w-44" target="_blank">
            <Image
              src="/images/google-play-download-light.png"
              alt="adjustIngredients"
              width={1000}
              height={500}
            />
          </Link>
        </div>
      </motion.div>
    </Modal>
  )
}

export default DownloadAppModal
