import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {Blocks, BlocksRelations} from '../models';

export class BlocksRepository extends DefaultCrudRepository<
  Blocks,
  typeof Blocks.prototype.id,
  BlocksRelations
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(Blocks, dataSource);
  }
}
