import * as faker from 'faker/locale/nl'
import * as moment from 'moment'
import setupDb from './db'
import { getConnection } from 'typeorm'

import User from './entities/users/entity'
import Event from './entities/events/entity'
import Ticket from './entities/tickets/entity'
import Comment from './entities/comments/entity'

const usersLength: number = 100
const eventLength: number = Math.floor(usersLength / 3)
const ticketsLength: number = Math.floor(usersLength + eventLength)
const commentLength: number = Math.floor(ticketsLength * 1.25)

setupDb()
.then(async () => {

  try {

    // seed to keep the first user for auto login
    //         123
    faker.seed(123)

    const usersCount: number = await User.count()
    const eventsCount: number = await Event.count()
    const ticketsCount: number = await Ticket.count()
    const commentsCount: number = await Comment.count()

    const user_: User[] = []
    const event_: Event[] = []
    const ticket_: Ticket[] = []
    const comment_: Comment[] = []

    const eventsAveragePrice: number[] = []

    let i

    if (usersCount < usersLength) {
      const usersToAdd: number = usersLength - usersCount
      for (i = 0; i < usersToAdd; i++) {
        const firstName: string = faker.name.firstName()
        const lastName: string = faker.name.lastName()
        user_[i] = User.create({
          firstName,
          lastName,
          email: faker.internet.email(firstName, lastName)
        })
        await user_[i].setPassword('1234')
      }
    }

    await getConnection().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(user_)
    })

    const users: User[] = await User.find()

    if (eventsCount < eventLength) {
      const eventsToAdd: number = eventLength - usersCount
      for (i = 0; i < eventsToAdd; i++) {
        const wordCount: number = Math.ceil(Math.random() * 3)
        const sentenceCount: number = Math.ceil(Math.random() * 10)
        const daysAgoOrLeft = sentenceCount / 2
        const startsAt: Date = await Math.random() > 0.8 ? faker.date.recent(daysAgoOrLeft) : faker.date.recent(-daysAgoOrLeft * 3)

        event_[i] = Event.create({
          title: faker.random.words(wordCount),
          description: 'This Event is about ' + faker.lorem.paragraph(sentenceCount),
          picture: `https://picsum.photos/425/230/?image=${faker.random.number(1000)}`,
          startsAt,
          endsAt: moment(startsAt).add(faker.random.number({ max: 7, min: 4 }), 'hours'),
          user: users[Math.floor(Math.random() * users.length)]
        })
      }
    }

    await getConnection().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(event_)
    })

    const events: Event[] = await Event.find()

    if (ticketsCount < ticketsLength) {
      const ticketsToAdd: number = ticketsLength - ticketsCount
      for (i = 0; i < ticketsToAdd; i++) {
        const sentenceCount: number = Math.ceil(Math.random() * 10)
        const event: Event = events[Math.floor(Math.random() * events.length)]

        if (!eventsAveragePrice[event.id])
          eventsAveragePrice[event.id] = faker.random.number({ min: 2500, max: 20000 })

        const averagePrice = eventsAveragePrice[event.id]

        ticket_[i] = Ticket.create({
          createdAt: faker.date.recent(Math.floor(Math.random() * 3)),
          description: 'This Ticket is ' + faker.lorem.paragraph(sentenceCount),
          price: faker.random.number({ min: averagePrice * 0.3, max: averagePrice * 1.5 }),
          picture: 'https://i.imgur.com/yupfxGo.jpg',
          user: user_[Math.floor(Math.random() * user_.length)],
          event
        })
      }
    }

    await getConnection().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(ticket_)
    })

    const tickets: Ticket[] = await Ticket.find()

    if (commentsCount < commentLength) {
      const commentsToAdd: number = commentLength - commentsCount
      for (i = 0; i < commentsToAdd; i++) {
        const sentenceCount: number = Math.ceil(Math.random() * 10)
        comment_[i] = Comment.create({
          content: 'My comment about this is ' + faker.lorem.paragraph(sentenceCount),
          user: user_[Math.floor(Math.random() * user_.length)],
          ticket: tickets[Math.floor(Math.random() * tickets.length)]
        })
      }
    }

    await getConnection().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(comment_)
    })

  } catch (e) {
    console.error(e)
  }

})
.catch(e => console.error(e))