import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'addresses'}}
})
export class Addresses extends Entity {
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
    generated: false,
    postgresql: {columnName: 'address', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  address: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Addresses>) {
    super(data);
  }
}

export interface AddressesRelations {
  // describe navigational properties here
}

export type AddressesWithRelations = Addresses & AddressesRelations;
