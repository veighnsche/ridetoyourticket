import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTicket, sendEditedTicket } from '../../actions/tickets'
import { reset } from "../../actions/current"

import Ticket from './TicketComponent'
import { userId } from '../../jwt'

class TicketContainer extends Component {

  constructor(props) {
    super(props)
    this.id = props.id
  }

  componentDidMount() {
    this.props.fetchTicket(this.id || this.props.match.params.id)
  }

  handleForm = {
    onChange: event => {
      this.setState({ [event.target.name]: event.target.value })
    },
    onSubmit: event => {
      event.preventDefault()
      this.props.sendEditedTicket(this.props.currentTicket.ticket.id, this.state)
    },
  }

  render() {

    const {
      currentTicket: { ticket },
      currentUser
    } = this.props

    if (!ticket.id) return 'loading'
    return <Ticket
      ticket={ticket}
      fromLink={!this.id}
      handleEditForm={this.handleForm}
      userId={currentUser && userId(currentUser.jwt)}
    />
  }
}

const mapStateToProps = ({ currentUser, currentTicket }) => ({ currentUser, currentTicket })
const mapDispatchToProps = { fetchTicket, sendEditedTicket, reset }

export default connect(mapStateToProps, mapDispatchToProps)(TicketContainer)