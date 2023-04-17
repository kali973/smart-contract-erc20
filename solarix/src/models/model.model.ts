import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class MyModel extends Model {
  @property({
    type: 'string',
    required: true,
  })
  solarix: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MyModel>) {
    super(data);
  }
}

export interface ModelRelations {
  // describe navigational properties here
}

export type ModelWithRelations = MyModel & ModelRelations;
