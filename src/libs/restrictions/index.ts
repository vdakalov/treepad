import Model from '../model';
import Method from './method';

export enum Event {
  RuleChanged = 'RuleChanged',
  ItemInserted = 'ItemInserted',
  ItemRemoved = 'ItemRemoved',
}

export type EventArgsMap<T> = {
  [Event.RuleChanged]: [newRule: Method, previousRule: Method];
  [Event.ItemInserted]: [item: T, index: number];
  [Event.ItemRemoved]: [item: T, index: number];
};

export type Data<T> = {
  method: Method;
  items: T[];
};

export default class Restrictions<T> extends Model<Data<T>, EventArgsMap<T>> {

  public static allow<T>(items: T[] = []): Restrictions<T> {
    return new this({ method: Method.Allow, items });
  }

  public static deny<T>(items: T[] = []): Restrictions<T> {
    return new this({ method: Method.Deny, items });
  }

  public get method(): Method {
    return this.data.method;
  }

  public set method(value: Method) {
    if (this.data.method !== value) {
      const previous = this.data.method;
      this.data.method = value;
      this.emit(Event.RuleChanged, value, previous);
    }
  }

  public get items(): Readonly<T[]> {
    return this.data.items;
  }

  public has(item: T): boolean {
    return this.data.items.indexOf(item) !== -1;
  }

  public allowed(item: T): boolean {
    const has = this.has(item);
    return (this.method === Method.Allow && has) ||
      (this.method === Method.Deny && !has);
  }

  public denied(item: T): boolean {
    return !this.allowed(item);
  }

  public add(item: T): boolean {
    if (this.data.items.indexOf(item) === -1) {
      this.data.items.push(item);
      this.emit(Event.ItemInserted, item, this.data.items.length - 1);
      return true;
    }
    return false;
  }

  public remove(item: T): boolean {
    const index = this.data.items.indexOf(item);
    if (index !== -1) {
      this.data.items.splice(index, 1);
      this.emit(Event.ItemRemoved, item, index);
      return true;
    }
    return false;
  }
}
