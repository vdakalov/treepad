import Model, { InformationData } from '../model';

export type EventArgsMap = {};

export type Data<T, N extends string> = InformationData<N> & {
  value: T;
};

export default class DictionaryItem<T, N extends string = string> extends Model<Data<T, N>, EventArgsMap> {

  public get name(): N {
    return this.data.name;
  }

  public get description(): string | undefined {
    return this.data.description;
  }

  public get value(): T {
    return this.data.value;
  }

  protected onModelDataDefined(): void {
  }
}
