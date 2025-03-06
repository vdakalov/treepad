import Ui from './libs/ui';
import { MenuItem } from './libs/context-menu';
import Context, { Data as ContextData } from './libs/context';

export default class Application extends Ui<HTMLDivElement> {

  private readonly lsKey: string = 'tree-pad.application.data';

  private readonly context: Context = new Context(this.defineData());

  constructor() {
    super('div');

    this.uiNodeAppend(this.context.nodes);

    this.context.contextMenu.register(this.createGlobalContextMenuItems.bind(this), [
      this.uiNodeElement
    ]);
  }

  private defineData(): ContextData {
    const json = window.localStorage.getItem(this.lsKey);
    if (json != null) {
      return JSON.parse(json);
    }
    return {
      version: 0,
      schemes: [],
      models: []
    };
  }

  private dumpData(): void {
    const json = JSON.stringify(this.context.data);
    window.localStorage.setItem(this.lsKey, json);
  }

  private createGlobalContextMenuItems(): MenuItem[] {
    return [];
  }
}
