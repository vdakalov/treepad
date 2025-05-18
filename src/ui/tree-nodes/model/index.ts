import ModelTreeNodeUiNc from '../model';
import { Event as ModelsEvent } from '../../../models/models';
import ModelModel, { Event as ModelEvent } from '../../../models/model';
import { MenuItem } from '../../../libs/context-menu';

export default class ModelTreeNodeUi extends ModelTreeNodeUiNc<ModelModel> {

  private onRename(): void {
    this.context.prompt.open('Rename model', 'Enter new model name:', this.model.name, name => {
      if (name !== undefined && name.length !== 0) {
        this.model.name = name;
      }
    });
  }

  private onDelete(): void {
    this.context.models.model.delete(this.model.id);
  }

  private onAddRoot(): void {
    // this.context.prompt.open('New model root', '')
  }

  protected onModelDefined() {
    this.toolbar.label.text = this.model.name;

    this.model.on(ModelEvent.Renamed, name => {
      this.toolbar.label.text = name;
    });

    this.context.models.model.on(ModelsEvent.ModelDeleted, model => {
      if (model === this.model) {
        this.uiNodeRemove();
      }
    });

    this.enableToolbarLabelContextMenu();
  }

  protected onToolbarLabelContextMenu(): MenuItem[] {
    return [{
      text: 'Rename',
      handler: this.onRename.bind(this)
    }, {
      text: 'Delete',
      handler: this.onDelete.bind(this)
    }, {
      text: 'Add root',
      handler: this.onAddRoot.bind(this)
    }];
  }
}
