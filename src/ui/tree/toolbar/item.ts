import Ui from '../../../libs/ui';
import { EventArgsMap } from '../../../libs/event-emitter';

export default abstract class TreeNodeToolbarItemUi<T extends HTMLElement, E extends EventArgsMap = EventArgsMap> extends Ui<HTMLLIElement, E> {

  protected readonly itemElement: T;

  constructor(tagName: keyof HTMLElementTagNameMap) {
    super('li');
    this.itemElement = this.uiNodeCreateChildren(tagName) as T;
  }
}
