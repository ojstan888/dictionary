import React, { useState } from 'react'
import './index.scss'
import Typography from '@mui/material/Typography'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'

import { IWord } from 'app/models/word.model'
import { ROUTES } from 'app/consts'

const parseExampleSentence = (str: string, word: string) => {
  try {
    const strArr = str.split(' ')
    const len = strArr.length
    const result = []
    const wordSplited = word.split(' ')

    for (let i = 0; i < len; i++) {
      if (
        wordSplited.some((item) => item === strArr[i] || strArr[i].match(item))
      ) {
        const upper = strArr[i].toUpperCase()
        result[i] = `${upper} `
      } else {
        result[i] = `${strArr[i]} `
      }
    }

    return result
  } catch (e) {
    return str
  }
}

export const ListItem: React.FC<{ item: IWord }> = (props) => {
  const { word, translation, examples, transcription, _id } = props.item
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Accordion className={['item', isOpen ? 'full-opacity' : null].join(' ')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <span className="item__transcription">{transcription}</span>
          <Typography className="item__word">{word}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className="item__details">
        <ul className="item__examples">
          {examples?.length ? (
            examples.map((item) => (
              <li key={item + _id}>
                <Typography>{parseExampleSentence(item, word)}</Typography>
              </li>
            ))
          ) : (
            <span className="error-text">No examples :(</span>
          )}
        </ul>
        <div className="item__additional">
          <Typography className="item__translation">{translation}</Typography>
          <div className="item__tools">
            <Link to={ROUTES.isAuthed.dashboardEdit(_id || '')}>
              <EditIcon color="success" />
            </Link>
            <Link to={ROUTES.isAuthed.dashboardRemove(_id || '')}>
              <DeleteIcon color="error" />
            </Link>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
