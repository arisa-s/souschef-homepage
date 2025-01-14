'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { androidDownloadLink, iosDownloadLink } from '@/constants'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'

const FEATURES = [
  { key: 'importRecipe', imagePath: '/images/home/importRecipe.png' },
  { key: 'adjustIngredients', imagePath: '/images/home/adjustIngredients.png' },
  { key: 'shoppingList', imagePath: '/images/home/shoppingList.png' },
  { key: 'bookmark', imagePath: '/images/home/bookmark.png' },
  { key: 'discover', imagePath: '/images/home/discover.png' },
  { key: 'convertYoutube', imagePath: '/images/home/convertYoutube.png' },
]
export const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(FEATURES[0])
  const [manualSelection, setManualSelection] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (manualSelection) return

    const interval = setInterval(() => {
      setSelectedFeature((prevFeature) => {
        const currentIndex = FEATURES.findIndex((f) => f.key === prevFeature.key)
        const nextIndex = (currentIndex + 1) % FEATURES.length
        return FEATURES[nextIndex]
      })
    }, 5000) // Change every 10 seconds

    return () => clearInterval(interval)
  }, [manualSelection])

  const handleFeatureClick = (feature: (typeof FEATURES)[number]) => {
    setManualSelection(true)
    setSelectedFeature(feature)
  }

  const handleNextFeature = () => {
    setSelectedFeature((prevFeature) => {
      const currentIndex = FEATURES.findIndex((f) => f.key === prevFeature.key)
      const nextIndex = (currentIndex + 1) % FEATURES.length
      return FEATURES[nextIndex]
    })
  }

  const handlePreviousFeature = () => {
    setSelectedFeature((prevFeature) => {
      const currentIndex = FEATURES.findIndex((f) => f.key === prevFeature.key)
      const nextIndex = (currentIndex - 1 + FEATURES.length) % FEATURES.length
      return FEATURES[nextIndex]
    })
  }

  return (
    <div>
      <div className="mx-auto flex h-full max-w-6xl flex-col items-stretch sm:flex-row sm:items-start sm:divide-x sm:border-x">
        <div className="my-12 hidden w-full flex-col divide-y border-y sm:flex sm:w-1/2">
          {FEATURES.map((f) => (
            <FeatureDescription
              featureKey={f.key}
              key={f.key}
              selected={f.key === selectedFeature.key}
              onClick={() => handleFeatureClick(f)}
            />
          ))}
        </div>
        <div className="flex h-full w-full items-center justify-center sm:w-1/2">
          <div className="flex-col divide-y">
            <div className="flex items-center sm:border-t">
              <button className="h-56 text-3xl sm:hidden" onClick={handlePreviousFeature}>
                <HiArrowLongLeft />
              </button>
              <FeatureGraphic feature={selectedFeature} />
              <button className="h-56 text-3xl sm:hidden" onClick={handleNextFeature}>
                <HiArrowLongRight />
              </button>
            </div>
            <div className="h-44 space-y-2 p-4 sm:hidden sm:h-52">
              <h2 className="text-xl font-bold">{t(`feature.${selectedFeature.key}`)}</h2>
              <p>{t(`feature.${selectedFeature.key}Desc`)}</p>
            </div>
            <div className="flex w-full justify-center space-x-6 p-6 text-lg sm:space-x-12">
              <Link href={iosDownloadLink} className="max-w-40" target="_blank">
                <Image
                  src="/images/app-store-download-light.png"
                  alt="adjustIngredients"
                  width={1000}
                  height={500}
                />
              </Link>
              <Link href={androidDownloadLink} className="max-w-40" target="_blank">
                <Image
                  src="/images/google-play-download-light.png"
                  alt="adjustIngredients"
                  width={1000}
                  height={500}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const FeatureDescription = ({
  featureKey,
  onClick,
  selected = false,
}: {
  featureKey: string
  onClick: () => void
  selected?: boolean
}) => {
  const { t } = useTranslation()
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`cursor-pointer bg-surface-primary ${
        selected
          ? 'items-center justify-center space-y-6 border sm:scale-105 sm:p-12'
          : 'hidden space-y-2 px-6 py-4 sm:flex'
      }`}
      whileHover={{ scale: 1.05, borderRightWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1 }}
      animate={
        selected
          ? { scale: 1.05, borderRightWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1 }
          : { scale: 1, borderRightWidth: 0, borderLeftWidth: 0, borderBottomWidth: 0 }
      }
      transition={{ duration: 0.3 }}
    >
      <h2 className={`${selected ? 'text-3xl font-semibold' : 'text-xl'}`}>
        {t(`feature.${featureKey}`)}
      </h2>
      {selected && (
        <motion.p
          key={`${featureKey}-desc`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="m-auto"
        >
          {t(`feature.${featureKey}Desc`)}
        </motion.p>
      )}
    </motion.div>
  )
}

export const FeatureGraphic = ({ feature }: { feature: { key: string; imagePath: string } }) => {
  return (
    <motion.div
      key={feature.key}
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: -90, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        duration: 0.7,
      }}
      className="mx-4 my-auto sm:mx-12"
    >
      <Image
        src={feature.imagePath}
        alt={`${feature.key} head image`}
        width={1000}
        height={500}
        className="object-cover sm:h-auto sm:w-full"
      />
    </motion.div>
  )
}

export default FeaturesSection
