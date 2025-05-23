'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { LiaFastForwardSolid, LiaStepBackwardSolid } from 'react-icons/lia'

const FEATURES = [
  { key: 'bookmark', imagePath: '/images/home/bookmark.png' },
  { key: 'importRecipe', imagePath: '/images/home/importRecipe.png' },
  { key: 'convertYoutube', imagePath: '/images/home/convertYoutube.png' },
  { key: 'shoppingList', imagePath: '/images/home/shoppingList.png' },
  { key: 'adjustIngredients', imagePath: '/images/home/adjustIngredients.png' },
  { key: 'discover', imagePath: '/images/home/discover.png' },
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
      <div className="mx-auto flex h-full max-w-7xl flex-col items-stretch sm:flex-row sm:items-start sm:divide-x sm:border-x">
        <div className="z-10 my-12 hidden w-full flex-col divide-y border-y sm:flex sm:w-1/2">
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
          <div className="flex-col divide-y sm:my-12 sm:border-t">
            <div className="flex items-center">
              <FeatureGraphic feature={selectedFeature} />
            </div>
            <div className="h-44 space-y-2 p-4 sm:hidden sm:h-52">
              <h2 className="text-xl font-bold">{t(`feature.${selectedFeature.key}`)}</h2>
              <p>{t(`feature.${selectedFeature.key}Desc`)}</p>
            </div>
            <div className="w-full divide-x text-lg">
              <button
                className="w-1/2 border-b py-4 hover:bg-surface-hover"
                onClick={handlePreviousFeature}
              >
                <LiaStepBackwardSolid className="mx-auto" />
              </button>
              <button
                className="w-1/2 border-b py-4 hover:bg-surface-hover"
                onClick={handleNextFeature}
              >
                <LiaFastForwardSolid className="mx-auto" />
              </button>
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
      whileHover={{
        scale: 1.05,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '--border-primary',
      }}
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
          className="m-auto leading-8 tracking-wide md:mb-6 md:text-xl md:leading-9"
        >
          {t(`feature.${featureKey}Desc`)}
        </motion.p>
      )}
    </motion.div>
  )
}

export const FeatureGraphic = ({ feature }: { feature: { key: string; imagePath: string } }) => {
  const {
    i18n: { language },
  } = useTranslation()

  const imageUrl =
    language == 'en' ? feature.imagePath : feature.imagePath.replace('.png', `-${language}.png`)

  return (
    <Image
      src={imageUrl}
      alt={`${feature.key} head image`}
      width={3500}
      height={3000}
      style={{ transform: 'translateZ(0)' }}
    />
  )
}

export default FeaturesSection
