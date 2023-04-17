import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {Balances, BalancesRelations} from '../models';

export class BalancesRepository extends DefaultCrudRepository<
  Balances,
  typeof Balances.prototype.id,
  BalancesRelations
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(Balances, dataSource);
  }
}
