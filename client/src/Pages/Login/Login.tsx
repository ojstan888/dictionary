import { Button, Grid, Modal, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'

import { ROUTES, EMAIL_REGEX } from 'app/consts'
import { styleForLoginBox } from 'app/utils/common'
import {
  AuthContainer,
  IAuthContainerProps,
} from 'app/containers/auth.container'
import { Loading } from 'app/Components/Loading/Loading'

const initialState = {
  email: '',
  password: '',
}

const Login: React.FC<{ containerAuth: IAuthContainerProps }> = (props) => {
  const { login, reset } = props.containerAuth.actions
  const { error, loading } = props.containerAuth
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  })

  const onSubmit = (data: { email: string; password: string }) => {
    // TODO: add more abstract validation
    if (!EMAIL_REGEX.test(data.email)) {
      return setError('email', {
        type: 'manual',
        message: 'Enter the correct email',
      })
    }
    const { email, password } = data
    login(email, password)
  }

  useEffect(() => {
    return () => {
      reset()
    }
  }, [])

  return (
    <>
      <Box sx={styleForLoginBox(370)} className="fullscreen-modal-box">
        {loading ? (
          <Loading classes={'absolute-center'} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} columns={12}>
              <Grid item xs={12}>
                <h1>Login</h1>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <TextField
                        required
                        label="Email"
                        {...field}
                        className="col-12"
                      />
                      {errors.email && (
                        <p className="error-text">{errors.email.message}</p>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <TextField
                      required
                      type="password"
                      label="Password"
                      {...field}
                      className="col-12"
                    />
                  )}
                />
              </Grid>
            </Grid>

            {error ? (
              <p className="error-text mt-10-px one-line">
                Error! Check your data and try again
              </p>
            ) : null}

            <Grid item xs={12} style={{ marginTop: 20 }}>
              <Button type="submit" variant="contained" className="col-12">
                Login
              </Button>
            </Grid>

            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Link className="link mt-30-px" to={ROUTES.register}>
                Don't have an account? Register
              </Link>
            </Grid>
          </form>
        )}
      </Box>
    </>
  )
}

export default AuthContainer(Login)
