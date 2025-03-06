import InputUiNode, { EventHandlerMap } from '../input';

export default class TextInputUiNode extends InputUiNode {

  public get value(): string {
    return this.uiNodeElement.value;
  }

  public set value(value: string) {
    this.uiNodeElement.value = value;
  }

  constructor(initial?: string, events?: EventHandlerMap) {
    super('text', events);
    if (initial !== undefined) {
      this.value = initial;
    }
  }
}
