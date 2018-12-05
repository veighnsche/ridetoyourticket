import React from 'react'

import EventBackgroundComponent from './EventBackgroundComponent'
import TicketListContainer from '../ticketList/TicketListContainer'

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card/Card'
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import CardActions from '@material-ui/core/CardActions/CardActions'


const styles = theme => ({
  container: {
    marginTop: 100,
  },
  card: {
    width: 1000,
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
  }
})


const EventComponent = props => {

  const {
    classes: { container, card, media, content, type },
    event: { title, description, picture, user: { fullName } },
  } = props

  return (
    <div>
      <EventBackgroundComponent picture={picture} title={title}/>
      <div className={container}>
        <Card className={card}>
          <CardActionArea>
            <CardMedia
              className={media}
              image={picture}
              title={title}
            />
            <CardContent className={content}>
              <div>
                <Typography className={type} gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
                <Typography className={type}>
                  from {fullName}
                </Typography>
              </div>
              <Typography className={type} component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <TicketListContainer/>
          </CardActions>
        </Card>
      </div>
    </div>
  )
}

export default withStyles(styles)(EventComponent)