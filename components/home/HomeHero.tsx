import ImportAnimation from './ImportAnimation'
import AppDownloadButtons from '../shared/AppDownloadButtons'
import { getI18n } from '@/serverContexts'
import ImportRecipeForm from '../layout/ImportRecipeForm'

export const HomeHero = ({}) => {
  const { t } = getI18n()
  return (
    <div className="w-full items-center justify-center">
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-12 sm:p-20 xl:border-x">
        <div className="items-center justify-center space-y-4 text-center sm:space-y-8">
          <h1 className="font-accent text-4xl font-medium [word-spacing:0.16rem] sm:text-6xl">
            {t('recipeToTable')}
          </h1>
          <p className="text-2xl text-text-secondary sm:text-3xl">{t('header')}</p>
        </div>
        <ImportAnimation />
        <div className="mx-auto mb-12 hidden w-full max-w-xl border-y sm:block">
          <ImportRecipeForm />
        </div>
        <div className="sm:hidden">
          <AppDownloadButtons />
        </div>
      </div>
    </div>
  )
}

export default HomeHero
