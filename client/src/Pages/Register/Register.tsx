import { Button, Grid, Modal, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import { EMAIL_REGEX, ROUTES } from 'app/consts'
import { styleForLoginBox } from 'app/utils/common'
import {
  AuthContainer,
  IAuthContainerProps,
} from 'app/containers/auth.container'
import { Loading } from 'app/Components/Loading/Loading'

const initialState = {
  name: '',
  email: '',
  password: '',
}

const Register: React.FC<{ containerAuth: IAuthContainerProps }> = (props) => {
  const { registration, reset } = props.containerAuth.actions
  const { error, loading } = props.containerAuth
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  })

  const onSubmit = (data: typeof initialState) => {
    // TODO: add more abstract validation
    if (!EMAIL_REGEX.test(data.email)) {
      return setError('email', {
        type: 'manual',
        message: 'Enter the correct email',
      })
    }
    if (data.password.length < 6) {
      return setError('password', {
        type: 'manual',
        message: 'Password should be more than 5 characters',
      })
    }
    const { name, email, password } = data
    registration(name, email, password)
  }

  useEffect(() => {
    return () => {
      reset()
    }
  }, [])

  return (
    <div>
      <Box sx={styleForLoginBox(460)} className="fullscreen-modal-box">
        {loading ? (
          <Loading classes={'absolute-center'} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} columns={12}>
              <Grid item xs={12}>
                <h1>Registration</h1>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      required
                      label="Name"
                      {...field}
                      className="col-12"
                    />
                  )}
                />
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
                    <>
                      <TextField
                        required
                        type="password"
                        label="Password"
                        {...field}
                        className="col-12"
                      />
                      {errors.password && (
                        <p className="error-text">{errors.password.message}</p>
                      )}
                    </>
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
              <Button className="col-12" type="submit" variant="contained">
                Registration
              </Button>
            </Grid>

            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Link className="link mt-30-px" to={ROUTES.login}>
                Have an account? Login
              </Link>
            </Grid>
          </form>
        )}
      </Box>
    </div>
  )
}

export default AuthContainer(Register)
