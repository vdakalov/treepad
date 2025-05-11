import Model, { InformationData } from '../../libs/model';
import ModelNodeModel, { Data as ModelNodeData } from '../model-node';
import { createMrs36 } from '../../libs/utils';

export enum Event {
}

export type EventArgsMap = {
};

export type Data = InformationData & {
  id: string;
  roots: ModelNodeData[];
};

export default class ModelModel extends Model<Data, EventArgsMap> {

  public static create(name: string, description?: string): ModelModel {
    return new this({
      id: createMrs36(),
      name, description,
      roots: []
    });
  }

  public get id(): string {
    return this.data.id;
  }

  public get name(): string {
    return this.data.name;
  }

  public set name(value: string) {
    this.data.name = value;
  }

  public get description(): string | undefined {
    return this.data.description;
  }

  public set description(value: string | undefined) {
    this.data.description = value;
  }

  public readonly roots: ModelNodeModel[];

  constructor(data: Data) {
    super(data);
    this.roots = data.roots
      .map(data => new ModelNodeModel(data, this))
  }

  public resolveReferences(): void {
    // for (const node of this.roots) {
    //   node.resolveReferences();
    // }
  }
}
