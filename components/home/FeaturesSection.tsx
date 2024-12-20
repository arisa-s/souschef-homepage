'use client'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { LiaFastForwardSolid, LiaStepBackwardSolid } from 'react-icons/lia'

export interface FeaturesSectionProps {}

const FEATURES = [
  { key: 'importRecipe', imagePath: '/images/home/importRecipe.gif' },
  { key: 'adjustIngredients', imagePath: '/images/home/adjustIngredients.gif' },
  { key: 'shoppingList', imagePath: '/images/home/shoppingList.gif' },
  { key: 'timers', imagePath: '/images/home/timers.gif' },
  { key: 'discover', imagePath: '/images/home/discover.gif' },
  { key: 'convertYoutube', imagePath: '/images/home/convertYoutube.png' },
]
export const FeaturesSection: FC<FeaturesSectionProps> = () => {
  const [selectedFeature, setSelectedFeature] = useState(FEATURES[0])
  const [manualSelection, setManualSelection] = useState(false)

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

  return (
    <div>
      <div className="mx-auto flex h-full max-w-6xl flex-col items-stretch divide-x border-x sm:flex-row sm:items-start">
        <div className="my-12 flex w-full flex-col divide-y border-y sm:w-1/2">
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
            <div className="w-full divide-x text-lg">
              <button className="w-1/2 border-b py-4 hover:bg-surface-hover">
                <LiaStepBackwardSolid className="mx-auto" />
              </button>
              <button className="w-1/2 border-b py-4 hover:bg-surface-hover">
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
        selected ? 'scale-105 space-y-6 border p-12 py-12' : 'space-y-2 px-6 py-4'
      }`}
      whileHover={{ scale: 1.05, borderRightWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1 }}
      animate={
        selected
          ? { scale: 1.05, borderRightWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1 }
          : { scale: 1, borderRightWidth: 0, borderLeftWidth: 0, borderBottomWidth: 0 }
      }
      transition={{ duration: 0.3 }}
    >
      <h2 className={`${selected ? 'text-3xl' : 'text-xl'}`}>{t(`feature.${featureKey}`)}</h2>
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
      className="my-auto"
    >
      <Image
        src={feature.imagePath}
        alt={`${feature.key} head image`}
        width={1000}
        height={500}
        className="h-96 w-full object-cover"
      />
    </motion.div>
  )
}

export default FeaturesSection
