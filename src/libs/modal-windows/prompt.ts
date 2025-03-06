import ModalWindow from '../../ui/modal-window';
import ModalWindowControl, { Key } from '../../ui/modal-window/controls/control';
import ParagraphUiNode from '../../ui/html/paragraph';
import TextInputUiNode from '../../ui/html/input/text';

export type Callback = (text?: string) => void;

export default class PromptModalWindow extends ModalWindow {

  private readonly paragraphUiNode: ParagraphUiNode = new ParagraphUiNode()
    .uiNodeAppendTo(this.content);

  private readonly inputUiNode: TextInputUiNode = new TextInputUiNode()
    .uiNodeAppendTo(this.content);

  private callback: Callback | undefined = undefined;

  constructor() {
    super();
    this.controls
      .uiNodeAppendAll([
        new ModalWindowControl('Ok', () => {
          this.hide();
          if (this.callback !== undefined) {
            this.callback(this.inputUiNode.value.trim());
          }
        }, Key.Enter),
        new ModalWindowControl('Cancel', () => {
          this.hide();
          if (this.callback !== undefined) {
            this.callback();
          }
        }, Key.Escape)
      ]);
  }

  protected onShowed() {
    this.inputUiNode.uiNodeElement.focus();
    this.inputUiNode.uiNodeElement.select();
  }

  public open(title: string, message: string, _default: string, callback: Callback): void {
    this.title = title;
    this.paragraphUiNode.text = message;
    this.inputUiNode.value = _default;
    this.callback = callback;
    this.show();
  }
}
