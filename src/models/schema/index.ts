import Model, { InformationData } from '../../libs/model';
import EventEmitter from '../../libs/event-emitter';
import SchemaNode, { Data as SchemaNodeData } from './node';

export enum Event {
  NodeAppended = 'NodeAppended',
  RootNodeAppended = 'RootNodeAppended',
}

export type EventArgsMap = {
  [Event.NodeAppended]: [node: SchemaNode];
  [Event.RootNodeAppended]: [node: SchemaNode];
};

export type Data = InformationData & {
  id: string;
  nodes: SchemaNodeData[];
  roots: SchemaNodeData[];
};

export default class SchemaModel extends Model<Data, EventArgsMap> {

  public ee: EventEmitter<EventArgsMap> = new EventEmitter();

  public nodes: SchemaNode[] = [];

  public roots: SchemaNode[] = [];

  protected onModelDataDefined(): void {
    for (const nodeData of this.data.nodes) {
      const node = new SchemaNode(nodeData);
      this.nodes.push(node);
    }

    for (const nodeRootData of this.data.roots) {
      const node = new SchemaNode(nodeRootData);
      this.nodes.push(node);
    }
  }

  public appendNode(node: SchemaNode): this {
    this.data.nodes.push(node.data);
    this.nodes.push(node);
    this.ee.emit(Event.NodeAppended, node);
    return this;
  }

  public appendRootNode(node: SchemaNode): this {
    this.data.roots.push(node.data);
    this.roots.push(node);
    this.ee.emit(Event.RootNodeAppended, node);
    return this;
  }
}
