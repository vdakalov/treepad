import TreeNodeToolbarItemUi from '../item';

export enum Event {
  Activate = 'Activate',
}

export type EventArgsMap = {
  [Event.Activate]: [event: MouseEvent];
};

export default class TreeNodeToolbarCollapseButtonUi extends TreeNodeToolbarItemUi<HTMLButtonElement, EventArgsMap> {

  constructor() {
    super('button');
    this.itemElement.addEventListener('click', event => {
      this.emit(Event.Activate, event);
    });
  }
}
