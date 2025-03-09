import TreeNodeUi from '../tree/node';
import Context from '../../libs/context';
import Model from '../../libs/model';
import { MenuItem } from '../../libs/context-menu';

export default abstract class ModelTreeNodeUi<M extends Model<any, any>> extends TreeNodeUi {

  public readonly model: M;

  public readonly context: Context;

  constructor(model: M, context: Context) {
    super();
    this.model = model;
    this.context = context;
    this.onModelDefined();
  }

  protected enableToolbarLabelContextMenu(): void {
    this.context.contextMenu.register(this.onToolbarLabelContextMenu.bind(this), [
      this.toolbar.label.uiNodeElement
    ]);
  }

  protected disableToolbarLabelContextMenu(): void {
    this.context.contextMenu.unregister([this.toolbar.label.uiNodeElement]);
  }

  /**
   * Method calls once tree-node's model and context has defined
   * @protected
   */
  protected onModelDefined(): void {}

  /**
   * Method calls when user open context menu on this TreeNode
   * @protected
   */
  protected onToolbarLabelContextMenu(): MenuItem[] { return []; }
}
