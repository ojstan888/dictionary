import React from 'react'
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
} from 'react-router-dom'
import ModalWord from 'app/Components/Modals/Word.modal'
import ListOfWords from 'app/Pages/List/ListOfWords'
import ConfirmModal from 'app/Components/Modals/Confirm.modal'

export const Dashboard = () => {
  const { url } = useRouteMatch()
  const history = useHistory()
  return (
    <>
      <Switch>
        <Route path={`${url}/all`} render={() => <ListOfWords />} />
        <Redirect to={`${url}/all`} />
      </Switch>
      <Switch>
        <Route
          exact
          path={`${url}/all/new`}
          render={() => (
            <ModalWord isShow onShow={() => history.push(`${url}/all`)} />
          )}
        />
        <Route
          exact
          path={`${url}/all/edit/:id`}
          render={() => (
            <ModalWord isShow onShow={() => history.push(`${url}/all`)} />
          )}
        />
        <Route
          exact
          path={`${url}/all/remove/:id`}
          render={() => (
            <ConfirmModal isShow onShow={() => history.push(`${url}/all`)} />
          )}
        />
      </Switch>
    </>
  )
}
