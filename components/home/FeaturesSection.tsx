'use client'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Image from 'next/image'

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
  return (
    <div>
      <div className="mx-auto flex h-full max-w-6xl flex-col items-stretch divide-x border-x sm:flex-row sm:items-start">
        <div className="my-12 flex w-full flex-col divide-y border-y sm:w-1/2">
          {FEATURES.map((f) => (
            <FeatureDescription
              featureKey={f.key}
              key={f.key}
              selected={f.key === selectedFeature.key}
              onClick={() => setSelectedFeature(f)}
            />
          ))}
        </div>
        <div className="flex h-full w-full items-center justify-center sm:w-1/2">
          <FeatureGraphic feature={selectedFeature} />
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
      className={`cursor-pointer bg-surface-primary ${selected ? 'space-y-6 p-12 py-12' : 'space-y-2 px-6 py-4'}`}
      whileHover={{ scale: 1.04, borderRightWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className={`${selected ? 'text-4xl' : 'text-xl'}`}>{t(`feature.${featureKey}`)}</h1>
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
        className="my-auto"
      />
    </motion.div>
  )
}

export default FeaturesSection
