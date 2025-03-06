import Model from '../model';
import DictionaryItem from './item';

export type EventArgsMap = {};

export type Data = {};

export type DictionaryObject<K extends string, T> = Partial<Record<K, T>>;

export default class Dictionary<T, K extends string = string> extends Model<Data, EventArgsMap> {

  public items: DictionaryItem<T, K>[] = [];

  protected onModelDataDefined(): void {
  }

  public hasName(value: K): boolean {
    return this.items.findIndex(item => item.name === value) !== -1;
  }

  public hasValue(value: T): boolean {
    return this.items.findIndex(item => item.value === value) !== -1;
  }

  public get(name: K): DictionaryItem<T, K> | undefined {
    return this.items.find(item => item.name === name);
  }

  public toObject(): DictionaryObject<K, T> {
    const object: DictionaryObject<K, T> = {};
    return this.items.reduce((acc, item) => {
      acc[item.name as K] = item.value;
      return acc;
    }, object);
  }
}
