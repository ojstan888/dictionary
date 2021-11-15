import React, { useEffect } from 'react'
import { Grid, Modal } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom'

import { Loading } from 'app/Components/Loading/Loading'
import { WordsContainer } from 'app/containers/words.container'
import { IModalWord, styleForModal } from 'app/Components/Modals/common'

const ConfirmModal: React.FC<IModalWord> = ({
  isShow,
  onShow,
  containerWords,
}) => {
  const { loadingWord, word } = containerWords
  const { deleteWord, fetchWord, resetWord } = containerWords.actions
  const { id } = useParams<{ id: string }>()

  const onDelete = async (id: string) => {
    await deleteWord(id)
    onShow()
  }

  useEffect(() => {
    if (id) {
      fetchWord(id)
    }
    return () => {
      resetWord()
    }
  }, [id])

  return (
    <Modal
      open={isShow}
      onClose={onShow}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleForModal} className="modal-box">
        {loadingWord ? (
          <Loading classes={'absolute-center'} />
        ) : (
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12}>
              <Typography>
                Are you sure you want to delete{' '}
                {word?.word ? (
                  <span className="error-text">{word.word}</span>
                ) : null}{' '}
                word?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {word?._id ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(word._id || '')}
                >
                  Delete
                </Button>
              ) : null}
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  )
}

export default WordsContainer(ConfirmModal)
