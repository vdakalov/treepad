import PlainSchemaField from '../plain';

export default class StringSchemaField extends PlainSchemaField<string> {
  public isValid(value: unknown): boolean {
    return typeof value === 'string';
  }
}
