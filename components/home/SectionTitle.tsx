import { FC } from 'react'

export interface SectionTitleProps {
  children?: React.ReactNode
}

export const SectionTitle: FC<SectionTitleProps> = ({ children }) => {
  return (
    <div className="z-10 flex items-center p-4 pb-6 italic sm:p-6">
      <h1 className="-mb-7 flex font-accent text-3xl sm:text-5xl">{children}</h1>
    </div>
  )
}

export default SectionTitle
