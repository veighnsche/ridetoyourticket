import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import TextField from "@material-ui/core/TextField/TextField"
import Paper from "@material-ui/core/Paper/Paper"
import Typography from "@material-ui/core/Typography/Typography"
import Button from "@material-ui/core/Button/Button"

const styles = theme => ({
  aligner: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 200,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: theme.spacing.input.width,
  },
  button: {
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
  },
})

const LoginForm = props => {

  const {
    classes: { aligner, paper, form, title, textField, button },
    handleForm: { onSubmit, onChange, onDevClick },
    error
  } = props

  return (
    <div className={aligner}>
      <Paper className={paper} elevation={1}>
        <form
          className={form}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <Typography className={title} component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <Typography
            className={title}
            component="h3"
            variant="h5"
            color={'error'}
          >
            {error}
          </Typography>}
          <TextField
            required
            id="outlined-email-input"
            label="Email"
            className={textField}
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            onChange={onChange}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            className={textField}
            type="password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            onChange={onChange}
          />
          <Button type={'submit'} variant="contained" color="primary" className={button}>
            Login
          </Button>
          {/* DEV DEV DEV DEV DEV */}
          <Button onClick={onDevClick} variant="contained" color="secondary" className={button}>
            Auto Dev Login
          </Button>
          {/* DEV DEV DEV DEV DEV */}
        </form>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(LoginForm)