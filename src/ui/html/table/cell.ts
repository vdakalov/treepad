import Ui from '../../../libs/ui';

export default class TableCellUiNode extends Ui<HTMLTableCellElement> {

  public static createHeaderCell(): TableCellUiNode {
    return new this('th');
  }

  public static createDataCell(): TableCellUiNode {
    return new this('td');
  }

  protected constructor(tagName: 'td' | 'th') {
    super(tagName);
  }
}
