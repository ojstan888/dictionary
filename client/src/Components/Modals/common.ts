import { IWordsContainerProps } from 'app/containers/words.container'

export interface IModalWord {
  isShow: boolean
  onShow: () => void
  containerWords: IWordsContainerProps
}

export const styleForModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
}
