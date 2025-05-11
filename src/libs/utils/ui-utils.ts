import Context from '../context';
import { Option } from '../../ui/html/select';
import SchemaNodeModel from '../../models/schema-node';
import SchemaModel from '../../models/schema';

export default class UiUtils {

  private readonly context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  public chooseSchemaNode(
    schema: SchemaModel,
    exclude: SchemaNodeModel[] = [],
  ): Promise<SchemaNodeModel | undefined> {
    const options: Option[] = [];
    const map: Record<string, SchemaNodeModel> = {};
    for (const node of schema.nodes) {
      if (!exclude.some(({ id }) => id === node.id)) {
        options.push({ value: node.id, text: node.name });
        map[node.id] = node;
      }
    }
    if (options.length === 0) {
      this.context.alert.open('Select schema node', 'No nodes to select');
      return Promise.resolve(undefined);
    }
    return new Promise(resolve => {
      this.context.select.open(
        'Select schema node',
        `Select node from schema "${schema.name}":`,
        0, options, value => {
          if (value !== undefined && map[value] !== undefined) {
            const model = map[value];
            resolve(model);
          } else {
            resolve(undefined);
          }
        });
    });
  }
}
