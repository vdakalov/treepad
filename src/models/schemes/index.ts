import Model from '../../libs/model';
import SchemaModel, { Data as SchemaData } from '../schema';

export enum Event {
  SchemaAppended = 'SchemaAppended',
}

export type EventArgsMap = {
  [Event.SchemaAppended]: [model: SchemaModel];
};

export type Data = SchemaData[];

export default class SchemesModel extends Model<Data, EventArgsMap> {

  public readonly schemaModels: SchemaModel[] = [];

  protected onModelDataDefined(): void {
    for (const data of this.data) {
      const schemaModel = new SchemaModel(data);
      this.schemaModels.push(schemaModel);
    }
  }

  public newSchema(name: string, description?: string): SchemaModel {
    const schemaModel = new SchemaModel({
      id: this.createMr36(),
      name, description, nodes: [], roots: []
    });
    this.schemaModels.push(schemaModel);
    this.emit(Event.SchemaAppended, schemaModel);
    return schemaModel;
  }
}
