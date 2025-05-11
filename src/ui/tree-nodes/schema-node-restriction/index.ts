import SchemaNodeModel from '../../../models/schema-node';
import TreeNodeUi from '../../tree/node';
import Context from '../../../libs/context';
import { MenuItem } from '../../../libs/context-menu';
import SchemaNodeRestrictions from '../../../models/schema-node/restrictions';
import RestrictionSchemaNodeTreeNodeUi from './node';

export enum Event {
  NodeAdded = 'NodeAdded'
}

type EventArgsMap = {
  [Event.NodeAdded]: [node: SchemaNodeModel]
};

export default class RestrictionsSchemaNodeTreeNodeUi extends TreeNodeUi<EventArgsMap> {

  public get label(): string {
    return this.toolbar.label.text;
  }

  public set label(value: string) {
    this.toolbar.label.text = value;
  }

  private readonly context: Context;

  private readonly restrictions: SchemaNodeRestrictions;

  private readonly model: SchemaNodeModel;

  constructor(context: Context, restrictions: SchemaNodeRestrictions, model: SchemaNodeModel, label: string) {
    super();
    this.context = context;
    this.restrictions = restrictions;
    this.model = model;
    this.label = label;

    this.context.contextMenu
      .register(this.onLabelContextMenu.bind(this), [this.toolbar.label.uiNodeElement]);

    for (const nid of restrictions.items) {
      const node = model.schema.getNodeById(nid);
      if (!node) {
        throw new Error(`No node found by id: ${nid}`);
      }
      this.children
        .uiNodeAppend(new RestrictionSchemaNodeTreeNodeUi(node));
    }
  }

  private onLabelContextMenu(): MenuItem[] {
    return [{
      text: 'Add node',
      handler: this.onAddNodeToRestrictions.bind(this),
    }, {
      text: `Method: ${this.restrictions.methodName}`,
      handler: this.onSwitchRestrictionMethod.bind(this),
    }];
  }

  private onAddNodeToRestrictions(): void {
    this.context.ui
      .chooseSchemaNode(this.model.schema, [this.model])
      .then(node => {
        if (node !== undefined) {
          this.restrictions.addSchemaNode(node);
          this.children
            .uiNodeAppend(new RestrictionSchemaNodeTreeNodeUi(node));
          this.emit(Event.NodeAdded, node);
        }
      });
  }

  private onSwitchRestrictionMethod(): void {
    this.restrictions.toggleMethod();
  }
}
