'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { LiaFastForwardSolid, LiaStepBackwardSolid } from 'react-icons/lia'

const FEATURES = [
  { key: 'importRecipe', imagePath: '/images/home/importRecipe.gif' },
  { key: 'adjustIngredients', imagePath: '/images/home/adjustIngredients.gif' },
  { key: 'shoppingList', imagePath: '/images/home/shoppingList.gif' },
  { key: 'bookmark', imagePath: '/images/home/timers.gif' },
  { key: 'discover', imagePath: '/images/home/discover.gif' },
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
      <div className="mx-auto flex h-full max-w-6xl flex-col items-stretch divide-x border-x sm:flex-row sm:items-start">
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
            <FeatureGraphic feature={selectedFeature} />
            <div className="h-52 space-y-2 p-4 sm:hidden">
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
        selected ? 'space-y-6 border p-12 py-12 sm:scale-105' : 'hidden space-y-2 px-6 py-4 sm:flex'
      }`}
      whileHover={{ scale: 1.05, borderRightWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1 }}
      animate={
        selected
          ? { scale: 1.05, borderRightWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1 }
          : { scale: 1, borderRightWidth: 0, borderLeftWidth: 0, borderBottomWidth: 0 }
      }
      transition={{ duration: 0.3 }}
    >
      <h2 className={`${selected ? 'text-3xl font-bold' : 'text-xl'}`}>
        {t(`feature.${featureKey}`)}
      </h2>
      {selected && (
        <motion.p
          key={`${featureKey}-desc`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-lg"
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
      className="mx-12 my-auto"
    >
      <Image
        src={feature.imagePath}
        alt={`${feature.key} head image`}
        width={1000}
        height={500}
        className="h-56 object-cover sm:h-96 sm:w-full"
      />
    </motion.div>
  )
}

export default FeaturesSection
