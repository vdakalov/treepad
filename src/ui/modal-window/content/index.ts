import Ui from '../../../libs/ui';

export default class ModalWindowContent extends Ui<HTMLDivElement> {

  constructor() {
    super('div');
  }

  public append<T extends Ui<HTMLElement>>(node: T, before?: Ui<HTMLElement> | number): T {
    return this.uiNodeAppend(node, before);
  }

  public removeAll(): void {
    this.uiNodeRemoveAll();
  }
}
