import TreeNodeUi from '../node';
import TreeUi from '../index';
import TreeNodeToolbarCollapseButtonUi from '../toolbar/items/collapse-button';

export default class CollapsableTreeNode extends TreeNodeUi {

  public readonly button = new TreeNodeToolbarCollapseButtonUi()
    .setActivationHandler(this.toggle.bind(this))
    .uiNodeAppendTo(this.toolbar, 0);

  private toggle(): void {
    if (this.uiNodeElement.classList.toggle('collapsed')) {
      this.children.uiNodeRemove();
    } else {
      this.children.uiNodeAppendTo(this);
    }
  }
}
