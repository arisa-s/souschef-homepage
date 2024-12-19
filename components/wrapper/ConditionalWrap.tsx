import React from 'react'

interface ConditionalWrapProps {
  children: React.ReactElement
  condition: boolean
  wrapper: (children: React.ReactElement) => JSX.Element
}

const ConditionalWrap: React.FC<ConditionalWrapProps> = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children
export default ConditionalWrap
