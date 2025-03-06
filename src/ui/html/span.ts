import TextUiNode from '../text';

export default class SpanUiNode extends TextUiNode<HTMLSpanElement> {
  constructor(initial?: string) {
    super('span', initial);
  }
}
