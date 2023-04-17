import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, postgresql: {schema: 'public', table: 'actif'}}})
export class Actif extends Entity {
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
    precision: 36,
    scale: 18,
    generated: false,
    postgresql: {columnName: 'power', dataType: 'numeric', dataLength: null, dataPrecision: 36, dataScale: 18, nullable: 'NO', generated: undefined},
  })
  power: number;

  @property({
    type: 'number',
    required: true,
    precision: 36,
    scale: 18,
    generated: false,
    postgresql: {columnName: 'efficiency', dataType: 'numeric', dataLength: null, dataPrecision: 36, dataScale: 18, nullable: 'NO', generated: undefined},
  })
  efficiency: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    generated: false,
    postgresql: {columnName: 'quantity', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: undefined},
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
    precision: 36,
    scale: 18,
    generated: false,
    postgresql: {columnName: 'surface', dataType: 'numeric', dataLength: null, dataPrecision: 36, dataScale: 18, nullable: 'NO', generated: undefined},
  })
  surface: number;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'manufacturer', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  manufacturer: string;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'model', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  model: string;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'token', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  token: string;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'tokenaddress', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  tokenaddress: string;

  @property({
    type: 'geopoint',
    generated: false,
    postgresql: {columnName: 'geolocation', dataType: 'point', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  geolocation?: string;

  @property({
    type: 'number',
    required: true,
    precision: 36,
    scale: 18,
    generated: false,
    postgresql: {columnName: 'energyproduction', dataType: 'numeric', dataLength: null, dataPrecision: 36, dataScale: 18, nullable: 'NO', generated: undefined},
  })
  energyproduction: number;

  @property({
    type: 'number',
    required: true,
    precision: 36,
    scale: 18,
    generated: false,
    postgresql: {columnName: 'productionlimit', dataType: 'numeric', dataLength: null, dataPrecision: 36, dataScale: 18, nullable: 'NO', generated: undefined},
  })
  productionlimit: number;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'producer', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  producer: string;

  @property({
    type: 'number',
    scale: 0,
    generated: false,
    postgresql: {columnName: 'proprietaire_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES', generated: undefined},
  })
  proprietaireId?: number;

  @property({
    type: 'number',
    scale: 0,
    generated: false,
    postgresql: {columnName: 'block_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES', generated: undefined},
  })
  blockId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Actif>) {
    super(data);
  }
}

export interface ActifRelations {
  // describe navigational properties here
}

export type ActifWithRelations = Actif & ActifRelations;
