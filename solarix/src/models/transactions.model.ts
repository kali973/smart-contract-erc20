import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'transactions'}}
})
export class Transactions extends Entity {
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
    type: 'string',
    required: true,
    generated: true,
    postgresql: {columnName: 'hash', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  hash: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    generated: true ,
    postgresql: {columnName: 'block_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: undefined},
  })
  blockId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    generated: false ,
    postgresql: {columnName: 'nonce', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: undefined},
  })
  nonce: number;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'from_address', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  fromAddress: string;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'to_address', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  toAddress: string;

  @property({
    type: 'number',
    required: true,
    precision: 36,
    scale: 18,
    generated: false,
    postgresql: {columnName: 'value', dataType: 'numeric', dataLength: null, dataPrecision: 36, dataScale: 18, nullable: 'NO', generated: undefined},
  })
  value: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    generated: false,
    postgresql: {columnName: 'gas_limit', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: undefined},
  })
  gasLimit: number;

  @property({
    type: 'number',
    required: true,
    precision: 36,
    scale: 18,
    generated: false,
    postgresql: {columnName: 'gas_price', dataType: 'numeric', dataLength: null, dataPrecision: 36, dataScale: 18, nullable: 'NO', generated: undefined},
  })
  gasPrice: number;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'input', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  input: string;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'token', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  token: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Transactions>) {
    super(data);
  }
}

export interface TransactionsRelations {
  // describe navigational properties here
}

export type TransactionsWithRelations = Transactions & TransactionsRelations;
