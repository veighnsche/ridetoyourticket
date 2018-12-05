import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { signup } from '../../../actions/users'
import { reset } from '../../../actions/current'

import SignupForm from './SignupForm'

class SignupContainer extends PureComponent {
  state = {}

  componentWillUnmount() {
    this.props.reset()
  }

  handleForm = {
    onChange: event => {
      this.setState({ [event.target.name]: event.target.value })
    },
    onSubmit: event => {
      event.preventDefault()
      this.props.signup(this.state)
    },
  }

  render() {
    if (this.props.success) return <Redirect to={'/'}/>

    const error = this.props.error
    return <SignupForm handleForm={this.handleForm} error={error}/>
  }
}

const mapStateToProps = ({ signup: { success, error } }) => ({ success, error })
const mapDispatchToProps = { signup, reset }

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer)