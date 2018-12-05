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
  Put, UnauthorizedError
} from 'routing-controllers'

import Event from './entity'
import User from '../users/entity'

interface IEventPage {
  count?: number,
  events: Event[],
  page: number,
}

export const cannotFindEventStr = 'Cannot find event'
const unauthorizedEventStr = 'You\'re not the owner of this event'

const eventsPerPage = 9

@JsonController()
export default class EventController {

  @Get('/events')
  public async getEventsAndCount(): Promise<IEventPage> {
    const count: number = await Event.count()
    const events: IEventPage = await this.getEvents(0)
    return {
      count: Math.ceil(count / eventsPerPage),
      ...events
    }
  }

  @Get('/events/:page')
  public async getEvents(
    @Param('page') page: number
  ):
    Promise<IEventPage> {
    const events = await Event.find({
      relations: ['user'],
      loadRelationIds: {
        relations: ['tickets']
      },
      order: { 'startsAt': 'ASC' },
      skip: page * eventsPerPage,
      take: eventsPerPage
    })
    return {
      events,
      page
    }
  }

  @Get('/event/:id')
  public getEvent(
    @Param('id') id: number
  ): Promise<Event | undefined> {
    return Event.findOne(id, { relations: ['user', 'tickets', 'tickets.user'] })
  }

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  public createEvent(
    @Body() event: Event,
    @CurrentUser() user: User
  ): Promise<Event> {
    event.user = user
    return event.save()
  }

  @Authorized()
  @Put('/events/:id')
  public async updateEvent(
    @Param('id') id: number,
    @Body() update: Partial<Event>,
    @CurrentUser() user: User
  ): Promise<Event> {
    const event = await
      Event.findOne(id, { relations: ['user'] })
    if (!event) throw new NotFoundError(cannotFindEventStr)
    if (event.user.id !== user.id) throw new UnauthorizedError(unauthorizedEventStr)
    return Event.merge(event, update).save()
  }

  @Authorized()
  @Delete('/events/:id')
  public async deleteEvent(
    @Param('id') id: number,
    @CurrentUser() user: User
  ): Promise<Event> {
    const event = await
      Event.findOne(id, { relations: ['user'] })
    if (!event) throw new NotFoundError(cannotFindEventStr)
    if (event.user.id !== user.id) throw new UnauthorizedError(unauthorizedEventStr)
    return event.remove()
  }
}
