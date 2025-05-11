import ModelTreeNodeUi from '../model';
import ModelNodeModel, { Event } from '../../../models/model-node';
import { MenuItem } from '../../../libs/context-menu';

export default class ModelNodeTreeNodeUi extends ModelTreeNodeUi<ModelNodeModel> {

  private onAddChildActivated(): void {

  }

  protected onModelDefined(): void {
    this.toolbar.label.text = this.model.name;

    for (const child of this.model.children) {
      const node = new ModelNodeTreeNodeUi(child, this.context);
      this.children.uiNodeAppend(node);
    }

    this.model.on(Event.ChildAppended, child => {
      const node = new ModelNodeTreeNodeUi(child, this.context);
      this.children.uiNodeAppend(node);
    });

    this.enableToolbarLabelContextMenu();
  }

  protected onToolbarLabelContextMenu(): MenuItem[] {
    return [{
      text: 'Add child',
      handler: this.onAddChildActivated.bind(this)
    }];
  }
}
