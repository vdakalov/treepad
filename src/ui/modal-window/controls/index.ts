import Ui from '../../../libs/ui';
import ModalWindowControl from './control';

export default class ModalWindowControls extends Ui<HTMLUListElement> {
  constructor(controls: ModalWindowControl[] = []) {
    super('ul');
    for (const control of controls) {
      this.uiNodeAppend(control);
    }
  }
}
