import axios from 'axios'
import { Dispatch } from 'redux'

import { SUCCESS, REQUEST, FAILURE } from '../shared/actions'
import { IWord } from 'app/models/word.model'
import { API_URL } from 'app/http'

const ACTION_TYPES = {
  FETCH_WORDS: 'FETCH_WORDS',
  FETCH_WORD: 'FETCH_WORD',
  ADD_WORD: 'ADD_WORD',
  EDIT_WORD: 'EDIT_WORD',
  DELETE_WORD: 'DELETE_WORD',
  RESET_WORDS: 'RESET_WORDS',
  RESET_WORD: 'RESET_WORD',
  SHOULD_UPDATE_LIST: 'SHOULD_UPDATE_LIST',
}

interface IPageProp {
  page: number
  limit: number
}

const initialState = {
  loading: false,
  loadingWord: false,
  error: null,
  words: [] as IWord[],
  totalCountWords: 0,
  previous: {} as IPageProp,
  next: {} as IPageProp,
  word: {} as IWord,
  shouldUpdateList: false,
}

export type IWordsState = Readonly<typeof initialState>

const wordsReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action
  switch (type) {
    case REQUEST(ACTION_TYPES.FETCH_WORD):
      return {
        ...state,
        error: null,
        loadingWord: true,
      }
    case REQUEST(ACTION_TYPES.DELETE_WORD):
      return {
        ...state,
        error: null,
        loadingWord: true,
      }
    case REQUEST(ACTION_TYPES.FETCH_WORDS):
      return {
        ...state,
        loading: true,
        error: null,
        // words: [],
        shouldUpdateList: false,
      }
    case REQUEST(ACTION_TYPES.ADD_WORD):
    case REQUEST(ACTION_TYPES.EDIT_WORD):
      return {
        ...state,
        error: null,
        shouldUpdateList: false,
        loadingWord: true,
      }
    case SUCCESS(ACTION_TYPES.FETCH_WORDS):
      return {
        ...state,
        loading: false,
        error: null,
        words: Array.isArray(payload.data.results) ? payload.data.results : [],
        next: payload.data.next,
        previous: payload.data.previous,
        totalCountWords: payload.data.amount,
      }
    case SUCCESS(ACTION_TYPES.FETCH_WORD):
      return {
        ...state,
        loadingWord: false,
        error: null,
        word: payload.data,
      }
    case SUCCESS(ACTION_TYPES.ADD_WORD):
    case SUCCESS(ACTION_TYPES.EDIT_WORD):
    case SUCCESS(ACTION_TYPES.DELETE_WORD):
      return {
        ...state,
        error: null,
        shouldUpdateList: true,
        loadingWord: false,
      }
    case FAILURE(ACTION_TYPES.FETCH_WORDS):
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case FAILURE(ACTION_TYPES.FETCH_WORD):
    case FAILURE(ACTION_TYPES.ADD_WORD):
    case FAILURE(ACTION_TYPES.EDIT_WORD):
    case FAILURE(ACTION_TYPES.DELETE_WORD):
      return {
        ...state,
        error: payload,
        loadingWord: false,
        shouldUpdateList: false,
      }
    case ACTION_TYPES.SHOULD_UPDATE_LIST:
      return {
        ...state,
        shouldUpdateList: true,
      }
    case ACTION_TYPES.RESET_WORDS:
      return {
        ...state,
        loading: false,
        error: null,
        words: [],
      }
    case ACTION_TYPES.RESET_WORD:
      return {
        ...state,
        loading: false,
        loadingWord: false,
        error: null,
        word: null,
      }
    default:
      return state
  }
}

export const fetchWords =
  (page: string | number, limit: string | number, search?: string) =>
  async (dispatch: Dispatch) => {
    try {
      await dispatch({
        type: ACTION_TYPES.FETCH_WORDS,
        payload: axios.get(
          `${API_URL}/words?page=${page || ''}&limit=${limit || ''}&search=${
            search || ''
          }`
        ),
      })
    } catch (error) {}
  }

export const fetchWord = (id: string) => async (dispatch: Dispatch) => {
  try {
    await dispatch({
      type: ACTION_TYPES.FETCH_WORD,
      payload: axios.get(`${API_URL}/words/${id}`),
    })
  } catch (error) {}
}

export const createWord =
  ({ word, translation, examples, transcription }: IWord) =>
  async (dispatch: Dispatch) => {
    try {
      await dispatch({
        type: ACTION_TYPES.ADD_WORD,
        payload: axios.post(`${API_URL}/words`, {
          word,
          translation,
          examples,
          transcription,
        }),
      })
    } catch (error) {}
  }

export const updateWord =
  (id: string, { word, translation, examples, transcription }: IWord) =>
  async (dispatch: Dispatch) => {
    try {
      await dispatch({
        type: ACTION_TYPES.EDIT_WORD,
        payload: axios.put(`${API_URL}/words/${id}`, {
          word,
          translation,
          examples,
          transcription,
        }),
      })
    } catch (error) {}
  }

export const deleteWord = (id: string) => async (dispatch: Dispatch) => {
  try {
    await dispatch({
      type: ACTION_TYPES.DELETE_WORD,
      payload: axios.delete(`${API_URL}/words/${id}`),
    })
  } catch (error) {}
}

export const shouldUpdateListFunc = () => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPES.SHOULD_UPDATE_LIST,
  })
}

export const resetWords = () => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPES.RESET_WORDS,
  })
}

export const resetWord = () => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPES.RESET_WORD,
  })
}

export default wordsReducer
