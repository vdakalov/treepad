import ModelTreeNodeUi from '../../tree-nodes/model';
import SchemaModel, { Event } from '../../../models/schema';

export default class SchemaTreeNodeUi extends ModelTreeNodeUi<SchemaModel> {

  public modelTreeNodeUiInit() {
    this.toolbar.label.text = this.model.data.name;
    // this.toolbar.label.uiNodeElement.title = this.model.data.description || '';

    this.model.ee.on(Event.NodeAppended, this.uiUpdate.bind(this));
    this.uiUpdate();
  }

  public uiUpdate(): void {
    this.toolbar.label.text = this.model.data.name;
    this.children.uiNodeRemoveAll();
    // for (const node of this.model.nodes) {
    //   const child = // todo finish here
    // }
  }
}
