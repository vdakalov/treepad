import ModalWindow from '../../ui/modal-window';
import ModalWindowControl, { Key } from '../../ui/modal-window/controls/control';
import ParagraphUiNode from '../../ui/html/paragraph';
import SelectUi, { Option } from '../../ui/html/select';

export { Option } from '../../ui/html/select';

export enum Event {
  Selected = 'Selected',
  Cancel = 'Cancel',
}

export type EventArgsMap = {
  [Event.Selected]: [value: string];
  [Event.Cancel]: [];
};

export default class SelectModalWindow extends ModalWindow<EventArgsMap> {

  private paragraph: ParagraphUiNode = new ParagraphUiNode()
    .uiNodeAppendTo(this.content);

  private select: SelectUi = new SelectUi(0, [])
    .uiNodeAppendTo(this.content);

  private callback: ((value?: string) => void) | undefined = undefined;

  constructor() {
    super();

    this.controls
      .uiNodeAppend(new ModalWindowControl('Ok', this.onOk.bind(this), Key.Enter));
    this.controls
      .uiNodeAppend(new ModalWindowControl('Cancel', this.onCancel.bind(this), Key.Escape));
  }

  private onOk(): void {
    this.hide();
    if (this.callback !== undefined) {
      this.callback(this.select.value);
    }
  }

  private onCancel(): void {
    this.hide();
    if (this.callback !== undefined) {
      this.callback();
    }
  }

  public open(
    title: string,
    message: string,
    _default: string | number,
    options: Option[],
    callback: (value?: string) => void
  ): void {
    this.header.title.text = title;
    this.paragraph.text = message;
    this.select.setOptions(_default, options);
    this.callback = callback;
    this.show();
  }

}
