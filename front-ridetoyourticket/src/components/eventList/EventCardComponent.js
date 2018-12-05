import React from 'react'
import * as PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import slugify from 'slugify'

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card/Card'
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import CardActions from '@material-ui/core/CardActions/CardActions'
import Button from '@material-ui/core/Button/Button'

const styles = theme => ({
  card: {
    maxWidth: theme.spacing.card.maxWidth,
    margin: theme.spacing.unit * 2,
  },
  media: {
    height: 230,
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    marginTop: 'auto',
    backgroundColor: 'rgb(10, 10, 10, 0.5)',
  },
  type: {
    color: '#fff'
  }
})

const EventCardComponent = props => {

  const {
    classes: { card, media, content, type },
    event: { id, title, description, picture, tickets },
  } = props

  const link = `/event/${id}/${slugify(title)}`

  return (
    <Card className={card}>
      <CardActionArea>
        <CardMedia
          component={Link}
          to={link}
          className={media}
          image={picture}
          title={title}
        >
          <CardContent className={content}>
            <Typography className={type} gutterBottom variant="h5" component="h2" noWrap={true}>
              {title}
            </Typography>
            <Typography className={type} component="p" noWrap={true}>
              {description}
            </Typography>
          </CardContent>
        </CardMedia>
      </CardActionArea>
      <CardActions>
        <Button component={Link} to={link} size="small" color="primary">
          {tickets.length} tickets available
        </Button>
      </CardActions>
    </Card>
  )
}

EventCardComponent.propTypes = { event: PropTypes.any }

export default withStyles(styles)(EventCardComponent)