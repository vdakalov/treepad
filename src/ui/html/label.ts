import Ui from '../../libs/ui';

export default class LabelUiNode extends Ui<HTMLLabelElement> {
  constructor(_for?: string) {
    super('label');
    if (_for !== undefined) {
      this.uiNodeElement.htmlFor = _for;
    }
  }
}
