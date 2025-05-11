import ModelsModel , { Data as ModelData } from '../../models/models';
import ModelsTreeNodeUi from '../../ui/tree-nodes/models';
import Context from '.';

export type Data = ModelData;

export default class Models {

  public readonly model: ModelsModel;

  public readonly ui: ModelsTreeNodeUi;

  constructor(context: Context) {
    this.model = new ModelsModel(context.data.models);
    this.ui = new ModelsTreeNodeUi(this.model, context)
      .uiNodeAppendTo(context.nodes);
  }
}
