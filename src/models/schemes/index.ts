import Model from '../../libs/model';
import SchemaModel, { Data as SchemaData } from '../schema';
import { createMrs36 } from '../../libs/utils';

export enum Event {
  SchemaAppended = 'SchemaAppended',
}

export type EventArgsMap = {
  [Event.SchemaAppended]: [model: SchemaModel];
};

export type Data = SchemaData[];

export default class SchemesModel extends Model<Data, EventArgsMap> {

  public readonly schemaModels: SchemaModel[] = this.initializeSchemaModels();

  constructor(data: Data) {
    super(data);
    this.resolveReferences();
  }

  private initializeSchemaModels(): SchemaModel[] {
    return this.data
      .map(data => new SchemaModel(data));
  }

  private resolveReferences(): void {
    for (const model of this.schemaModels) {
      model.resolveReferences();
    }
  }

  public newSchema(name: string, description?: string): SchemaModel {
    const schemaModel = new SchemaModel({
      id: createMrs36(),
      name, description, nodes: [], roots: []
    });
    this.data.push(schemaModel.data);
    this.schemaModels.push(schemaModel);
    this.emit(Event.SchemaAppended, schemaModel);
    return schemaModel;
  }
}
