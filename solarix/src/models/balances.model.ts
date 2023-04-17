import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'balances'}}
})
export class Balances extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    generated: true,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: undefined},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    generated: false,
    postgresql: {columnName: 'address_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: undefined},
  })
  addressId: number;

  @property({
    type: 'number',
    required: true,
    precision: 36,
    scale: 18,
    generated: false,
    postgresql: {columnName: 'balance', dataType: 'numeric', dataLength: null, dataPrecision: 36, dataScale: 18, nullable: 'NO', generated: undefined},
  })
  balance: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Balances>) {
    super(data);
  }
}

export interface BalancesRelations {
  // describe navigational properties here
}

export type BalancesWithRelations = Balances & BalancesRelations;
