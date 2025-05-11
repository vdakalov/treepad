import Model, { InformationData } from '../../libs/model';
import ModelModel from '../model';

export enum Event {
  ChildAppended = 'ChildAppended',
}

export type EventArgsMap = {
  [Event.ChildAppended]: [child: ModelNodeModel];
};

export type Data<V = unknown> = InformationData & {
  id: string;
  children: Data[];
  value: V;
};

export default class ModelNodeModel<V = unknown> extends Model<Data<V>, EventArgsMap> {

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

  public get value(): V {
    return this.data.value;
  }

  public set value(value: V) {
    this.data.value = value;
  }

  public parent: ModelNodeModel | undefined;

  public readonly children: ModelNodeModel[];

  protected readonly model: ModelModel;

  constructor(data: Data<V>, model: ModelModel, parent?: ModelNodeModel<any>) {
    super(data);
    this.model = model;
    this.parent = parent;
    this.children = data.children
      .map(data => new ModelNodeModel(data, model));
  }

  public append(node: ModelNodeModel<any>): void {
    this.data.children.push(node.data);
    this.children.push(node);
    node.parent = this;
    this.emit(Event.ChildAppended, node);
  }
}
