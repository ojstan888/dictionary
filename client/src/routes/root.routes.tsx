import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { ROUTES } from 'app/consts'
import Login from 'app/Pages/Login/Login'
import Register from 'app/Pages/Register/Register'
import { Dashboard } from 'app/Pages/Dashboard/Dashboard'
import { MainWrapper } from 'app/Components/Main/MainWrapper'

export const RootRoutes = ({ isAuth }: { isAuth: boolean }) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path={ROUTES.isAuthed.dashboard}>
          <MainWrapper isLogged>
            <Dashboard />
          </MainWrapper>
        </Route>
        <Redirect to={ROUTES.isAuthed.dashboard} />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path={ROUTES.default} exact>
        <MainWrapper>
          <Login />
        </MainWrapper>
      </Route>
      <Route path={ROUTES.login} exact>
        <MainWrapper>
          <Login />
        </MainWrapper>
      </Route>
      <Route path={ROUTES.register} exact>
        <MainWrapper>
          <Register />
        </MainWrapper>
      </Route>
      <Redirect to={ROUTES.default} />
    </Switch>
  )
}
