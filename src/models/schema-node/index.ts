import Model, { InformationData } from '../../libs/model';
import { Data as RestrictionData } from '../../libs/restrictions';
import SchemaNodeRestrictions from './restrictions';
import Method from '../../libs/restrictions/method';
import Dictionary from '../../libs/dictionary';
import SchemaField from './field';
import SchemaModel from '../schema';

export enum Event {
  Renamed = 'Renamed',
  Deleted = 'Deleted',
}

export type EventArgsMap = {
  [Event.Renamed]: [newName: string, previousName: string];
  [Event.Deleted]: [deletedNode: SchemaNodeModel];
};

export type Data = InformationData & {
  id: string;
  restrictions: {
    parents: RestrictionData<string>;
    children: RestrictionData<string>;
  };
};

export default class SchemaNodeModel extends Model<Data, EventArgsMap> {

  public readonly parentsRestrictions: SchemaNodeRestrictions;

  public readonly childrenRestriction: SchemaNodeRestrictions;

  public dictionaries: Dictionary<any>[] = [];

  public fields: SchemaField<unknown, InformationData>[] = [];

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

  public get isRoot(): boolean {
    return this.parentsRestrictions !== undefined
      && this.parentsRestrictions.method === Method.Allow
      && this.parentsRestrictions.items.length === 0;
  }

  public get isLeaf(): boolean {
    return this.childrenRestriction !== undefined
      && this.childrenRestriction.method === Method.Allow
      && this.childrenRestriction.items.length === 0;
  }

  public readonly schema: SchemaModel;

  constructor(data: Data, schema: SchemaModel) {
    super(data);
    this.schema = schema;
    this.parentsRestrictions = new SchemaNodeRestrictions(data.restrictions.parents);
    this.childrenRestriction = new SchemaNodeRestrictions(data.restrictions.children);
  }

  public resolveReferences(): void {
    if (this.data.restrictions !== undefined) {
      if (this.data.restrictions.parents !== undefined) {
        for (const id of this.data.restrictions.parents.items) {
          const node = this.schema.getNodeById(id);
          if (node === undefined) {
            throw new ReferenceError(`${this.constructor.name}: Unable to get ${
              SchemaNodeModel.name}#${id} from ${this.schema}`);
          }
          this.parentsRestrictions.addSchemaNode(node);
        }
      }
      if (this.data.restrictions.children !== undefined) {
        for (const id of this.data.restrictions.children.items) {
          const node = this.schema.getNodeById(id);
          if (node === undefined) {
            throw new ReferenceError(`${this.constructor.name}: Unable to get ${
              SchemaNodeModel.name}#${id} from ${this.schema}`);
          }
          this.childrenRestriction.addSchemaNode(node);
        }
      }
    }
  }

  public remove(): void {
    if (this.schema.removeNode(this)) {
      this.emit(Event.Deleted, this);
    }
  }

  public toString(): string {
    return `${super.toString()}#${this.id}/${this.name}`;
  }
}
