import Ui from '../../libs/ui';
import TreeUi from './index';
import TreeNodeToolbarUi from './toolbar';
import { Event } from './toolbar/items/collapse-button';
import { EventArgsMap } from '../../libs/event-emitter';

export default abstract class TreeNodeUi<E extends EventArgsMap = EventArgsMap> extends Ui<HTMLLIElement, E> {

  public readonly toolbar: TreeNodeToolbarUi = new TreeNodeToolbarUi()
    .uiNodeAppendTo(this);

  public readonly children: TreeUi = new TreeUi()
    .uiNodeAppendTo(this);

  public get collapsed(): boolean {
    return this.children.uiNodeParent === undefined;
  }

  constructor() {
    super('li');
    this.toolbar.collapseButton
      .on(Event.Activate, this.toggleCollapseState.bind(this, undefined));
  }

  public collapse(): boolean {
    if (!this.collapsed) {
      this.children.uiNodeRemove();
      this.uiNodeElement.classList.add('collapsed');
      return true;
    }
    return false;
  }

  public expand(): boolean {
    if (this.collapsed) {
      this.children.uiNodeAppendTo(this);
      this.uiNodeElement.classList.remove('collapsed');
      return true;
    }
    return false;
  }

  /**
   * By define tree is expanded. So we control only collapse state
   * So `true` mean `do collapse` or `collapsed now` and `false` means
   * `do expand` or `expanded now`.
   * @param expand true do collapse, false - expand
   * @returns {boolean} new state where true means collapsed, false - expanded
   */
  public toggleCollapseState(expand: boolean = this.collapsed): boolean {
    if (expand) {
      this.expand();
      return false;
    }
    this.collapse();
    return true;
  }
}
