import Ui from '../../libs/ui';

export type EventHandler<
  T extends InputUiNode,
  K extends keyof HTMLElementEventMap
> = (event: HTMLElementEventMap[K], input: T) => void;

export type EventHandlerMap<T extends InputUiNode = InputUiNode> = {
  [K in keyof HTMLElementEventMap]?: EventHandler<T, K>;
}

export default class InputUiNode extends Ui<HTMLInputElement> {
  constructor(type: string, events: EventHandlerMap = {}) {
    super('input');
    this.uiNodeElement.type = type;
    this.setEvents(events);
  }

  public setEvents(events: EventHandlerMap): this {
    for (const [event, handler] of Object.entries(events)) {
      this.uiNodeElement.addEventListener(event, event => handler(event as any, this));
    }
    return this;
  }
}
