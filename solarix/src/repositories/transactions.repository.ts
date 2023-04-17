import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {Transactions, TransactionsRelations} from '../models';

export class TransactionsRepository extends DefaultCrudRepository<
  Transactions,
  typeof Transactions.prototype.id,
  TransactionsRelations
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(Transactions, dataSource);
  }
}
