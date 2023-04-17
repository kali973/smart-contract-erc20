import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {Actif, ActifRelations} from '../models';

export class ActifRepository extends DefaultCrudRepository<
  Actif,
  typeof Actif.prototype.id,
  ActifRelations
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(Actif, dataSource);
  }
}
