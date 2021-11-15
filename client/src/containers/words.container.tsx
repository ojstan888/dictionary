import React from 'react'
import { Dispatch } from 'redux'
import { IRootState } from '../reducers'
import {
  IWordsState,
  fetchWords,
  fetchWord,
  updateWord,
  createWord,
  deleteWord,
  resetWord,
  resetWords,
  shouldUpdateListFunc,
} from '../reducers/word'
import { connect } from './connect'

export type IWordsContainerProps = IWordsState & {
  actions: {
    fetchWords: typeof fetchWords
    fetchWord: typeof fetchWord
    updateWord: typeof updateWord
    createWord: typeof createWord
    resetWords: typeof resetWords
    resetWord: typeof resetWord
    deleteWord: typeof deleteWord
    shouldUpdateListFunc: typeof shouldUpdateListFunc
  }
}

const mapStateToProps = (state: IRootState) => state.words

const mapDispatchToProps = (
  dispatch: Dispatch
): IWordsContainerProps['actions'] => ({
  fetchWords: (page, limit, search) =>
    dispatch<any>(fetchWords(page, limit, search)),
  fetchWord: (id) => dispatch<any>(fetchWord(id)),
  createWord: (data) => dispatch<any>(createWord(data)),
  updateWord: (id, data) => dispatch<any>(updateWord(id, data)),
  deleteWord: (id) => dispatch<any>(deleteWord(id)),
  resetWords: () => dispatch<any>(resetWords()),
  resetWord: () => dispatch<any>(resetWord()),
  shouldUpdateListFunc: () => dispatch<any>(shouldUpdateListFunc()),
})

export const WordsContainer = connect<IWordsContainerProps>(
  'containerWords',
  mapStateToProps,
  mapDispatchToProps
)
