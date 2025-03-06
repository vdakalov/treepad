import SchemaField, { Data as SchemaFieldData } from '../field';

export type Data = SchemaFieldData<number> & {
  index: number;
};

export default class DictionarySchemaField extends SchemaField<number, Data> {

  public isValid(value: unknown): boolean {
    throw new Error('Not implemented');
  }
}
