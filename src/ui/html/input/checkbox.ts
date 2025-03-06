import InputUiNode, { EventHandlerMap } from '../input';

export default class CheckboxInputUiNode extends InputUiNode {

  public get value(): boolean {
    return this.uiNodeElement.checked;
  }

  public set value(value: boolean) {
    this.uiNodeElement.checked = value;
  }

  constructor(initial?: boolean, events?: EventHandlerMap) {
    super('checkbox', events);
    if (initial !== undefined) {
      this.value = initial;
    }
  }
}
