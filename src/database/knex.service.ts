import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import knex, { Knex } from 'knex';
import config from '../../knexfile';

@Injectable()
export class KnexService implements OnModuleInit, OnModuleDestroy {
  private knexInstance: Knex;

  constructor() {
    this.knexInstance = knex(config.development);
  }

  async onModuleInit() {
    try {
      await this.knexInstance.raw('SELECT 1+1 AS result');
      console.log('✅ Database connection successful');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
    }
  }

  async onModuleDestroy() {
    await this.knexInstance.destroy();
  }

  getKnex(): Knex {
    return this.knexInstance;
  }
}
