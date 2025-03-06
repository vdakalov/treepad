import TreeNodeUi from '../tree/node';
import Context from '../../libs/context';
import Model from '../../libs/model';

export default abstract class ModelTreeNodeUi<M extends Model<any, any>> extends TreeNodeUi {

  public readonly model: M;

  public readonly context: Context;

  constructor(model: M, context: Context) {
    super();
    this.model = model;
    this.context = context;
    this.modelTreeNodeUiInit();
  }

  /**
   * Method calls once tree-node's model and context has defined
   * @protected
   */
  protected modelTreeNodeUiInit(): void {}
}
