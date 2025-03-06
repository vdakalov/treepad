export type MenuItemHandler = (event: Event) => void;

export type MenuItem = {
  text: string; // '-' - separator
  handler?: MenuItemHandler;
};

export type UserInputFlowControl = {
  continue: boolean;
};

export type UserInputHandler = (targetElement: HTMLElement, fc: UserInputFlowControl) => MenuItem[];

export interface IUi {
  show(event: MouseEvent, items: MenuItem[]): void;
}

type RegistryTag = {
  elements: HTMLElement[];
  // todo create entry with extra options, instead of `targets` prop
  handlers: UserInputHandler[];
};

type Registry = {
  [tagName: string]: RegistryTag;
};

export default class ContextMenu {

  public ui: IUi;

  private readonly registry: Registry = {};

  constructor(ui: IUi) {
    this.ui = ui;
    window.addEventListener('contextmenu', this.onContextMenu.bind(this));
  }

  private onContextMenu(event: MouseEvent): void {
    if (event.target instanceof HTMLElement) {
      const items: MenuItem[] = [];
      let element: HTMLElement | null = event.target;
      while (element !== null) {
        if (this.registry.hasOwnProperty(element.tagName)) {
          const { elements, handlers } = this.registry[element.tagName];
          const index = elements.indexOf(element);
          if (index !== -1) {
            const fc = { continue: false }; // flow control
            const handler = handlers[index];
            items.push(...handler(element, fc));
            if (!fc.continue) {
              break;
            }
          }
        }
        element = element.parentElement;
      }
      if (items.length !== 0) {
        event.preventDefault();
        this.ui.show(event, items);
      }
    }
  }

  public register(handler: UserInputHandler, elements: HTMLElement[]): void {
    for (const element of elements) {
      const { elements, handlers } = this.registry.hasOwnProperty(element.tagName)
        ? this.registry[element.tagName]
        : this.registry[element.tagName] = { elements: [], handlers: [] };
      elements.push(element);
      handlers.push(handler);
    }
  }

  public unregister(elements: HTMLElement[]): void {
    for (const element of elements) {
      if (this.registry.hasOwnProperty(element.tagName)) {
        const { elements, handlers } = this.registry[element.tagName];
        const index = elements.indexOf(element);
        if (index !== -1) {
          elements.splice(index, 1);
          handlers.splice(index, 1);
        }
      }
    }
  }
}
