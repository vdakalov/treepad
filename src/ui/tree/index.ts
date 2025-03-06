import Ui from '../../libs/ui';

export default class TreeUi extends Ui<HTMLUListElement> {
  constructor() {
    super('ul');
  }

  public mount(node: Node): void {
    node.appendChild(this.uiNodeElement);
  }
}
