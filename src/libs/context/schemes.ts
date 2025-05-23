import SchemesModel, { Data as SchemesData } from '../../models/schemes';
import SchemesTreeNodeUi from '../../ui/tree-nodes/schemes';
import Context from '.';

export type Data = SchemesData;

export default class Schemes {

  public readonly model: SchemesModel;

  public readonly ui: SchemesTreeNodeUi;

  constructor(context: Context) {
    this.model = new SchemesModel(context.data.schemes);
    this.ui = new SchemesTreeNodeUi(this.model, context)
      .uiNodeAppendTo(context.nodes);
  }
}
