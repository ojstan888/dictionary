import React, { useState } from 'react'
import Button from '@mui/material/Button'
import './header.scss'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { ROUTES } from 'app/consts'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  AuthContainer,
  IAuthContainerProps,
} from 'app/containers/auth.container'

interface IHeader {
  isLogged?: boolean
  children?: React.ReactNode
  containerAuth: IAuthContainerProps
}

const Header: React.FC<IHeader> = ({ isLogged, ...props }) => {
  const { logout } = props.containerAuth.actions
  const { user } = props.containerAuth
  return (
    <>
      <header>
        <div className="header global-container">
          <div className="header__logo">
            <Link to={ROUTES.default} className="link">
              <Typography>
                {user?.name ? (
                  <span>
                    Hello, <strong>{user.name}</strong>
                  </span>
                ) : (
                  'Dictionary'
                )}
              </Typography>
            </Link>
          </div>
          <div className="header__tools">
            {isLogged ? (
              <div className="flex-align">
                <Link to={ROUTES.isAuthed.dashboardNew} className="link">
                  <Button>Add new word</Button>
                </Link>{' '}
                <LogoutIcon
                  onClick={logout}
                  color="primary"
                  className="ml-10-px clickable"
                />
              </div>
            ) : null}
          </div>
        </div>
      </header>
    </>
  )
}

export default AuthContainer(Header)
