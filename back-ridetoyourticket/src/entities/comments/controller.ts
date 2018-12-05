import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  // Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put, UnauthorizedError
} from 'routing-controllers'

import Comment from './entity'
import User from '../users/entity'
import Ticket from '../tickets/entity'

import { cannotFindTicketStr } from '../tickets/controller'

const cannotFindCommentStr = 'Cannot find ticket'
const unauthorizedCommentStr = 'You\'re not the owner of this ticket'

@JsonController()
export default class CommentController {

  // @Get('tickets/:id/comments')
  // public async allComments(
  //   @Param('id') ticketId: number
  // ): Promise<{
  //   comments: Comment[],
  // }> {
  //   const comments = await Comment.find({ relations: ['user'] , where: { 'ticket': ticketId } })
  //   return { comments }
  // }

  // @Get('/comments/:id')
  // public getComment(
  //   @Param('id') id: number
  // ): Promise<Comment | undefined> {
  //   return Comment.findOne(id, { relations: ['user'] })
  // }

  @Authorized()
  @Post('/tickets/:id/comments')
  @HttpCode(201)
  public async createComment(
    @Param('id') id: number,
    @Body() comment: Comment,
    @CurrentUser() user: User
  ): Promise<Comment> {
    const ticket: Ticket | undefined = await Ticket.findOne(id)
    if (!ticket) throw new NotFoundError(cannotFindTicketStr)
    console.log(comment)
    comment.user = user
    comment.ticket = ticket
    return comment.save()
  }

  @Authorized()
  @Put('/comments/:id')
  public async updateComment(
    @Param('id') id: number,
    @Body() update: Partial<Comment>,
    @CurrentUser() user: User
  ): Promise<Comment> {
    const comment = await Comment.findOne(id, { relations: ['user'] })
    if (!comment) throw new NotFoundError(cannotFindCommentStr)
    if (comment.user.id !== user.id) throw new UnauthorizedError(unauthorizedCommentStr)
    return Comment.merge(comment, update).save()
  }

  @Authorized()
  @Delete('/comments/:id')
  public async deleteComment(
    @Param('id') id: number,
    @CurrentUser() user: User
  ): Promise<Comment> {
    const comment = await Comment.findOne(id, { relations: ['user'] })
    if (!comment) throw new NotFoundError(cannotFindCommentStr)
    if (comment.user.id !== user.id) throw new UnauthorizedError(unauthorizedCommentStr)
    return comment.remove()
  }
}
