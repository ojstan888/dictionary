import React from 'react'
import { Grid, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <footer>
      <Grid
        container
        columns={{ xs: 8, sm: 8, md: 12 }}
        className="global-container margin-center"
        style={{ width: '95%' }}
      >
        <Grid item xs={4} md={5}>
          <Typography>
            Created by{' '}
            <a
              href="https://github.com/ojstan888/"
              target="_blank"
              rel="noreferrer"
            >
              Oykin Stanislav
            </a>
          </Typography>
        </Grid>
        <Grid item xs={1} md={4} />
        <Grid item xs={3} md={3}>
          <Typography style={{ textAlign: 'right' }}>
            Build version: 2
          </Typography>
        </Grid>
      </Grid>
    </footer>
  )
}
