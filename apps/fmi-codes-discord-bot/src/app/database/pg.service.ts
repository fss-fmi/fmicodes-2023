import {Injectable} from '@nestjs/common';
import pg from 'pg';

@Injectable()
export class PgService {
  client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
  });

  constructor() {
    console.log(process.env.DATABASE_URL);
    this.client.connect();
  }
}
