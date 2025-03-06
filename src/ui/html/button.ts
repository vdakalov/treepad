import TextUiNode from '../text';

type EventHandler<K extends keyof HTMLElementEventMap> = (event: HTMLElementEventMap[K]) => void;
type Events<K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap> = Record<K, EventHandler<K>>;

export default class ButtonUiNode extends TextUiNode<HTMLButtonElement> {
  constructor(text: string, handler?: EventHandler<'click'>) {
    super('button', text);
    if (handler !== undefined) {
      this.uiNodeElement.addEventListener('click', handler);
    }
  }
}
