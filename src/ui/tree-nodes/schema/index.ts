import ModelTreeNodeUi from '../../tree-nodes/model';
import SchemaModel, { Event } from '../../../models/schema';
import SchemaNodeModel from '../../../models/schema-node';
import { MenuItem } from '../../../libs/context-menu';
import SchemaNodeTreeNodeUi from '../schema-node';
import { createMrs36 } from '../../../libs/utils';
import Method from '../../../libs/restrictions/method';

export default class SchemaTreeNodeUi extends ModelTreeNodeUi<SchemaModel> {

  private onContextMenuNewNode(): void {
    this.context.prompt.open('New node', 'Enter new node name:', 'New node', name => {
      if (name !== undefined && name.length !== 0) {
        const nodeModel = new SchemaNodeModel({
          id: createMrs36(),
          name,
          restrictions: {
            parents: {
              method: Method.Deny,
              items: []
            },
            children: {
              method: Method.Deny,
              items: []
            }
          }
        }, this.model);
        this.model.appendNode(nodeModel);
      }
    });
  }

  private onContextMenuRename(): void {
    this.context.prompt.open('Rename schema', 'Enter new schema name:', this.model.name, name => {
      if (name !== undefined && name.length !== 0) {
        this.model.name = name;
      }
    });
  }

  private onNameChanged(newName: string, previousName: string): void {
    this.toolbar.label.text = this.model.name;
  }

  private onNodeAppended(model: SchemaNodeModel): void {
    const ui = new SchemaNodeTreeNodeUi(model, this.context);
    this.children.uiNodeAppend(ui);
  }

  protected onModelDefined() {
    // set node label
    this.toolbar.label.text = this.model.name;

    // listen for model updates
    this.model
      .on(Event.NodeAppended, this.onNodeAppended.bind(this))
      .on(Event.NameChanged, this.onNameChanged.bind(this));

    // create existent nodes
    for (const data of this.model.data.nodes) {
      const model = new SchemaNodeModel(data, this.model);
      const ui = new SchemaNodeTreeNodeUi(model, this.context);
      this.children.uiNodeAppend(ui);
    }

    // define context menu
    this.enableToolbarLabelContextMenu();
  }

  protected onToolbarLabelContextMenu(): MenuItem[] {
    return [{
      text: 'New node',
      handler: this.onContextMenuNewNode.bind(this)
    }, {
      text: 'Rename',
      handler: this.onContextMenuRename.bind(this)
    }];
  }

}
