import React from 'react'
import { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { toggleTicket, sendTicket } from '../../actions/tickets'

import TicketList from '../ticketList/TicketListComponent'
import TicketContainer from '../ticket/TicketContainer'
import TicketForm from '../ticket/TicketForm'

import { fullWidth } from '../../theme'
import Drawer from '@material-ui/core/Drawer/Drawer'

class TicketListContainer extends Component {

  state = {
    // DEV DEV DEV DEV DEV DEV
    picture: 'https://i.imgur.com/yupfxGo.jpg'
    // DEV DEV DEV DEV DEV DEV
  }

  handleForm = {
    onChange: event => {
      this.setState({ [event.target.name]: event.target.value })
    },
    onSubmit: event => {
      event.preventDefault()
      console.log(this.props)
      this.props.sendTicket(this.props.eventId, this.state)
    },
  }

  render() {
    const { ticketList, toggleTicket, showTicket, ticketId, currentUser } = this.props
    return (
      <div style={fullWidth}>
        {currentUser && <TicketForm handleForm={this.handleForm} />}
        <TicketList ticketList={ticketList} toggleTicket={toggleTicket}/>
        <Drawer anchor="bottom" open={showTicket} onClose={toggleTicket}>
          <TicketContainer id={ticketId}/>
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = ({ ticketList, currentUser, currentTicket: { showTicket, ticketId }, currentEvent: { id }}) => ({
  ticketList,
  currentUser,
  showTicket,
  ticketId,
  eventId: id
})
const mapDispatchToProps = { toggleTicket, sendTicket }

export default connect(mapStateToProps, mapDispatchToProps)(TicketListContainer)