'use client'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ImportRecipeForm: FC = () => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const decodedInput = encodeURIComponent(inputValue)
    window.location.href = `https://trysouschef.com/scrape/${encodeURIComponent(decodedInput)}`
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        name="query"
        placeholder={t('layout:importRecipePlaceholder')}
        className="px-4 py-2 text-sm placeholder:text-sm focus:outline-0 sm:min-w-60"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="bg-surface-component px-4 text-sm font-medium text-text-invert hover:opacity-80 sm:text-base"
      >
        {t('layout:importRecipe')}
      </button>
    </form>
  )
}

export default ImportRecipeForm
