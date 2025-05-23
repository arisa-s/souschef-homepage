'use client'

import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spinner from '../shared/Spinner'

const ImportRecipeForm: FC = () => {
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
    <form onSubmit={handleSubmit} className="relative flex divide-x border-x">
      <input
        name="query"
        placeholder={t('layout:importRecipePlaceholder')}
        className={`w-full appearance-none px-4 py-2 text-lg placeholder:text-sm focus:bg-surface-primary focus:outline-0 md:min-w-80 md:max-w-full`}
        value={inputValue}
        onChange={handleInputChange}
      />

      {errorMsg && <p className="absolute -bottom-6 mt-2 text-sm text-text-error">{errorMsg}</p>}

      <button
        type="submit"
        className="flex min-w-40 flex-nowrap items-center justify-center text-nowrap bg-surface-component-secondary px-4 text-center text-sm font-medium text-text-primary hover:opacity-80 disabled:opacity-50 sm:text-base"
        disabled={isLoading}
      >
        {isLoading ? <Spinner size="sm" /> : t('layout:importRecipe')}
      </button>
    </form>
  )
}

export default ImportRecipeForm
