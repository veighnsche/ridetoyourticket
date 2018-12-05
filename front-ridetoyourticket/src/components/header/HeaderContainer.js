import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './HeaderComponent'

import { logout } from "../../actions/users"

class HeaderContainer extends Component {

  handleClick = {
    logout: this.props.logout
  }

  render() {
    const header = this.props.header
    return <Header header={header} handleClick={this.handleClick} />
  }
}

const mapStateToProps = ({ header }) => ({ header })
const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)