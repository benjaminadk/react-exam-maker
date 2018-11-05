import React from 'react'
import Typography from '@material-ui/core/Typography'

const columns = ['Title', 'Code', 'Questions', 'Actions']

export default function ListHeader() {
  return (
    <div className="header">
      {columns.map((c, i) => (
        <Typography
          key={i}
          variant="overline"
          align="center"
          className={i % 3 === 0 ? 'col-lg' : 'col-sm'}
        >
          {c}
        </Typography>
      ))}
    </div>
  )
}
