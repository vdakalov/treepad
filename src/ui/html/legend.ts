import TextUiNode from '../text';

export default class LegendUiNode extends TextUiNode<HTMLLegendElement> {
  constructor(initial?: string) {
    super('legend', initial);
  }
}
