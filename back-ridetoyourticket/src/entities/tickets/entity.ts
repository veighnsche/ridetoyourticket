import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

import User from '../users/entity'
import Event from '../events/entity'
import Comment from '../comments/entity'

import { percentageDifference } from '../../utils'
import { Exclude } from 'class-transformer'

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number

  @Column('timestamp', { nullable: false })
  public createdAt: Date

  @Exclude()
  private isCreatedOutsideWorkingHours = (): boolean => {
    const hour = this.createdAt.getHours()
    return hour < 9 || hour >= 17
  }

  @Column('text', { nullable: false })
  public description: string

  @Column('int', { nullable: false })
  public price: number

  @Column('text')
  public picture: string

  @ManyToOne(() => User, user => user.tickets)
  public user: User

  @ManyToOne(() => Event, evnt => evnt.tickets)
  public event: Event

  @OneToMany(() => Comment, comment => comment.ticket)
  public comments: Comment[]

  @Exclude()
  private hasMoreThan3Comments = (): boolean => this.comments.length > 3

  public risk: number;

  @Exclude()
  public calculateRisk = () => {
    let risk: number = -10
    if (this.user.isTheOnlyTicket()) risk += 10
    const diff: number = percentageDifference(this.event.ticketsAveragePrice(), this.price)
    risk += diff < -10 ? -10 : diff
    if (this.isCreatedOutsideWorkingHours()) risk += 20
    if (this.hasMoreThan3Comments()) risk += 5
    this.risk = risk < 5 ? 5 : (risk > 95 ? 95 : risk)
  }
}
