import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'proprietaires'}}
})
export class Proprietaires extends Entity {
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
    postgresql: {columnName: 'nom', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  nom: string;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'prenom', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  prenom: string;

  @property({
    type: 'string',
    required: true,
    generated: false,
    postgresql: {columnName: 'adresse', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  adresse: string;

  @property({
    type: 'string',
    generated: false,
    postgresql: {columnName: 'telephone', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  telephone?: string;

  @property({
    type: 'string',
    generated: false,
    postgresql: {columnName: 'email', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  email?: string;

  @property({
    type: 'date',
    generated: false,
    postgresql: {columnName: 'date_naissance', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  dateNaissance?: string;

  @property({
    type: 'string',
    generated: false,
    postgresql: {columnName: 'profession', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  profession?: string;

  @property({
    type: 'number',
    generated: false,
    postgresql: {columnName: 'revenu_annuel', dataType: 'numeric', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  revenuAnnuel?: number;

  @property({
    type: 'string',
    generated: false,
    postgresql: {columnName: 'statut_marital', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  statutMarital?: string;

  @property({
    type: 'number',
    scale: 0,
    generated: false,
    postgresql: {columnName: 'nb_enfants', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES', generated: undefined},
  })
  nbEnfants?: number;

  @property({
    type: 'date',
    generated: false,
    postgresql: {columnName: 'date_achat', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  dateAchat?: string;

  @property({
    type: 'number',
    generated: false,
    postgresql: {columnName: 'cout_achat', dataType: 'numeric', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  coutAchat?: number;

  @property({
    type: 'string',
    generated: false,
    postgresql: {columnName: 'garantie', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  garantie?: string;

  @property({
    type: 'date',
    generated: false,
    postgresql: {columnName: 'fin_garantie', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  finGarantie?: string;

  @property({
    type: 'string',
    generated: false,
    postgresql: {columnName: 'etat', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  etat?: string;

  @property({
    type: 'string',
    generated: false,
    postgresql: {columnName: 'autre_info', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  autreInfo?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Proprietaires>) {
    super(data);
  }
}

export interface ProprietairesRelations {
  // describe navigational properties here
}

export type ProprietairesWithRelations = Proprietaires & ProprietairesRelations;
