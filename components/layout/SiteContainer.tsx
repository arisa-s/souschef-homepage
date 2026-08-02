import { ElementType, FC, ReactNode } from 'react'

type SiteContainerProps = {
  children: ReactNode
  className?: string
  as?: ElementType
}

const containerClassName =
  'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8'

export const SiteContainer: FC<SiteContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
}) => {
  return (
    <Component
      className={`${containerClassName}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Component>
  )
}

export default SiteContainer
