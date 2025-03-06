import Ui from '../../../libs/ui';
import ModalWindowHeaderTitle from './title';

export default class ModalWindowHeader extends Ui<HTMLDivElement> {

  public readonly title: ModalWindowHeaderTitle = new ModalWindowHeaderTitle()
    .uiNodeAppendTo(this);

  constructor() {
    super('div');
  }
}
