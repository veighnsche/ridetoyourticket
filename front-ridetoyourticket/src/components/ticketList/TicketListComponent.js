import React from 'react'
import * as PropTypes from 'prop-types'

import withStyles from '@material-ui/core/styles/withStyles'
import { fullWidth } from '../../theme'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import Divider from '@material-ui/core/Divider/Divider'
import List from '@material-ui/core/List/List'

const styles = theme => ({
  fullWidth,
  listItem: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
})

const TicketListComponent = props => {

  const {
    classes: { listItem, fullWidth },
    ticketList,
    toggleTicket,
  } = props

  return (
    <List className={fullWidth}>
      {ticketList.map((ticket, i) => {
        const { id, price, user: { fullName } } = ticket
        const isLast = i === ticketList.length - 1
        return (
          <div key={id}>
            <ListItem button onClick={() => toggleTicket(id)}>
              <ListItemText>
                <div className={listItem}>
                  <div>€ {price / 100}</div>
                  <div>from {fullName}</div>
                </div>
              </ListItemText>
            </ListItem>
            {!isLast && <Divider/>}
          </div>
        )
      })}
    </List>
  )
}

TicketListComponent.propTypes = {
  id: PropTypes.any,
  price: PropTypes.any,
}

export default withStyles(styles)(TicketListComponent)