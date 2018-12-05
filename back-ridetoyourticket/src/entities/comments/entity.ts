import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

import User from '../users/entity'
import Ticket from '../tickets/entity'

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number

  @Column('text', { nullable: false })
  public content: string

  @ManyToOne(() => User, user => user.comments)
  public user: User

  @ManyToOne(() => Ticket, ticket => ticket.comments)
  public ticket: Ticket
}
