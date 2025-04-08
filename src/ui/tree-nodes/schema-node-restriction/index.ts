import Restrictions from '../../../libs/restrictions';
import SchemaNodeModel from '../../../models/schema-node';
import TreeNodeUi from '../../tree/node';

export default class RestrictionsSchemaNodeTreeNodeUi extends TreeNodeUi {

  public get label(): string {
    return this.toolbar.label.text;
  }

  public set label(value: string) {
    this.toolbar.label.text = value;
  }

  public readonly restrictions: Restrictions<SchemaNodeModel> | undefined;

  constructor(label: string, restrictions?: Restrictions<SchemaNodeModel>) {
    super();
    this.label = label;
    this.restrictions = restrictions;
  }
}
