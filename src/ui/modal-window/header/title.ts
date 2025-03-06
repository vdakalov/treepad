import Ui from '../../../libs/ui';

export default class ModalWindowHeaderTitle extends Ui<HTMLHeadingElement> {

  public get text(): string {
    return this.uiNodeElement.textContent || '';
  }

  public set text(value: string) {
    this.uiNodeElement.textContent = value;
  }

  constructor() {
    super('h2');
  }
}
