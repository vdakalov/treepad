import EventEmitter from '../../../../libs/event-emitter';
import TreeNodeToolbarItemUi from '../item';

export enum Event {
  Activate = 'Activate',
}

export type EventArgsMap = {
  [Event.Activate]: [event: MouseEvent];
};

export default class TreeNodeToolbarCollapseButtonUi extends TreeNodeToolbarItemUi<HTMLButtonElement> {

  public ee: EventEmitter<EventArgsMap> = new EventEmitter();

  constructor() {
    super('button');
    this.itemElement.addEventListener('click', event =>
      this.ee.emit(Event.Activate, event));
  }

  public setActivationHandler(handler: (...args: EventArgsMap[Event.Activate]) => void): this {
    this.ee.on(Event.Activate, handler);
    return this;
  }
}
