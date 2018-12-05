import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button/Button'
import { center } from '../../theme'

const styles = theme => ({
  center,
  centerWrap: {
    ...center,
    flexWrap: 'wrap',
    width: 1000,
  },
})

const EventListPagination = props => {

  const {
    classes: { center, centerWrap },
    pagination: { prev, next, goto },
    page,
    count,
  } = props

  return (
    <div className={center}>
      <Button onClick={prev} disabled={!page}>prev</Button>
      <div className={centerWrap}>
        {Array.from(Array(count).keys()).map(num =>
          <Button key={num} onClick={() => goto(num)} disabled={num === page}>{num + 1}</Button>,
        )}
      </div>
      <Button onClick={next} disabled={page === count - 1}>next</Button>
    </div>
  )
}

export default withStyles(styles)(EventListPagination)