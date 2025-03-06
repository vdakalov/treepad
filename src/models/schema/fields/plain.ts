import SchemaField, { Data as SchemaFieldData } from '../field';

export type Data<T> = SchemaFieldData<T> & {
  type: string;
};

export default abstract class PlainSchemaField<T> extends SchemaField<T, Data<T>> {
}
