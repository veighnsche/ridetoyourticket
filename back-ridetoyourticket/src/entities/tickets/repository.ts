import { getManager } from 'typeorm'
import Ticket from './entity'

export const TicketIncludingRisk = (id: number): Promise<Ticket | undefined> => getManager()
.getRepository(Ticket)
.createQueryBuilder('ticket')
.leftJoin('ticket.user', 'user')
.leftJoin('user.tickets', 'userTickets')
.leftJoin('ticket.event', 'event')
.leftJoin('event.tickets', 'eventTickets')
.leftJoin('ticket.comments', 'comments')
.leftJoin('comments.user', 'commentUser')
.select([
  'ticket',
  'user',
  'comments',
  'commentUser',
  'userTickets.id',
  'event.id',
  'event.title',
  'event.picture',
  'eventTickets.price',
])
.where('ticket.id = :id', { id })
.getOne()

// export const TicketListIncludingRisk