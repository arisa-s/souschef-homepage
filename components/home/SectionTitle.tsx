import { FC } from 'react'

export interface SectionTitleProps {
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const SectionTitle: FC<SectionTitleProps> = ({ children, size }) => {
  return (
    <div className="z-10 flex items-center p-4 pb-6 italic sm:p-6">
      <h2 className="-mb-7 flex font-accent text-3xl [word-spacing:0.16rem] sm:text-5xl">
        {children}
      </h2>
    </div>
  )
}

export default SectionTitle
