import { FC } from 'react'
import { HiArrowLongLeft } from 'react-icons/hi2'
import BackButton from './BackButton'

export interface PageLayoutProps {
  children: React.ReactElement
  title: string
  description?: string
}

export const PageLayout: FC<PageLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="relative mx-auto w-full max-w-[1080px] px-5 pb-20 pt-4 sm:px-8 sm:pt-8">
      <div className="mx-auto mb-8 flex w-full max-w-[680px] flex-col items-center sm:mb-12">
        <BackButton className="mb-6 text-2xl text-text-secondary sm:text-3xl">
          <HiArrowLongLeft />
        </BackButton>

        <h1 className="text-center font-accent text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <h2 className="mt-6 text-center text-base text-text-secondary">{description}</h2>
        ) : null}
      </div>
      {children}
    </div>
  )
}

export default PageLayout
