import { BaseModel } from '../../common/base.model';
import { KnexService } from '../../database/knex.service';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string,
  password: string;
  role: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}

export class UserModel extends BaseModel<User> {

  constructor(knexService: KnexService) {
    super(knexService, 'users');
  }

  // can create more from base-model ตรงนี้ก็ได้
  // findByEmail(email: string) {
  //   return this.knex('users').where({ email }).first();
  // }

  // findByUsername(username: string) {
  //   return this.knex('users').where({ username }).first();
  // }
}
