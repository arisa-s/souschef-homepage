'use client'

import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spinner from '../shared/Spinner'
import { CiImport } from 'react-icons/ci'

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
    <form onSubmit={handleSubmit} className="relative flex">
      <input
        name="query"
        placeholder={t('layout:importRecipePlaceholder')}
        className={`appearance-none px-4 py-2 text-lg placeholder:text-sm focus:bg-surface-primary focus:outline-0 sm:min-w-80`}
        value={inputValue}
        onChange={handleInputChange}
      />

      {errorMsg && <p className="absolute -bottom-6 mt-2 text-sm text-text-error">{errorMsg}</p>}
      <button
        type="submit"
        className="flex appearance-none flex-nowrap whitespace-nowrap text-nowrap bg-surface-component px-4 text-sm font-medium text-text-invert hover:opacity-80 disabled:opacity-50 sm:text-base"
        disabled={isLoading}
      >
        {isLoading ? <Spinner size="sm" /> : null}
        <p className="hidden sm:flex">{t('layout:importRecipe')}</p>
        <CiImport className="sm:hidden" />
      </button>
    </form>
  )
}

export default ImportRecipeForm
