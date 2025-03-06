import ModalWindow from '../../ui/modal-window';
import ModalWindowControl, { Key } from '../../ui/modal-window/controls/control';
import ParagraphUiNode from '../../ui/html/paragraph';

export type Callback = () => void;

export default class AlertModalWindow extends ModalWindow {

  private readonly paragraph: ParagraphUiNode = new ParagraphUiNode()
    .uiNodeAppendTo(this.content);

  private callback: Callback | undefined = undefined;

  constructor() {
    super();
    this.controls.uiNodeAppend(new ModalWindowControl('Ok', () => {
      this.hide();
      if (this.callback !== undefined) {
        this.callback();
      }
    }, Key.Enter));
  }

  public open(title: string, message: string, callback?: Callback) {
    this.header.title.text = title;
    this.paragraph.text = message;
    this.callback = callback;
    this.show();
  }
}
