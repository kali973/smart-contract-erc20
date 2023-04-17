import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {Addresses, AddressesRelations} from '../models';

export class AddressesRepository extends DefaultCrudRepository<
  Addresses,
  typeof Addresses.prototype.id,
  AddressesRelations
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(Addresses, dataSource);
  }
}
