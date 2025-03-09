import PlainSchemaField from '../plain';

export default class BooleanSchemaField extends PlainSchemaField<boolean> {
  public isValid(value: unknown): boolean {
    return typeof value === 'boolean';
  }
}
