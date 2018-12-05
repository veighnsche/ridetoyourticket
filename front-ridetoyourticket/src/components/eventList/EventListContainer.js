import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchEvents, fetchEventsAndCount } from "../../actions/events"

import EventList from "./EventListComponent"
import EventListPagination from "./EventListPagination"

class EventListContainer extends Component {

  componentDidMount() {
    this.props.eventList.page > 0 || this.props.fetchEventsAndCount()
  }

  pagination = {
    prev: () => this.props.fetchEvents(this.props.eventList.page - 1),
    next: () => this.props.fetchEvents(this.props.eventList.page + 1),
    goto: page => this.props.fetchEvents(page)
  }

  render() {
    const { events, page, count } = this.props.eventList
    if (!events.length) return 'loading'
    return (
      <div>
        <EventList events={events} />
        <EventListPagination pagination={this.pagination} page={page} count={count} />
      </div>
      )
  }
}

const mapStateToProps = ({ eventList }) => ({ eventList })
const mapDispatchToProps = { fetchEvents, fetchEventsAndCount }

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer)