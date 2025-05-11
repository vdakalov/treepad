import Model from '../../libs/model';
import { Data as ModelData } from '../model';
import ModelModel from '../model';

export enum Event {
  ModelAppended = 'ModelAppended',
}

export type EventArgsMap = {
  [Event.ModelAppended]: [model: ModelModel];
};

export type Data = ModelData[];

export default class ModelsModel extends Model<Data, EventArgsMap> {

  public readonly modelModels: ModelModel[] = this.initialize();

  constructor(data: Data) {
    super(data);
    this.resolveReferences();
  }

  private initialize(): ModelModel[] {
    return this.data.map(data => new ModelModel(data));
  }

  private resolveReferences(): void {
    for (const model of this.modelModels) {
      model.resolveReferences();
    }
  }

  public create(name: string, description?: string): void {
    const model = ModelModel.create(name, description);
    this.data.push(model.data);
    this.modelModels.push(model);
    this.emit(Event.ModelAppended, model);
  }
}
