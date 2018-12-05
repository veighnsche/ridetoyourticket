import * as PropTypes from 'prop-types'
import React from 'react'

import CommentForm from './CommentForm'

import withStyles from '@material-ui/core/styles/withStyles'
import { fullWidth } from '../../theme'
import ListItem from '@material-ui/core/ListItem/ListItem'
import Avatar from '@material-ui/core/Avatar/Avatar'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import ImageIcon from '@material-ui/icons/Image'
import List from '@material-ui/core/List/List'
import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button/Button'


const styles = theme => ({
  fullWidth,
  flex: {
    display: 'flex'
  }
})

const CommentListComponent = props => {

  const {
    classes: { fullWidth, flex },
    handleEditForm,
    commentList,
    userId,
    edit
  } = props

  return (
    <List className={fullWidth}>
      {commentList.map(comment => {
        const { id, content, user: { id: commentUserId, fullName } } = comment

        const editButton = commentId => (
          <div className={flex}>
            <Typography color={'primary'}>You ({fullName})</Typography>
            <Button size={'small'} onClick={() => handleEditForm.onClick(commentId)}>edit</Button>
          </div>
        )

        return (
          <div key={id}>
            <ListItem>
              <Avatar>
                <ImageIcon/>
              </Avatar>
              {edit === id
                ? <CommentForm handleForm={handleEditForm} comment={comment}/>
                : <ListItemText disableTypography secondary={<Typography>{content}</Typography>} primary={userId === commentUserId ? editButton(id) : <Typography color={'primary'}>{fullName}</Typography>} />
                }
            </ListItem>
          </div>
        )
      })}
    </List>

  )
}

export default withStyles(styles)(CommentListComponent)