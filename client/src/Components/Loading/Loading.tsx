import React from 'react'
import './Loading.styles.scss'

export const Loading = ({ classes }: { classes?: string }) => (
  <div className={`lds-ellipsis ${classes}`}>
    <div />
    <div />
    <div />
    <div />
  </div>
)
