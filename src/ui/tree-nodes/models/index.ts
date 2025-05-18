import { MenuItem } from '../../../libs/context-menu';
import ModelsModel, { Event as ModelsModelEvent } from '../../../models/models';
import ModelTreeNodeUiNc from '../model';
import ModelTreeNodeUi from '../model/index';

export default class ModelsTreeNodeUi extends ModelTreeNodeUiNc<ModelsModel> {

  private onNewModelActivated(): void {
    this.context.prompt.open('New model', 'Enter model name:', 'New model', name => {
      if (name !== undefined && name.length !== 0) {
        this.model.create(name);
      }
    });
  }

  protected onModelDefined(): void {
    // set node label
    this.toolbar.label.text = 'models';

    // // initialize exists nodes
    for (const modelModel of this.model.modelModels) {
      const child = new ModelTreeNodeUi(modelModel, this.context);
      this.children.uiNodeAppend(child);
    }

    // listen to model updates
    this.model.on(ModelsModelEvent.ModelAppended, model => {
      const child = new ModelTreeNodeUi(model, this.context);
      this.children.uiNodeAppend(child);
    });

    // define context menu
    this.enableToolbarLabelContextMenu();
  }

  protected onToolbarLabelContextMenu(): MenuItem[] {
    return [
      {
        text: 'New model',
        handler: this.onNewModelActivated.bind(this)
      }
    ];
  }
}
