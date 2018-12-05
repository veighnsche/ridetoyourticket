import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put,
  UnauthorizedError
} from 'routing-controllers'

import Ticket from './entity'
import User from '../users/entity'
import Event from '../events/entity'

import { TicketIncludingRisk } from './repository'

import { cannotFindEventStr } from '../events/controller'
export const cannotFindTicketStr = 'Cannot find ticket'
const unauthorizedTicketStr = 'You\'re not the owner of this ticket'

@JsonController()
export default class TicketController {

  // @Get('/events/:id/tickets')
  // public async allTickets(
  //   @Param('id') eventId: number
  // ): Promise<{
  //   tickets: Ticket[],
  // }> {
  //   const tickets = await Ticket.find({ relations: ['user', 'event'], where: { 'event': eventId } })
  //   return { tickets }
  // }

  @Get('/tickets/:id')
  public async getTicket(
    @Param('id') id: number
  ): Promise<Ticket> {
    const ticket: Ticket | undefined = await TicketIncludingRisk(id)
    if (!ticket) throw new NotFoundError(cannotFindTicketStr)
    ticket.calculateRisk()
    return ticket
  }

  @Authorized()
  @Post('/events/:id/tickets')
  @HttpCode(201)
  public async createTicket(
    @Param('id') id: number,
    @Body() ticket: Ticket,
    @CurrentUser() user: User
  ): Promise<Ticket> {
    const event: Event | undefined = await Event.findOne(id)
    if (!event) throw new NotFoundError(cannotFindEventStr)
    ticket.user = user
    ticket.createdAt = new Date()
    ticket.event = event
    return ticket.save()
  }

  @Authorized()
  @Put('/tickets/:id')
  public async updateTicket(
    @Param('id') id: number,
    @Body() update: Partial<Ticket>,
    @CurrentUser() user: User
  ): Promise<Ticket> {
    const ticket = await Ticket.findOne(id, { relations: ['user'] })
    if (!ticket) throw new NotFoundError(cannotFindTicketStr)
    if (ticket.user.id !== user.id) throw new UnauthorizedError(unauthorizedTicketStr)
    await Ticket.merge(ticket, update).save()

    return this.getTicket(ticket.id)
  }

  @Authorized()
  @Delete('/tickets/:id')
  public async deleteTicket(
    @Param('id') id: number,
    @CurrentUser() user: User
  ): Promise<Ticket> {
    const ticket = await Ticket.findOne(id, { relations: ['user'] })
    if (!ticket) throw new NotFoundError(cannotFindTicketStr)
    if (ticket.user.id !== user.id) throw new UnauthorizedError(unauthorizedTicketStr)
    return ticket.remove()
  }
}
