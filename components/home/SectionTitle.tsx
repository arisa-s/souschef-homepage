import { FC } from 'react'

export interface SectionTitleProps {
  children?: React.ReactNode
}

export const SectionTitle: FC<SectionTitleProps> = ({ children }) => {
  return (
    <div className="z-10 flex items-center px-6 pb-6 pt-6 italic">
      <h1 className="-mb-7 flex font-accent text-5xl">{children}</h1>
    </div>
  )
}

export default SectionTitle
