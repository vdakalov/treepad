import ModalWindow from '../../ui/modal-window';
import ModalWindowControl, { Key } from '../../ui/modal-window/controls/control';
import ParagraphUiNode from '../../ui/html/paragraph';

export type Callback = (value?: boolean) => void;

export default class ConfirmModalWindow extends ModalWindow {

  private readonly paragraph: ParagraphUiNode = new ParagraphUiNode()
    .uiNodeAppendTo(this.content);

  private callback: Callback | undefined = undefined;

  constructor() {
    super();
    this.controls
      .uiNodeAppendAll([
        new ModalWindowControl('Yes', () => {
          this.hide();
          if (this.callback !== undefined) {
            this.callback(true);
          }
        }, Key.Enter),
        new ModalWindowControl('No', () => {
          this.hide();
          if (this.callback !== undefined) {
            this.callback(false);
          }
        }, Key.Escape)
      ]);
  }

  protected onHidden() {
    if (this.callback !== undefined) {
      this.callback();
    }
  }

  public open(title: string, message: string, callback: Callback): void {
    this.title = title;
    this.paragraph.text = message;
    this.callback = callback;
    this.show();
  }
}
