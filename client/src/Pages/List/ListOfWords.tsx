import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import 'react-loading-skeleton/dist/skeleton.css'

import {
  IWordsContainerProps,
  WordsContainer,
} from 'app/containers/words.container'
import { ListItem } from 'app/Components/WordItem/ListItem'
import { useSearchInputState } from 'app/hooks/useSearchInput'
import { Skeletons } from 'app/Components/Skeleton/Skeleton'
import './list-of-words.scss'

function calcTabs(totalItems: number, queryItems: number): number {
  return totalItems - queryItems > 0 ? Math.ceil(totalItems / queryItems) : 1
}

const ListOfWords: React.FC<{ containerWords: IWordsContainerProps }> = (
  props
) => {
  const { fetchWords, resetWords, shouldUpdateListFunc } =
    props.containerWords.actions
  const { loading, words, shouldUpdateList, totalCountWords } =
    props.containerWords
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const limit = 10
  const [searchValue, setSearchValue] = useSearchInputState(() => {
    setSearch(() => searchValue)
    shouldUpdateListFunc()
  })

  const onPageChange = (e: any, value: number) => {
    setPage(value)
  }

  const onInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    fetchWords(page, limit, search)
    return () => {
      resetWords()
    }
  }, [page])

  useEffect(() => {
    if (shouldUpdateList) {
      fetchWords(page, limit, search)
    }
  }, [shouldUpdateList])

  return (
    <>
      <Grid
        container
        className="tools"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} md={5} className="tools__pagination">
          <Stack spacing={2}>
            <Pagination
              count={calcTabs(totalCountWords, limit)}
              page={page}
              onChange={onPageChange}
              color="primary"
            />
          </Stack>
        </Grid>
        <Grid item xs={4} md={3} />
        <Grid item xs={4} md={4}>
          <TextField
            label="Search by first characters..."
            value={searchValue}
            onChange={onInputSearch}
            className="col-12"
          />
        </Grid>
      </Grid>
      {words?.length ? (
        words.map((item) => <ListItem item={item} key={item._id} />)
      ) : !loading ? (
        <p className="error-text">No data :(</p>
      ) : null}
      {loading ? <Skeletons count={10} /> : null}
    </>
  )
}

export default WordsContainer(ListOfWords)
