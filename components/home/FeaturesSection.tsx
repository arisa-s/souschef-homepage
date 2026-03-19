'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [manualSelection, setManualSelection] = useState(false)
  const { t } = useTranslation()

  const selectedFeature = FEATURES[selectedIndex]

  useEffect(() => {
    if (manualSelection) return

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % FEATURES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [manualSelection])

  const handleFeatureClick = useCallback((index: number) => {
    setManualSelection(true)
    setSelectedIndex(index)
  }, [])

  const handleNextFeature = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % FEATURES.length)
  }, [])

  const handlePreviousFeature = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length)
  }, [])

  return (
    <div>
      <div className="mx-auto flex h-full max-w-7xl flex-col items-stretch sm:flex-row sm:items-start sm:divide-x sm:border-x">
        <div className="z-10 my-12 hidden w-full flex-col divide-y border-y sm:flex sm:w-1/2">
          {FEATURES.map((f, i) => (
            <FeatureDescription
              featureKey={f.key}
              key={f.key}
              selected={i === selectedIndex}
              onClick={() => handleFeatureClick(i)}
            />
          ))}
        </div>
        <div className="flex h-full w-full items-center justify-center sm:w-1/2">
          <div className="flex-col divide-y sm:my-12 sm:border-t">
            <div className="relative flex items-center overflow-hidden">
              <FeatureGraphic feature={selectedFeature} />
            </div>
            <div className="h-44 space-y-2 p-4 sm:hidden sm:h-52">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeature.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <h2 className="text-xl font-bold">{t(`feature.${selectedFeature.key}`)}</h2>
                  <p>{t(`feature.${selectedFeature.key}Desc`)}</p>
                </motion.div>
              </AnimatePresence>
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
      onClick={onClick}
      className={`cursor-pointer bg-surface-primary will-change-transform ${
        selected
          ? 'items-center justify-center space-y-6 sm:p-12'
          : 'hidden space-y-2 px-6 py-4 sm:flex'
      }`}
      whileHover={{
        scale: 1.05,
        boxShadow: 'inset 0 0 0 1px var(--border-primary, #e5e7eb)',
      }}
      animate={
        selected
          ? { scale: 1.05, boxShadow: 'inset 0 0 0 1px var(--border-primary, #e5e7eb)' }
          : { scale: 1, boxShadow: 'inset 0 0 0 0px transparent' }
      }
      transition={{ type: 'tween', duration: 0.25 }}
    >
      <h2 className={`${selected ? 'text-3xl font-semibold' : 'text-xl'}`}>
        {t(`feature.${featureKey}`)}
      </h2>
      <AnimatePresence>
        {selected && (
          <motion.p
            key={`${featureKey}-desc`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="m-auto overflow-hidden leading-8 tracking-wide md:mb-6 md:text-xl md:leading-9"
          >
            {t(`feature.${featureKey}Desc`)}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const FeatureGraphic = ({ feature }: { feature: { key: string; imagePath: string } }) => {
  const {
    i18n: { language },
  } = useTranslation()

  const imageUrl = useMemo(
    () =>
      language === 'en'
        ? feature.imagePath
        : feature.imagePath.replace('.png', `-${language}.png`),
    [language, feature.imagePath],
  )

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={feature.key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={imageUrl}
          alt={`${feature.key} head image`}
          width={3500}
          height={3000}
          style={{ transform: 'translateZ(0)' }}
          priority
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default FeaturesSection
