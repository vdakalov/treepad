import Ui from '../../../libs/ui';

export default abstract class TreeNodeToolbarItemUi<T extends HTMLElement> extends Ui<HTMLLIElement> {

  protected readonly itemElement: T;

  constructor(tagName: keyof HTMLElementTagNameMap) {
    super('li');
    this.itemElement = this.uiNodeCreateChildren(tagName) as T;
  }
}
