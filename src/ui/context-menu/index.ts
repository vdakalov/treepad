import Ui from '../../libs/ui';
import { IUi, MenuItem } from '../../libs/context-menu';
import TextItem from './items/text';

export default class ContextMenu extends Ui<HTMLUListElement> implements IUi {

  constructor() {
    super('ul');
    window.addEventListener('click', this.onGlobalClick.bind(this));
    this.uiNodeElement.addEventListener('click', this.onClick.bind(this));
  }

  private onGlobalClick(): void {
    this.hide();
  }

  private onClick(event: MouseEvent): void {
    if (event.target !== this.uiNodeElement) {
      this.hide();
    }
    event.stopPropagation();
  }

  public showAt(x: number, y: number, items: MenuItem[]): void {
    this.uiNodeRemoveAll();
    for (const item of items) {
      this.uiNodeAppend(new TextItem(item));
    }
    this.uiNodeElement.style.left = x + 'px';
    this.uiNodeElement.style.top = y + 'px';
    window.document.body.appendChild(this.uiNodeElement);
  }

  public show(event: MouseEvent, items: MenuItem[]): void {
    this.showAt(event.x, event.y, items);
  }

  public hide(): void {
    if (this.uiNodeElement.parentElement !== null) {
      this.uiNodeElement.parentElement.removeChild(this.uiNodeElement);
    }
  }
}
