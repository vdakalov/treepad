import Ui from '../../../libs/ui';
import TreeNodeToolbarCollapseButtonUi from './items/collapse-button';
import TreeNodeToolbarLabelUi from './items/label';

export default class TreeNodeToolbarUi extends Ui<HTMLUListElement> {

  public readonly collapseButton: TreeNodeToolbarCollapseButtonUi
    = new TreeNodeToolbarCollapseButtonUi()
    .uiNodeAppendTo(this);

  public readonly label: TreeNodeToolbarLabelUi = new TreeNodeToolbarLabelUi(this.constructor.name)
    .uiNodeAppendTo(this);

  constructor() {
    super('ul');
  }
}
