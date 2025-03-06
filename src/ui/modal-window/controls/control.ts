import Ui from '../../../libs/ui';
import ButtonUiNode from '../../html/button';

export type Handler = (event: HTMLElementEventMap['click']) => void;

export enum Key {
  Enter = 'Enter',
  Escape = 'Escape'
}

export default class ModalWindowControl extends Ui<HTMLLIElement> {

  public readonly defaultOnKey?: Key;

  public readonly button: ButtonUiNode;

  constructor(text: string, handler?: Handler, defaultOnKey?: Key) {
    super('li');
    this.defaultOnKey = defaultOnKey;
    this.button = new ButtonUiNode(text, handler)
      .uiNodeAppendTo(this);
  }
}
