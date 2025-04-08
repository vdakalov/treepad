import TreeNodeUi from '../../tree/node';
import SchemaNodeModel from '../../../models/schema-node';

export default class RestrictionSchemaNodeTreeNodeUi extends TreeNodeUi {

  public model: SchemaNodeModel;

  constructor(model: SchemaNodeModel) {
    super();
    this.model = model;
    this.toolbar.label.text = this.model.name;
  }
}
