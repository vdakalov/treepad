import Model, { InformationData } from '../../libs/model';
import Restrictions from '../../libs/restrictions';
import Rule from '../../libs/restrictions/rule';
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
};

export default class SchemaNodeModel extends Model<Data, EventArgsMap> {

  public parentsRestrictions: Restrictions<SchemaNodeModel> | undefined = undefined;

  public childrenRestriction: Restrictions<SchemaNodeModel> | undefined = undefined;

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
      && this.parentsRestrictions.rule === Rule.Allow
      && this.parentsRestrictions.items.length === 0;
  }

  public get isLeaf(): boolean {
    return this.childrenRestriction !== undefined
      && this.childrenRestriction.rule === Rule.Allow
      && this.childrenRestriction.items.length === 0;
  }

  public readonly schema: SchemaModel;

  constructor(data: Data, schema: SchemaModel) {
    super(data);
    this.schema = schema;
  }

  public remove(): void {
    if (this.schema.removeNode(this)) {
      this.emit(Event.Deleted, this);
    }
  }
}
