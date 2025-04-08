import EventEmitter, { EventArgsMap } from '../event-emitter';

const excludedAscendantsPrototypes: Function[] = [
  Object,
  EventEmitter
];

/**
 * @see
 */
export default class Ui<T extends HTMLElement, E extends EventArgsMap = EventArgsMap> extends EventEmitter<E> {

  public static mount(target: Node, ui: Ui<any>): void {
    ui.uiNodeRemove();
    target.appendChild(ui.uiNodeElement);
  }

  public readonly uiNodeId: string = Math.random().toString(36);

  public readonly uiNodeElement: T;

  public get uiNodeChildren(): Readonly<Ui<HTMLElement, any>[]> {
    return this._uiNodeChildren;
  }

  public get uiNodeParent(): Ui<HTMLElement, any> | undefined {
    return this._uiNodeParent;
  }

  private readonly _uiNodeChildren: Ui<HTMLElement, any>[] = [];

  private _uiNodeParent: Ui<HTMLElement, any> | undefined = undefined;

  constructor(tagName: keyof HTMLElementTagNameMap) {
    super();
    this.uiNodeElement = window.document.createElement(tagName) as T;
    this.uiNodeElement.className = this
      .uiNodeGetAscendantsPrototypes()
      .map(object => object.constructor.name)
      .reverse().join(' ');
  }

  protected uiNodeGetAscendantsPrototypes(): Object[] {
    const objects: Object[] = [];
    let proto: Object = this;
    while ((proto = Object.getPrototypeOf(proto)) !== null && proto.constructor !== Object) {
      if (excludedAscendantsPrototypes.indexOf(proto.constructor) === -1) {
        objects.push(proto);
      }
    }
    return objects;
  }

  protected uiNodeCreateChildren<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] {
    return this.uiNodeElement.appendChild(window.document.createElement(tagName));
  }

  public uiNodeInit(initializer: (element: T) => void): this {
    initializer(this.uiNodeElement);
    return this;
  }

  public uiNodeClass(tokens: string[], reset: boolean = false): this {
    if (reset) {
      this.uiNodeElement.classList.remove(...this.uiNodeElement.classList.values());
    }
    this.uiNodeElement.classList.add(...tokens);
    return this;
  }

  public uiNodeAppend<T extends Ui<HTMLElement, any>>(node: T, before?: Ui<HTMLElement, any> | number): T {
    if (typeof before === 'number' && this.uiNodeElement.children.length > before) {
      this.uiNodeElement.insertBefore(node.uiNodeElement, this.uiNodeElement.children.item(before));
      this._uiNodeChildren.splice(before, 0, node);
    } else if (before instanceof Ui && before.uiNodeElement.parentElement === this.uiNodeElement) {
      this.uiNodeElement.insertBefore(node.uiNodeElement, before.uiNodeElement);
      const index = this._uiNodeChildren.indexOf(before);
      if (index !== -1) {
        this._uiNodeChildren.splice(index, 0, node);
      }
    } else {
      this.uiNodeElement.appendChild(node.uiNodeElement);
      this._uiNodeChildren.push(node);
    }
    node._uiNodeParent = this;
    return node;
  }

  public uiNodeAppendAll<T extends Ui<HTMLElement, any>>(nodes: T[], before?: Ui<HTMLElement, any> | number): T[] {
    for (const node of nodes) {
      this.uiNodeAppend(node, before);
      if (typeof before === 'number') {
        before++;
      }
    }
    return nodes;
  }

  public uiNodeAppendTo(parent: Ui<HTMLElement, any>, before?: Ui<HTMLElement, any> | number): this {
    parent.uiNodeAppend(this, before);
    return this;
  }

  public uiNodeRemove(child?: Ui<HTMLElement, any>): void {
    if (child === undefined) {
      if (this.uiNodeParent !== undefined && this.uiNodeElement.parentElement !== null) {
        const index = this.uiNodeParent.uiNodeChildren.indexOf(this);
        if (index !== -1) {
          this.uiNodeParent._uiNodeChildren.splice(index, 1);
          this._uiNodeParent = undefined;
          this.uiNodeElement.parentElement
            .removeChild(this.uiNodeElement);
        }
      }
      return;
    }
    child.uiNodeRemove();
  }

  public uiNodeRemoveAll(): void {
    this.uiNodeElement.textContent = '';
  }
}
