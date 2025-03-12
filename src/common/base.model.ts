import { KnexService } from '../database/knex.service';

export abstract class BaseModel<T> {
  protected knex;

  constructor(private readonly knexService: KnexService, private readonly tableName: string) {
    this.knex = this.knexService.getKnex();
  }

  async findAll(): Promise<T[]> {
    return this.knex(this.tableName).select('*');
  }

  async findById(id: number): Promise<T | undefined> {
    return this.knex(this.tableName).where({ id }).first();
  }

  async create(data: Partial<T>): Promise<T> {
    const [record] = await this.knex(this.tableName).insert(data).returning('*');
    return record;
  }

  async update(id: number, data: Partial<T>): Promise<T | undefined> {
    const [record] = await this.knex(this.tableName)
      .where({ id })
      .update(data)
      .returning('*');
    return record;
  }

  async delete(id: number): Promise<boolean> {
    const deletedRows = await this.knex(this.tableName).where({ id }).del();
    return deletedRows > 0;
  }
}
