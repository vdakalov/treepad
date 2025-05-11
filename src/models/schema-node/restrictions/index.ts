import Restrictions from '../../../libs/restrictions';
import SchemaNodeModel from '../index';

export default class SchemaNodeRestrictions extends Restrictions<string> {

  public hasSchemaNode(node: SchemaNodeModel): boolean {
    return this.has(node.id);
  }

  public allowedSchemaNode(node: SchemaNodeModel): boolean {
    return this.allowed(node.id);
  }

  public deniedSchemaNode(node: SchemaNodeModel): boolean {
    return this.denied(node.id);
  }

  public addSchemaNode(node: SchemaNodeModel): boolean {
    return this.add(node.id);
  }

  public removeSchemaNode(node: SchemaNodeModel): boolean {
    return this.remove(node.id);
  }
}
