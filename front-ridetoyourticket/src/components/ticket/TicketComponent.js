import React from 'react'
import EventBackgroundComponent from '../event/EventBackgroundComponent'

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card/Card'
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import CardActions from '@material-ui/core/CardActions/CardActions'

import { center } from '../../theme'
import Link from 'react-router-dom/es/Link'
import Button from '@material-ui/core/Button/Button'
import CommentListContainer from '../commentList/CommentListContainer'
import TicketForm from '../ticket/TicketForm'

const styles = theme => ({
  center,
  container: {
    marginTop: 100,
  },
  card: {
    width: 800,
    margin: theme.spacing.unit * 2,
  },
  media: {
    height: 300,
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    marginTop: 'auto',
    backgroundColor: 'rgb(10, 10, 10, 0.5)',
  },
  type: {
    color: '#fff',
  },
  ticketTop: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
})

const TicketComponent = props => {

  const {
    classes: { center, container, card, media, content, type, ticketTop },
    ticket: { id, description, picture, price, risk, user: { fullName, id: ticketUserId }, event },
    fromLink,

    ticket,
    handleEditForm,
    userId,
  } = props



  return (
    <div className={fromLink ? container : center}>
      {fromLink && <EventBackgroundComponent picture={event.picture} title={event.title}/>}
      <Card className={card}>
        {userId === ticketUserId && <TicketForm handleForm={handleEditForm} ticket={ticket} />}
        <CardActionArea>
          <CardMedia
            className={media}
            image={picture}
            title={fullName}
          />
          <CardContent className={content}>
            <div className={ticketTop}>
              <Typography className={type}>
                sold by {fullName}
              </Typography>
              <Typography className={type}>
                € {price / 100}
              </Typography>
              <Typography className={type}>
                risk: {Math.round(risk)}%
              </Typography>
              {!fromLink && <Button component={Link} to={`/ticket/${id}`}>share</Button>}
            </div>
            <Typography className={type} component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <CommentListContainer />
        </CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(TicketComponent)