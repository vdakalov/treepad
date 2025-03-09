import ContextMenu from '../context-menu';
import ContextMenuUi from '../../ui/context-menu';
import TreeUi from '../../ui/tree';
import AlertModalWindow from '../modal-windows/alert';
import ConfirmModalWindow from '../modal-windows/confirm';
import PromptModalWindow from '../modal-windows/prompt';
import Schemes, { Data as SchemesData } from './schemes';
import SelectModalWindow from '../modal-windows/select';

export type Data = {
  version: number;
  schemes: SchemesData;
  models: unknown[];
};

export default class Context {

  public readonly contextMenuUi = new ContextMenuUi();
  public readonly contextMenu = new ContextMenu(this.contextMenuUi);

  public alert: AlertModalWindow = new AlertModalWindow();
  public confirm: ConfirmModalWindow = new ConfirmModalWindow();
  public prompt: PromptModalWindow = new PromptModalWindow();
  public select: SelectModalWindow = new SelectModalWindow();

  public data: Data;

  /**
   * Main application root nodes list
   */
  public nodes: TreeUi = new TreeUi();

  public schemes: Schemes;

  constructor(data: Data) {
    this.data = data;

    this.schemes = new Schemes(this.data.schemes, this);
  }
}
