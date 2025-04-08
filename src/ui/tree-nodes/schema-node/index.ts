import ModelTreeNodeUi from '../model';
import SchemaNodeModel, { Event } from '../../../models/schema-node';
import { MenuItem } from '../../../libs/context-menu';
import RestrictionsSchemaNodeTreeNodeUi from '../schema-node-restriction';
import Context from '../../../libs/context';
import { Option } from '../../html/select';
import RestrictionSchemaNodeTreeNodeUi from '../schema-node-restriction/node';

export default class SchemaNodeTreeNodeUi extends ModelTreeNodeUi<SchemaNodeModel> {

  private parentRestrictions: RestrictionsSchemaNodeTreeNodeUi
    = new RestrictionsSchemaNodeTreeNodeUi('Parents', this.model.parentsRestrictions);

  constructor(model: SchemaNodeModel, context: Context) {
    super(model, context);
    this.toolbar.label.text = this.model.data.name;
    this.children.uiNodeAppend(this.parentRestrictions);
    this.enableToolbarLabelContextMenu();

    this.context.contextMenu.register(this.onParentsRestrictionsContextMenu.bind(this), [
      this.parentRestrictions.toolbar.label.uiNodeElement
    ]);

    this.model
      .on(Event.Renamed, this.onRenamed.bind(this))
      .on(Event.Deleted, this.onDeleted.bind(this));
  }

  private onRenamed(): void {
    this.toolbar.label.text = this.model.name;
  }

  private onDeleted(): void {
    this.uiNodeRemove();
  }

  private onAddNodeToParentsRestrictions(): void {
    const options: Option[] = [];
    const map: Record<string, SchemaNodeModel> = {};
    for (const node of this.model.schema.nodes) {
      if (node.id !== this.model.id) {
        options.push({ value: node.id, text: node.name });
        map[node.id] = node;
      }
    }
    if (options.length === 0) {
      this.context.alert.open('Select parents restriction node', 'No other nodes to select');
      return;
    }
    this.context.select.open(
      'Select parents restriction node',
      'Select node to restrict possible parent:',
      0, options, value => {
        if (value !== undefined && map[value] !== undefined) {
          const model = map[value];
          const node = new RestrictionSchemaNodeTreeNodeUi(model)
            .uiNodeAppendTo(this.parentRestrictions.children);
          // debugger;
        }
      });

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

  private onParentsRestrictionsContextMenu(): MenuItem[] {
    return [{
      text: 'Add node',
      handler: this.onAddNodeToParentsRestrictions.bind(this),
    }];
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
