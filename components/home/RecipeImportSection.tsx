'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spinner from '../shared/Spinner'
import SectionTitle from './SectionTitle'

export const RecipeImportSection = ({}) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputValue }),
      })

      if (!response.ok) {
        throw new Error(t('layout:scrapeErrorMessage'))
      }

      const data = await response.json()

      if (data.recipeId) {
        window.location.href = `https://trysouschef.app/recipes/${data.recipeId}`
      } else {
        throw new Error(t('layout:scrapeErrorMessage'))
      }
    } catch {
      setErrorMsg(t('common:genericErrorMessage'))
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full items-center divide-y sm:items-start">
      <SectionTitle>Experience AI assissted cooking experience</SectionTitle>
      <div className="flex flex-col items-center justify-center">
        <div className="sm:mx-24 sm:border-x">
          <p className="text-center">Import your favorite recipe to start...</p>
          <form onSubmit={handleSubmit} className="relative flex p-12">
            <input
              name="query"
              placeholder={t('layout:importRecipePlaceholder')}
              className={`w-52 appearance-none px-4 py-2 text-lg placeholder:text-sm focus:bg-surface-primary focus:outline-0 md:min-w-80`}
              value={inputValue}
              onChange={handleInputChange}
            />

            {errorMsg && (
              <p className="absolute -bottom-6 mt-2 text-sm text-text-error">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="flex flex-nowrap items-center text-nowrap bg-surface-component px-4 text-sm font-medium text-text-invert hover:opacity-80 disabled:opacity-50 sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : t('layout:importRecipe')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RecipeImportSection
