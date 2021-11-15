import React, { useEffect } from 'react'

import { setAuthToken } from 'app/utils/set.auth.token'
import { RootRoutes } from 'app/routes/root.routes'
import {
  AuthContainer,
  IAuthContainerProps,
} from 'app/containers/auth.container'
import { Loading } from 'app/Components/Loading/Loading'

const tokenApp = localStorage.getItem('token')

if (tokenApp) {
  setAuthToken(tokenApp)
}

const App: React.FC<{ containerAuth: IAuthContainerProps }> = (props) => {
  const { isAuthenticated, userLoading } = props.containerAuth
  const { loadUser } = props.containerAuth.actions

  useEffect(() => {
    loadUser()
  }, [])

  if (userLoading) {
    return <Loading classes={'absolute-center'} />
  }

  return <RootRoutes isAuth={isAuthenticated} />
}

export default AuthContainer(App)
