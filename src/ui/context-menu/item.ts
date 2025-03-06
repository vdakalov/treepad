import Ui from '../../libs/ui';
import { MenuItemHandler } from '../../libs/context-menu';

export default abstract class Item extends Ui<HTMLLIElement> {
  constructor(handler?: MenuItemHandler) {
    super('li');
    if (handler !== undefined) {
      this.uiNodeElement.addEventListener('click', this.onClick.bind(this, handler));
    }
  }

  protected onClick(handler: MenuItemHandler, event: MouseEvent): void {
    handler(event);
  }
}
