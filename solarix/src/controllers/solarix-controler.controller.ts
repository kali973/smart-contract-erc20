import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere, Model,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Actif, ActifRelations, MyModel} from '../models';
import {ActifRepository} from '../repositories';

export class SolarixControlerController {
  constructor(
    @repository(ActifRepository)
    public actifRepository : ActifRepository,
  ) {}

  @post('/solarix')
  @response(200, {
    description: 'Model model instance',
    content: {'application/json': {schema: getModelSchemaRef(MyModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyModel, {
            title: 'NewModel',
            exclude: ['id'],
          }),
        },
      },
    })
    model: Omit<Model, 'id'>,
  ): Promise<Model> {
    return this.actifRepository.create(model);
  }

  @get('/solarix/count')
  @response(200, {
    description: 'Model model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Model) where?: Where<Model>,
  ): Promise<Count> {
    return this.actifRepository.count(where);
  }

  @get('/solarix')
  @response(200, {
    description: 'Array of Model model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Model, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MyModel) filter?: Filter<MyModel>,
  ): Promise<(Actif & ActifRelations)[]> {
    return this.actifRepository.find(filter);
  }

  @patch('/solarix')
  @response(200, {
    description: 'Model PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model, {partial: true}),
        },
      },
    })
    model: Model,
    @param.where(Model) where?: Where<Model>,
  ): Promise<Count> {
    return this.actifRepository.updateAll(model, where);
  }

  @get('/solarix/{id}')
  @response(200, {
    description: 'Model model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Model, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MyModel, {exclude: 'where'}) filter?: FilterExcludingWhere<Model>
  ): Promise<Actif & ActifRelations> {
    return this.actifRepository.findById(id, filter);
  }

  @patch('/solarix/{id}')
  @response(204, {
    description: 'Model PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model, {partial: true}),
        },
      },
    })
    model: Model,
  ): Promise<void> {
    await this.actifRepository.updateById(id, model);
  }

  @put('/solarix/{id}')
  @response(204, {
    description: 'Model PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() model: Model,
  ): Promise<void> {
    await this.actifRepository.replaceById(id, model);
  }

  @del('/solarix/{id}')
  @response(204, {
    description: 'Model DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.actifRepository.deleteById(id);
  }
}
