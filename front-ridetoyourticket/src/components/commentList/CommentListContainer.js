import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CommentForm from './CommentForm'
import CommentList from './CommentListComponent'
import { fullWidth } from '../../theme'

import { sendComment, sendEditedComment } from '../../actions/comments'
import { userId } from '../../jwt'

class CommentListContainer extends PureComponent {

  state = {}

  handleForm = {
    onChange: event => {
      this.setState({ new: { [event.target.name]: event.target.value } })
    },
    onSubmit: event => {
      event.preventDefault()
      this.props.sendComment(this.props.ticketId, this.state.new)
    },
  }

  handleEditForm = {
    onClick: id => {
      this.setState({ edit: id })
    },
    onChange: event => {
      this.setState({ edited: { [event.target.name]: event.target.value } })
    },
    onSubmit: event => {
      event.preventDefault()
      this.props.sendEditedComment(this.state.edit, this.state.edited)
      this.setState({ edit: undefined })
    },
  }

  render() {
    const { commentList, currentUser } = this.props
    return (
      <div style={fullWidth}>
        {currentUser && <CommentForm handleForm={this.handleForm}/>}
        <CommentList
          commentList={commentList}
          userId={currentUser && userId(currentUser.jwt)}
          handleEditForm={this.handleEditForm}
          edit={this.state.edit}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ commentList, currentUser, currentTicket: { ticket: { id } } }) => ({
  commentList,
  currentUser,
  ticketId: id,
})
const mapDispatchToProps = { sendComment, sendEditedComment }

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)