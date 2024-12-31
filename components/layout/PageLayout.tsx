import { FC } from 'react'
import { HiArrowLongLeft } from 'react-icons/hi2'
import BackButton from './BackButton'

export interface PageLayoutProps {
  children: React.ReactElement
  title: string
}

export const PageLayout: FC<PageLayoutProps> = ({ children, title }) => {
  return (
    <div className="max-w-8xl relative mx-auto flex min-h-screen">
      <main className="flex w-full flex-col divide-y">
        <div className="flex flex-col items-start justify-center space-y-4 p-6 sm:mx-auto sm:items-center">
          <BackButton className="text-2xl sm:absolute sm:left-6 sm:text-5xl">
            <HiArrowLongLeft />
          </BackButton>
          <h1 className="font-accent text-2xl font-medium sm:text-5xl">{title}</h1>
        </div>
        {children}
      </main>
    </div>
  )
}

export default PageLayout
