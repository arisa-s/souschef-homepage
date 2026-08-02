import { FC, ReactNode } from 'react'
import { HiArrowLongLeft } from 'react-icons/hi2'
import BackButton from './BackButton'

export type LegalPageLayoutProps = {
  children: ReactNode
  title: string
  lastUpdated?: string
}

export const LegalPageLayout: FC<LegalPageLayoutProps> = ({
  children,
  title,
  lastUpdated,
}) => {
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-3xl px-6 pb-24 pt-6 sm:px-10 sm:pt-16">
        <header className="relative mb-12 sm:mb-16">
          <BackButton className="absolute left-0 top-1 z-10 text-2xl text-text-primary sm:top-2 sm:text-4xl">
            <HiArrowLongLeft />
          </BackButton>
          <div className="px-10 text-center sm:px-14">
            <h1 className="font-accent text-3xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {title}
            </h1>
            {lastUpdated ? (
              <p className="mt-4 text-sm text-text-secondary sm:text-base">{lastUpdated}</p>
            ) : null}
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}

export default LegalPageLayout
