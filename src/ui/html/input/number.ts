import InputUiNode, { EventHandlerMap } from '../input';

export default class NumberInputUiNode extends InputUiNode {

  public get value(): number {
    return this.uiNodeElement.valueAsNumber;
  }

  public set value(value: number) {
    this.uiNodeElement.valueAsNumber = value;
  }

  constructor(initial?: number, events?: EventHandlerMap) {
    super('number', events);
    if (initial !== undefined) {
      this.value = initial;
    }
  }
}
