import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

import User from '../users/entity'
import Ticket from '../tickets/entity'
import { Exclude } from 'class-transformer'

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number

  @Column('text', { nullable: false })
  public title: string

  @Column('text', { nullable: false })
  public description: string

  @Column('text')
  public picture: string

  @Column('timestamp', { nullable: false })
  public startsAt: Date

  @Column('timestamp', { nullable: true })
  public endsAt: Date

  @ManyToOne(() => User, (user) => user.events)
  public user: User

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  public tickets: Ticket[]

  @Exclude()
  public ticketsAveragePrice = (): number => this.tickets.reduce((acc, ticket) => acc + ticket.price, 0) / this.tickets.length
}
