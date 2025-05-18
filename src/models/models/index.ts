import Model from '../../libs/model';
import { Data as ModelData } from '../model';
import ModelModel from '../model';
import Context from '../../libs/context';

export enum Event {
  ModelAppended = 'ModelAppended',
  ModelDeleted = 'ModelDeleted'
}

export type EventArgsMap = {
  [Event.ModelAppended]: [model: ModelModel];
  [Event.ModelDeleted]: [model: ModelModel];
};

export type Data = ModelData[];

export default class ModelsModel extends Model<Data, EventArgsMap> {

  public readonly modelModels: ModelModel[] = this.initialize();

  protected readonly context: Context;

  constructor(context: Context, data: Data) {
    super(data);
    this.context = context;
    this.resolveReferences();
  }

  private initialize(): ModelModel[] {
    return this.data.map(data => new ModelModel(this.context, data));
  }

  private resolveReferences(): void {
    for (const model of this.modelModels) {
      model.resolveReferences();
    }
  }

  public create(name: string, description?: string): void {
    const model = ModelModel.create(this.context, name, description);
    this.data.push(model.data);
    this.modelModels.push(model);
    this.emit(Event.ModelAppended, model);
  }

  public delete(id: string): void {
    const dataIndex = this.data
      .findIndex(model => model.id === id);
    if (dataIndex !== -1) {
      this.data.splice(dataIndex, 1);
    }
    const modelIndex = this.modelModels
      .findIndex(model => model.id === id);
    if (modelIndex !== -1) {
      const [model] = this.modelModels.splice(modelIndex, 1);
      this.emit(Event.ModelDeleted, model);
    }
  }
}
