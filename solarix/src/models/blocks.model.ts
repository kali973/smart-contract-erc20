import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'blocks'}}
})
export class Blocks extends Entity {
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
    postgresql: {columnName: 'number', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: undefined},
  })
  number: number;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'hash', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  hash: string;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'parent_hash', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  parentHash: string;

  @property({
    type: 'date',
    required: true,
    generated: false,
    postgresql: {columnName: 'timestamp', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  timestamp: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    generated: false,
    postgresql: {columnName: 'nonce', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: undefined},
  })
  nonce: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Blocks>) {
    super(data);
  }
}

export interface BlocksRelations {
  // describe navigational properties here
}

export type BlocksWithRelations = Blocks & BlocksRelations;
