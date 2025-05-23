import ModelTreeNodeUi from '../model';
import SchemesModel, { Event as SchemesModelEvent } from '../../../models/schemes';
import SchemaTreeNodeUi from '../schema';
import { MenuItem } from '../../../libs/context-menu';

export default class SchemesTreeNodeUi extends ModelTreeNodeUi<SchemesModel> {

  private onNewSchemaActivated(): void {
    this.context.prompt.open('New schema', 'Enter schema name:', 'New Schema', name => {
      if (name !== undefined && name.length !== 0) {
        this.model.newSchema(name);
      }
    });
  }

  protected onModelDefined(): void {
    // set node label
    this.toolbar.label.text = 'schemes';

    // initialize exists nodes
    for (const schemaModel of this.model.schemaModels) {
      const child = new SchemaTreeNodeUi(schemaModel, this.context);
      this.children.uiNodeAppend(child);
    }

    // listen to model updates
    this.model.on(SchemesModelEvent.SchemaAppended, schemaModel => {
      const child = new SchemaTreeNodeUi(schemaModel, this.context);
      this.children.uiNodeAppend(child);
    });

    // define context menu
    this.enableToolbarLabelContextMenu();
  }

  protected onToolbarLabelContextMenu(): MenuItem[] {
    return [
      {
        text: 'New schema',
        handler: this.onNewSchemaActivated.bind(this)
      }
    ];
  }
}
