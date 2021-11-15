import React, { useCallback } from 'react'
import { Dispatch } from 'redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useDispatch, useMappedState } from 'redux-react-hook'

import { IRootState } from '../reducers'

export function connect<T extends { actions: {} }>(
  containerName: string,
  mapStateToProps: (state: IRootState) => Omit<T, 'actions'>,
  mapDispatchToProps: (dispatch: Dispatch) => T['actions']
) {
  return (WrappedComponent: any) => {
    const Wrapper = (props: any, ref: any) => {
      const dispatch = useDispatch()
      const state = useMappedState(useCallback(mapStateToProps, []))

      const provideProps = {
        ...props,
        [containerName]: {
          ...state,
          actions: mapDispatchToProps(dispatch),
        },
      }

      return <WrappedComponent ref={ref} {...provideProps} />
    }
    return hoistNonReactStatics(React.forwardRef(Wrapper), WrappedComponent)
  }
}
