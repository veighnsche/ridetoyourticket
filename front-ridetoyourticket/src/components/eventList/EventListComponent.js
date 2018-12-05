import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import EventCard from './EventCardComponent'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
})

const EventListComponent = props => {
  const {
    classes: { container },
    events
  } = props
  // todo: only use slug and not id in link
  return (
    <div className={container}>
      {events.map(event => <EventCard key={event.id} event={event}/>)}
    </div>
  )
}

export default withStyles(styles)(EventListComponent)