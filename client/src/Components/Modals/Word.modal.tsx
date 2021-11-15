import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import { Button, Grid, Modal } from '@mui/material'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import { useParams } from 'react-router-dom'

import { WordsContainer } from 'app/containers/words.container'
import { IWord } from 'app/models/word.model'
import { IModalWord, styleForModal } from 'app/Components/Modals/common'
import { Loading } from 'app/Components/Loading/Loading'

const initialState = {
  word: '',
  translation: '',
  examples: [],
  transcription: '',
}

const ModalWord: React.FC<IModalWord> = ({
  isShow,
  onShow,
  containerWords,
}) => {
  const { createWord, updateWord, fetchWord, resetWord } =
    containerWords.actions
  const { loadingWord, word } = containerWords
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<IWord>({
    defaultValues: initialState,
  })
  const { id } = useParams<{ id: string }>()

  const onSubmit = async (data: IWord) => {
    // TODO: add more abstract validation
    if (!data.word) {
      return setError('word', {
        type: 'manual',
        message: 'Word field is required',
      })
    }
    if (!data.translation) {
      return setError('translation', {
        type: 'manual',
        message: 'Translation field is required',
      })
    }
    if (id && word?.word) {
      await updateWord(id, data)
      return onShow()
    }
    await createWord(data)
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

  useEffect(() => {
    if (word) {
      reset({
        word: word.word || '',
        translation: word.translation || '',
        examples: word.examples || [],
        transcription: word.transcription || '',
      })
    }
  }, [word])

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
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} columns={12}>
              <Grid item xs={12}>
                <h3>{id ? 'Update word' : 'Add new word'}</h3>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="word"
                  defaultValue={word?.word || ''}
                  render={({ field }) => (
                    <>
                      <TextField label="Word" {...field} className="col-12" />
                      {errors.word && (
                        <p className="error-text">{errors.word.message}</p>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="translation"
                  defaultValue={word?.translation || ''}
                  render={({ field }) => (
                    <>
                      <TextField
                        label="Translation"
                        {...field}
                        className="col-12"
                      />
                      {errors.translation && (
                        <p className="error-text">
                          {errors.translation.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="examples"
                  defaultValue={word?.examples || []}
                  render={(props: any) => (
                    <Autocomplete
                      multiple
                      options={[].map((option) => '')}
                      defaultValue={word?.examples || []}
                      freeSolo
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Examples (press Enter after entering the sentence)"
                          placeholder="Write your sentecnies"
                          className="col-12"
                        />
                      )}
                      onChange={(_, data) => props.field.onChange(data)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="transcription"
                  defaultValue={word?.transcription || ''}
                  render={({ field }) => (
                    <TextField
                      label="Transcription"
                      {...field}
                      className="col-12"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ marginTop: 20 }}>
              <Button type="submit" variant="contained" className="col-12">
                {id ? 'Update' : 'Add'}
              </Button>
            </Grid>
          </form>
        )}
      </Box>
    </Modal>
  )
}

export default WordsContainer(ModalWord)
