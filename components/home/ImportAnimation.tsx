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
  { id: 3, imageSrc: '/images/tiktok.png', x: 0 },
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
            <motion.svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="1280.000000pt"
              height="875.000000pt"
              viewBox="0 0 1280.000000 875.000000"
              preserveAspectRatio="xMidYMid meet"
              className="absolute -right-6 -top-2 h-12 w-12 sm:-right-8 sm:-top-4 sm:h-16 sm:w-16"
              variants={starsVariants}
              initial="hidden"
              animate="visible"
            >
              <g
                transform="translate(0.000000,875.000000) scale(0.100000,-0.100000)"
                fill="var(--text-primary)"
                stroke="none"
              >
                <path
                  d="M10365 8238 c-76 -227 -308 -902 -311 -906 -3 -5 -562 -159 -873
           -243 -124 -32 -226 -61 -229 -63 -2 -2 194 -156 434 -342 241 -187 443 -343
           450 -349 9 -8 9 -94 -1 -385 -8 -206 -17 -469 -21 -583 l-7 -209 464 332 c255
           183 468 334 474 336 5 2 249 -85 540 -194 292 -110 531 -198 533 -197 1 1 -12
           49 -29 106 -17 57 -89 302 -159 543 l-128 439 97 121 c183 228 611 774 611
           780 0 3 -61 6 -137 6 -163 0 -791 18 -919 26 l-91 6 -317 474 c-175 261 -319
           474 -321 474 -1 0 -28 -78 -60 -172z"
                />
                <path
                  d="M3403 7423 c-257 -762 -623 -1817 -636 -1829 -11 -11 -1264 -358
           -1817 -504 -405 -106 -540 -144 -539 -150 0 -3 30 -28 67 -55 117 -88 1826
           -1407 1841 -1421 12 -11 11 -104 -8 -646 -24 -697 -58 -1634 -64 -1770 -3 -49
           -3 -88 -1 -88 5 0 949 674 1528 1092 l479 346 61 -23 c34 -13 279 -104 546
           -203 267 -100 754 -282 1083 -405 328 -123 597 -219 597 -215 0 5 -54 189
           -119 411 -66 221 -192 652 -280 957 -88 305 -187 643 -219 751 l-58 195 304
           385 c168 211 503 636 745 944 242 308 447 568 455 578 8 9 12 20 8 24 -4 4
           -220 11 -479 15 -413 6 -1036 22 -1745 44 l-213 7 -427 636 c-235 350 -541
           808 -682 1018 -140 210 -258 383 -261 383 -3 0 -78 -215 -166 -477z"
                />
                <path
                  d="M9975 2928 c-66 -192 -122 -354 -125 -358 -5 -9 -282 -88 -575 -165
           -77 -20 -143 -40 -148 -44 -4 -4 126 -110 289 -236 l296 -229 -7 -210 c-4
           -116 -10 -290 -15 -386 -4 -96 -7 -176 -6 -177 1 -1 142 98 314 221 l312 223
           143 -53 c78 -29 238 -89 355 -132 193 -72 213 -78 208 -59 -3 12 -51 175 -105
           362 l-100 340 28 35 c107 134 441 561 441 563 0 2 -136 7 -302 11 -167 4 -338
           9 -381 13 l-78 6 -205 306 c-114 168 -209 309 -213 313 -3 4 -60 -151 -126
           -344z"
                />
              </g>
            </motion.svg>
          )}
        </motion.div>
      </a>
    </div>
  )
}

export default ImportAnimation
