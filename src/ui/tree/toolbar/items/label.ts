import TreeNodeToolbarItemUi from '../item';

export default class TreeNodeToolbarLabelUi extends TreeNodeToolbarItemUi<HTMLSpanElement> {

  public get text(): string {
    return this.itemElement.textContent || '';
  }

  public set text(value: string) {
    this.itemElement.textContent = value;
  }

  constructor(text: string) {
    super('span');
    this.text = text;
  }
}
