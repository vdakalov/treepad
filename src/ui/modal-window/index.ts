import Ui from '../../libs/ui';
import ModalWindowHeader from './header';
import ModalWindowContent from './content';
import ModalWindowControl from './controls/control';
import ModalWindowControls from './controls';
import { EventArgsMap } from '../../libs/event-emitter';

export default abstract class ModalWindow<E extends EventArgsMap = EventArgsMap> extends Ui<HTMLDivElement, E> {

  protected get showed(): boolean {
    return this.uiNodeElement.parentElement !== null;
  }

  protected set title(value: string) {
    this.header.title.text = value;
  }

  protected readonly header: ModalWindowHeader = new ModalWindowHeader()
    .uiNodeAppendTo(this);

  protected content: ModalWindowContent = new ModalWindowContent()
    .uiNodeAppendTo(this);

  protected controls: ModalWindowControls = new ModalWindowControls()
    .uiNodeAppendTo(this);

  constructor() {
    super('div');
    this.uiNodeElement.tabIndex = 0;
    this.uiNodeElement.addEventListener('keydown', this.onKeydown.bind(this));
  }

  private onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter': {
        const control = this.controls.uiNodeChildren
          .find(child => child instanceof ModalWindowControl && child.defaultOnKey === 'Enter') as ModalWindowControl;
        if (control) {
          control.button.uiNodeElement.click();
        }
        break;
      }
      case 'Escape': {
        const control = this.controls.uiNodeChildren
          .find(child => child instanceof ModalWindowControl && child.defaultOnKey === 'Escape') as ModalWindowControl;
        if (control) {
          control.button.uiNodeElement.click();
        } else {
          this.hide();
        }
        break;
      }
    }
  }

  protected onShowed(): void {}

  protected onHidden(): void {}

  protected show(): void {
    window.document.body.appendChild(this.uiNodeElement);
    this.uiNodeElement.focus();
    this.onShowed();
  }

  protected hide(): void {
    if (this.uiNodeElement.parentElement !== null) {
      this.uiNodeElement.parentElement.removeChild(this.uiNodeElement);
      this.onHidden();
    }
  }
}
