import Model, { InformationData } from '../../libs/model';
import Restrictions from '../../libs/restrictions';
import Rule from '../../libs/restrictions/rule';
import Dictionary from '../../libs/dictionary';
import SchemaField from './field';

export type EventArgsMap = {};

export type Data = InformationData & {};

export default class SchemaNode extends Model<Data, EventArgsMap> {

  public parentsRestrictions: Restrictions<SchemaNode> | undefined = undefined;

  public childrenRestriction: Restrictions<SchemaNode> | undefined = undefined;

  public dictionaries: Dictionary<any>[] = [];

  public fields: SchemaField<unknown, InformationData>[] = [];

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

  protected onModelDataDefined(): void {

  }
}
