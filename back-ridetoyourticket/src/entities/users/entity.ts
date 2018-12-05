import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

import Event from '../events/entity'
import Ticket from '../tickets/entity'
import Comment from '../comments/entity'

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number

  @Column('text', { nullable: false })
  public firstName: string

  @Column('text', { nullable: false })
  public lastName: string

  public fullName = (): string => this.firstName + ' ' + this.lastName

  @Column('text', { nullable: false })
  public email: string

  @OneToMany(() => Event, event => event.user)
  public events: Event[]

  @OneToMany(() => Ticket, ticket => ticket.user)
  public tickets: Ticket[]

  @Exclude()
  public isTheOnlyTicket: () => boolean = () => this.tickets.length === 1

  @OneToMany(() => Comment, comment => comment.user)
  public comments: Comment[]

  @Column('text', { nullable: true })
  @Exclude({ toPlainOnly: true })
  public password: string

  public async setPassword(rawPassword: string) {
    this.password = await bcrypt.hash(rawPassword, 10)
  }

  public checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}
