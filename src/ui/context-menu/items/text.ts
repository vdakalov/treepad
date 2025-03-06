import Item from '../item';
import { MenuItem } from '../../../libs/context-menu';

export default class TextItem extends Item {
  constructor(item: MenuItem) {
    super(item.handler);
    this.uiNodeElement.textContent = item.text;
  }
}
