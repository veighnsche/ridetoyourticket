import { createConnection } from 'typeorm'
import { CustomNamingStrategy } from './customNamingStrategy'

import Event from './entities/events/entity'
import User from './entities/users/entity'
import Ticket from './entities/tickets/entity'
import Comment from './entities/comments/entity'

export default () =>
  createConnection({
    entities: [
      User,
      Event,
      Ticket,
      Comment
    ],
    logging: true,
    namingStrategy: new CustomNamingStrategy(),
    synchronize: true,
    type: 'postgres',
    url: process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'
  })
  .then((_) => console!.log('Connected to Postgres with TypeORM'));
