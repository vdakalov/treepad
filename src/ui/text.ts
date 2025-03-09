import Ui from '../libs/ui';
import { EventArgsMap } from '../libs/event-emitter';

export default class TextUiNode<T extends HTMLElement, E extends EventArgsMap = EventArgsMap> extends Ui<T, E> {

  public get text(): string {
    return this.uiNodeElement.textContent || '';
  }

  public set text(value: string) {
    this.uiNodeElement.textContent = value;
  }

  constructor(tagName: keyof HTMLElementTagNameMap, initial?: string) {
    super(tagName);
    if (initial !== undefined) {
      this.text = initial;
    }
  }
}
