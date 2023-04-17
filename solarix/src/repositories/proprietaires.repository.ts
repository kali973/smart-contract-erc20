import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {Proprietaires, ProprietairesRelations} from '../models';

export class ProprietairesRepository extends DefaultCrudRepository<
  Proprietaires,
  typeof Proprietaires.prototype.id,
  ProprietairesRelations
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(Proprietaires, dataSource);
  }
}
