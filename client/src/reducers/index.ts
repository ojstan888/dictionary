import { combineReducers } from 'redux'

import authReducer, { IAuthState } from './auth'
import wordsReducer, { IWordsState } from './word'

export interface IRootState {
  readonly auth: IAuthState
  readonly words: IWordsState
}

export const allReducers = combineReducers<IRootState>({
  auth: authReducer,
  words: wordsReducer,
})
