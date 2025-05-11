import Model, { InformationData } from '../../libs/model';

export enum Event {
  Changed = 'Changed'
}

export type EventArgsMap<T> = {
  [Event.Changed]: [newValue: T | undefined, previousValue: T | undefined];
};

export type Data<T> = InformationData & {
  /**
   * Default value
   */
  dv?: T;
  /**
   * Current value
   */
  cv?: T;
};

export default abstract class SchemaField<T, D extends Data<T>> extends Model<D, EventArgsMap<T>> {

  public previousValue: T | undefined = undefined;

  public abstract isValid(value: unknown): boolean;

  public getValue(): T | undefined {
    return this.data.cv;
  }

  public setValue(value: unknown): boolean {
    if (value === undefined || this.isValid(value)) {
      this.previousValue = this.data.cv;
      this.data.cv = value as T;
      return true;
    }
    return false;
  }

  /**
   * Set value to undefined
   */
  public unsetValue(): void {
    this.setValue(undefined);
    return undefined;
  }

  /**
   * Reset current value to the value by default
   */
  public resetValue(): T | undefined {
    this.setValue(this.data.dv);
    return this.getValue();
  }

  /**
   * Restore previous value
   */
  public restoreValue(): T | undefined {
    this.setValue(this.previousValue);
    return this.getValue();
  }
}
