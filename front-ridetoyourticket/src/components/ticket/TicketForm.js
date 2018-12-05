import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField/TextField'
import Button from '@material-ui/core/Button/Button'
import SendIcon from '@material-ui/icons/Send'
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography/Typography'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
    align: 'right',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  margin: {
    margin: theme.spacing.unit,
  },
})

const TicketForm = props => {

  const {
    classes: { textField, rightIcon, button, heading, margin },
    handleForm: { onSubmit, onChange },
    ticket
  } = props

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
        <Typography className={heading}>{ticket ? 'this is your ticket, Edit this ticket' : 'Sell your ticket'}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form id={ticket ? ticket.id : 'new-ticket'} onSubmit={onSubmit}>
          <TextField
            name={'price'}
            id="price"
            className={classNames(margin, textField)}
            variant="outlined"
            label="Price"
            onChange={onChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            defaultValue={ticket && ticket.price / 100}
          />
          <TextField
            name={'description'}
            label="description"
            placeholder={'Tell a little bit about your ticket'}
            className={textField}
            margin="normal"
            variant="outlined"
            onChange={onChange}
            defaultValue={ticket && ticket.description}
          />
          <TextField
            disabled
            // DEV DEV DEV DEV DEV DEV
            value={'https://i.imgur.com/yupfxGo.jpg'}
            // DEV DEV DEV DEV DEV DEV
            name={'picture'}
            label="picture url"
            className={textField}
            margin="normal"
            variant="outlined"
            onChange={onChange}
            // defaultValue={ticket && ticket.picture}
          />
          <Button type={'submit'} variant="contained" color="primary" className={button}>
            Send
            <SendIcon className={rightIcon}>send</SendIcon>
          </Button>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>

  )
}
export default withStyles(styles)(TicketForm)