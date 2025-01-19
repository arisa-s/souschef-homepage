'use client'
import React, { useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import { onelinkLink } from '@/constants'

interface SocialIcon {
  id: number
  imageSrc: string
  x: number
}

const socialIcons: SocialIcon[] = [
  { id: 1, imageSrc: '/images/instagram.png', x: -200 },
  { id: 2, imageSrc: '/images/pinterest.png', x: -100 },
  { id: 3, imageSrc: '/images/safari.png', x: 0 },
  { id: 4, imageSrc: '/images/youtube.png', x: 100 },
  { id: 5, imageSrc: '/images/chrome.png', x: 200 },
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.5 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 1 },
  visible: (i: number) => ({
    x: socialIcons[i]?.x * -0.6 || 0,
    y: 100,
    opacity: 0,
    transition: { delay: i * 0.7, duration: 1 },
  }),
}

const appVariants: Variants = {
  initial: { scale: 1, opacity: 1, x: '-50%', y: '0%' },
  final: {
    x: '-50%',
    y: '-50%',
    scale: 1.5,
    opacity: 1,
    transition: { delay: socialIcons.length * 0.3 + 0.5, duration: 0.5, ease: 'easeOut' },
  },
}

const starsVariants: Variants = {
  visible: {
    opacity: 1,
    rotate: [0, 10, -10, 10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
}

const ImportAnimation: React.FC = () => {
  const [allIconsHidden, setAllIconsHidden] = useState(false)
  const [showStars, setShowStars] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setAllIconsHidden(true), socialIcons.length * 0.3 * 1000 + 500)
    const starsTimeout = setTimeout(
      () => setShowStars(true),
      socialIcons.length * 0.3 * 1000 + 500 + 2600
    )
    return () => {
      clearTimeout(timeout)
      clearTimeout(starsTimeout)
    }
  }, [])

  return (
    <div className="p relative flex flex-col items-center justify-center overflow-hidden py-12">
      <motion.div
        className="mb-32 flex space-x-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socialIcons.map(({ id, imageSrc }, index) => (
          <motion.div
            key={id}
            className="h-12 w-12 rounded-full sm:h-16 sm:w-16"
            variants={itemVariants}
            custom={index}
          >
            <img src={imageSrc} alt="social-icon" className="h-full w-full" />
          </motion.div>
        ))}
      </motion.div>
      <a href={onelinkLink} target="_blank">
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-lg border bg-surface-primary sm:h-28 sm:w-28"
          variants={appVariants}
          initial="initial"
          animate={allIconsHidden ? 'final' : 'initial'}
        >
          <p className="font-brand text-5xl font-bold text-text-primary sm:text-6xl">S</p>
          {showStars && (
            <motion.img
              src="/images/stars.svg"
              alt="Stars"
              className="absolute -right-6 -top-2 h-12 w-12 sm:-right-8 sm:-top-4 sm:h-16 sm:w-16"
              variants={starsVariants}
              initial="hidden"
              animate="visible"
            />
          )}
        </motion.div>
      </a>
    </div>
  )
}

export default ImportAnimation
