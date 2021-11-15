import axios from 'axios'
import { Dispatch } from 'redux'

import { SUCCESS, REQUEST, FAILURE } from '../shared/actions'
import { setAuthToken } from '../utils/set.auth.token'
import { IUser } from 'app/models/user.model'
import { API_URL } from 'app/http'

const ACTION_TYPES = {
  REGISTRATION: 'REGISTRATION',
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  USER_LOAD: 'USER_LOAD',
  RESET: 'RESET',
}

const token = localStorage.getItem('token')

const initialState = {
  token: token,
  isAuthenticated: false,
  loading: false,
  userLoading: true,
  user: {} as IUser,
  error: null,
}

export type IAuthState = Readonly<typeof initialState>

const authReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case REQUEST(ACTION_TYPES.REGISTRATION):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case REQUEST(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: true,
        error: null,
      }
    case REQUEST(ACTION_TYPES.USER_LOAD):
      return {
        ...state,
        isAuthenticated: false,
        userLoading: true,
      }
    case SUCCESS(ACTION_TYPES.LOGIN):
      localStorage.setItem('token', payload.data.token)
      setAuthToken(payload.data.token)
      return {
        ...state,
        loading: false,
        error: null,
        ...payload.data,
        isAuthenticated: true,
      }
    case SUCCESS(ACTION_TYPES.REGISTRATION):
      localStorage.setItem('token', payload.data.token)
      setAuthToken(payload.data.token)
      return {
        ...state,
        ...payload.data,
        loading: false,
        error: null,
        isAuthenticated: true,
      }
    case SUCCESS(ACTION_TYPES.USER_LOAD):
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userLoading: false,
        user: payload.data,
      }
    case FAILURE(ACTION_TYPES.REGISTRATION):
    case FAILURE(ACTION_TYPES.LOGIN):
    case FAILURE(ACTION_TYPES.USER_LOAD):
    case ACTION_TYPES.LOGOUT:
      localStorage.removeItem('token')
      setAuthToken('')
      return {
        ...state,
        error: payload,
        loading: false,
        isAuthenticated: false,
        userLoading: false,
        token: null,
        user: null,
      }
    case ACTION_TYPES.RESET:
      return {
        ...state,
        loading: false,
        userLoading: false,
        error: null,
      }
    default:
      return state
  }
}

// actions

export const registration =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch) => {
    try {
      await dispatch({
        type: ACTION_TYPES.REGISTRATION,
        payload: axios.post(`${API_URL}/users`, {
          name,
          email,
          password,
        }),
      })
    } catch (e) {}
  }

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      await dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: axios.post(`${API_URL}/auth`, {
          email,
          password,
        }),
      })
    } catch (error) {}
  }

export const loadUser = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem('token')

  if (token) {
    setAuthToken(token)
  }

  try {
    await dispatch({
      type: ACTION_TYPES.USER_LOAD,
      payload: axios.get(`${API_URL}/auth`),
    })
  } catch (error) {}
}

export const logout = () => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPES.LOGOUT,
  })
}

export const reset = () => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPES.RESET,
  })
}

export default authReducer
