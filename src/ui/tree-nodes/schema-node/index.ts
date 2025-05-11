import ModelTreeNodeUi from '../model';
import SchemaNodeModel, { Event as SchemaNodeModelEvent } from '../../../models/schema-node';
import { MenuItem } from '../../../libs/context-menu';
import RestrictionsSchemaNodeTreeNodeUi, { Event as RestrictionsEvent } from '../schema-node-restriction';
import Context from '../../../libs/context';

export default class SchemaNodeTreeNodeUi extends ModelTreeNodeUi<SchemaNodeModel> {

  private readonly parentRestrictions: RestrictionsSchemaNodeTreeNodeUi
    = new RestrictionsSchemaNodeTreeNodeUi(this.context, this.model.parentsRestrictions, this.model, 'Parents')
    .on(RestrictionsEvent.NodeAdded, this.onRestrictParentNode.bind(this))
    .uiNodeAppendTo(this.children);

  private readonly childrenRestrictions: RestrictionsSchemaNodeTreeNodeUi
    = new RestrictionsSchemaNodeTreeNodeUi(this.context, this.model.childrenRestriction, this.model, 'Children')
    .on(RestrictionsEvent.NodeAdded, this.onRestrictChildNode.bind(this))
    .uiNodeAppendTo(this.children);

  constructor(model: SchemaNodeModel, context: Context) {
    super(model, context);
    this.toolbar.label.text = this.model.data.name;
    this.enableToolbarLabelContextMenu();

    this.model
      .on(SchemaNodeModelEvent.Renamed, this.onRenamed.bind(this))
      .on(SchemaNodeModelEvent.Deleted, this.onDeleted.bind(this));
  }

  private onRenamed(): void {
    this.toolbar.label.text = this.model.name;
  }

  private onDeleted(): void {
    this.uiNodeRemove();
  }

  private onContextMenuRename(): void {
    this.context.prompt.open('Rename node', 'Enter new name:', this.model.name, name => {
      if (name !== undefined && name.length !== 0) {
        this.model.name = name;
      }
    });
  }

  private onContextMenuDelete(): void {
    this.context.confirm.open('Delete schema node', 'Are you sure?', answer => {
      if (answer === true) {
        this.model.remove();
      }
    })
  }

  private onRestrictParentNode(model: SchemaNodeModel): void {
    this.model.parentsRestrictions.addSchemaNode(model);
  }

  private onRestrictChildNode(model: SchemaNodeModel): void {
    this.model.childrenRestriction.addSchemaNode(model);
  }

  protected onToolbarLabelContextMenu(): MenuItem[] {
    return [
      {
        text: 'Rename',
        handler: this.onContextMenuRename.bind(this),
      },
      {
        text: 'Delete',
        handler: this.onContextMenuDelete.bind(this),
      }
    ];
  }
}
