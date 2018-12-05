import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchOneEvent } from '../../actions/events'
import { reset } from '../../actions/current'

import Event from './EventComponent'

class EventListContainer extends Component {

  componentDidMount() {
    this.props.fetchOneEvent(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  render() {
    const { currentEvent, toggleTicket, showTicket, ticketId } = this.props
    const ticketMeta = { toggleTicket, showTicket, ticketId }
    return currentEvent.id ? <Event event={currentEvent} ticketMeta={ticketMeta}/> : 'loading'
  }
}

const mapStateToProps = ({ currentEvent }) => ({ currentEvent })
const mapDispatchToProps = { fetchOneEvent, reset }

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer)