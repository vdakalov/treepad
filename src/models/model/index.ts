import Model, { InformationData } from '../../libs/model';
import ModelNodeModel, { Data as ModelNodeData } from '../model-node';
import { createMrs36 } from '../../libs/utils';
import Context from '../../libs/context';

export enum Event {
  Renamed = 'Renamed',
}

export type EventArgsMap = {
  [Event.Renamed]: [newName: string, previousName: string];
};

export type Data = InformationData & {
  id: string;
  roots: ModelNodeData[];
};

export default class ModelModel extends Model<Data, EventArgsMap> {

  public static create(context: Context, name: string, description?: string): ModelModel {
    return new this(context, {
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
    if (this.data.name !== value) {
      const previous = this.data.name;
      this.data.name = value;
      this.emit(Event.Renamed, value, previous);
    }
  }

  public get description(): string | undefined {
    return this.data.description;
  }

  public set description(value: string | undefined) {
    this.data.description = value;
  }

  public readonly roots: ModelNodeModel[];

  private readonly context: Context;

  constructor(context: Context, data: Data) {
    super(data);
    this.context = context;
    this.roots = data.roots
      .map(data => new ModelNodeModel(this.context, data, this))
  }

  public resolveReferences(): void {
    // for (const node of this.roots) {
    //   node.resolveReferences();
    // }
  }
}
