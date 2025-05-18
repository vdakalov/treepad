import Model, { InformationData } from '../../libs/model';
import ModelModel from '../model';
import SchemaModel from '../schema';
import Context from '../../libs/context';
import SchemaNodeModel from '../schema-node';

export enum Event {
  ChildAppended = 'ChildAppended',
}

export type EventArgsMap = {
  [Event.ChildAppended]: [child: ModelNodeModel];
};

export type Data<V = unknown> = InformationData & {
  id: string;
  schema: string;
  schemaNode: string;
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

  public get schema(): SchemaModel {
    return this.context.schemes.model
      .getEnsure(this.data.schema);
  }

  public get schemaNode(): SchemaNodeModel {
    return this.schema
      .getEnsureNodeById(this.data.schemaNode);
  }

  public parent: ModelNodeModel | undefined;

  public readonly children: ModelNodeModel[];

  protected readonly model: ModelModel;

  protected readonly context: Context;

  constructor(context: Context, data: Data<V>, model: ModelModel, parent?: ModelNodeModel<any>) {
    super(data);
    this.context = context;
    this.model = model;
    this.parent = parent;
    this.children = data.children
      .map(data => new ModelNodeModel(this.context, data, model));
  }

  public append(node: ModelNodeModel<any>): void {
    this.data.children.push(node.data);
    this.children.push(node);
    node.parent = this;
    this.emit(Event.ChildAppended, node);
  }
}
