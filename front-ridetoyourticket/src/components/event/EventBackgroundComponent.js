import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// DEV DEV DEV DEV DEV https://picsum.photos/425/230/?image=n
const manipulateDummyImg = img => img.split('/').map((part, i) => {
  if (i === 3) return 1000
  if (i === 4) return 300
  return part
}).join('/') + '&gravity=center'
// DEV DEV DEV DEV DEV https://picsum.photos/1000/400/?image=n&gravity=center&blur

const styles = theme => ({
  img: {
    position: 'fixed',
    width: '100%',
    left: 0,
    top: 64,
    zIndex: -999,
  },
})

const EventBackgroundComponent = props => {
  const {
    classes: { img },
    picture,
    title
  } = props
  return <img src={manipulateDummyImg(picture) + '&blur'} className={img} alt={title}/>
}

export default withStyles(styles)(EventBackgroundComponent)
