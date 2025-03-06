import TextUiNode from '../text';

export default class ParagraphUiNode extends TextUiNode<HTMLParagraphElement> {
  constructor(text?: string) {
    super('p', text);
  }
}
