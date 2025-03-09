import Model, { InformationData } from '../../libs/model';
import SchemaNodeModel, { Data as SchemaNodeData } from '../schema-node';

export enum Event {
  NameChanged = 'NameChanged',
  NodeAppended = 'NodeAppended',
  RootNodeAppended = 'RootNodeAppended',
}

type EventArgsMap = {
  [Event.NameChanged]: [newName: string, previousName: string]
  [Event.NodeAppended]: [node: SchemaNodeModel];
  [Event.RootNodeAppended]: [node: SchemaNodeModel];
};

export type Data = InformationData & {
  id: string;
  nodes: SchemaNodeData[];
  roots: SchemaNodeData[];
};

export default class SchemaModel extends Model<Data, EventArgsMap> {

  public get id(): string {
    return this.data.id;
  }

  public get name(): string {
    return this.data.name;
  }

  public set name(value: string) {
    if (this.data.name !== value) {
      const previousName = this.data.name;
      this.data.name = value;
      this.emit(Event.NameChanged, value, previousName);
    }
  }

  public get description(): string | undefined {
    return this.data.description;
  }

  public nodes: SchemaNodeModel[] = [];

  public roots: SchemaNodeModel[] = [];

  constructor(data: Data) {
    super(data);

    for (const nodeData of this.data.nodes) {
      const node = new SchemaNodeModel(nodeData, this);
      this.nodes.push(node);
    }

    for (const nodeRootData of this.data.roots) {
      const node = new SchemaNodeModel(nodeRootData, this);
      this.nodes.push(node);
    }
  }

  public appendNode(node: SchemaNodeModel): this {
    this.data.nodes.push(node.data);
    this.nodes.push(node);
    this.emit(Event.NodeAppended, node);
    return this;
  }

  public removeNode(node: SchemaNodeModel): boolean {
    const nodeIndex = this.nodes.findIndex(({ data }) => data.id === node.id);
    if (nodeIndex !== -1) {
      this.nodes.splice(nodeIndex, 1);
    }
    const rootIndex = this.roots.findIndex(({ data }) => data.id === node.id);
    if (rootIndex !== -1) {
      this.roots.splice(rootIndex, 1);
    }
    const dataNodeIndex = this.data.nodes.findIndex(({ id }) => id === node.id);
    if (dataNodeIndex !== -1) {
      this.data.nodes.splice(dataNodeIndex, 1);
    }
    const dataRootIndex = this.data.roots.findIndex(({ id }) => id === node.id);
    if (dataRootIndex !== -1) {
      this.data.roots.splice(dataRootIndex, 1);
    }
    return nodeIndex !== -1
      || rootIndex !== -1
      || dataNodeIndex !== -1
      || dataRootIndex !== -1;
  }

  public appendRootNode(node: SchemaNodeModel): this {
    this.data.roots.push(node.data);
    this.roots.push(node);
    this.emit(Event.RootNodeAppended, node);
    return this;
  }
}
