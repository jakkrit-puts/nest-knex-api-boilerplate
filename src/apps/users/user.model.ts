import { BaseModel } from '../../common/base.model';
import { KnexService } from '../../database/knex.service';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

export class UserModel extends BaseModel<User> {
  constructor(knexService: KnexService) {
    super(knexService, 'users');
  }
}
