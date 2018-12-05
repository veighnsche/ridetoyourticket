import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { login } from '../../actions/users'
import { reset } from '../../actions/current'

import LoginForm from './LoginForm'

class LoginContainer extends PureComponent {

  componentWillUnmount() {
    this.props.reset()
  }

  handleForm = {
    onChange: event => {
      this.setState({ [event.target.name]: event.target.value })
    },
    onDevClick: event => {
      event.preventDefault()
      this.props.login({
        email: 'Niels.Ruiter@gmail.com',
        password: '1234',
      })
    },
    onSubmit: event => {
      event.preventDefault()
      this.props.login(this.state)
    },
  }

  render() {
    if (this.props.currentUser) return <Redirect to={'/'}/>

    const error = this.props.error
    return <LoginForm handleForm={this.handleForm} error={error}/>
  }
}

const mapStateToProps = ({ currentUser, login: { error } }) => ({ currentUser, error })
const mapDispatchToProps = { login, reset }

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)