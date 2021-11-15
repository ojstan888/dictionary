import React from 'react'
import { Dispatch } from 'redux'
import { IRootState } from '../reducers'
import {
  IAuthState,
  registration,
  login,
  loadUser,
  logout,
  reset,
} from '../reducers/auth'
import { connect } from './connect'

export type IAuthContainerProps = IAuthState & {
  actions: {
    registration: typeof registration
    login: typeof login
    loadUser: typeof loadUser
    logout: typeof logout
    reset: typeof reset
  }
}

const mapStateToProps = (state: IRootState) => state.auth

const mapDispatchToProps = (
  dispatch: Dispatch
): IAuthContainerProps['actions'] => ({
  registration: (name, email, password) =>
    dispatch<any>(registration(name, email, password)),
  login: (email, password) => dispatch<any>(login(email, password)),
  loadUser: () => dispatch<any>(loadUser()),
  logout: () => dispatch<any>(logout()),
  reset: () => dispatch<any>(reset()),
})

export const AuthContainer = connect<IAuthContainerProps>(
  'containerAuth',
  mapStateToProps,
  mapDispatchToProps
)
