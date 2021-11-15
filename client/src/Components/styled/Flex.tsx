import React from 'react'
import styled from 'styled-components'

interface IFlex {
  direction?: string
  align?: string
  justify?: string
  margin?: string
  width?: number | string
  children?: any
  className?: string
}

const StyledFlex = styled.div<IFlex>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'stretch'};
  justify-content: ${({ justify }) => justify || 'stretch'};
  margin: ${({ margin }) => margin || '0'};
  width: ${({ width }) => width || '100%'};
`

const Flex = (props: IFlex) => {
  return <StyledFlex {...props} />
}

export default Flex
