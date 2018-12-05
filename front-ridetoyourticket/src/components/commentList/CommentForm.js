import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField/TextField'
import Button from '@material-ui/core/Button/Button'
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit,
    align: 'right'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

const CommentForm = props => {

  const {
    classes: { textField, rightIcon, button },
    handleForm: {onSubmit, onChange},
    comment
  } = props

  return (
    <form onSubmit={onSubmit}>
      <TextField
        id={comment ? comment.id : 'new-comment'}
        name={'content'}
        label="Your comment"
        // multiline
        rows="4"
        placeholder={'Ask a question or place a comment'}
        className={textField}
        margin="normal"
        variant="outlined"
        onChange={onChange}
        defaultValue={comment && comment.content}
      />
      <Button type={'submit'} variant="contained" color="primary" className={button} >
        Send
        <SendIcon className={rightIcon}>send</SendIcon>
      </Button>
    </form>
  )
}
export default withStyles(styles)(CommentForm)