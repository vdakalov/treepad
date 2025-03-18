import Model, { InformationData } from '../../libs/model';

export type EventArgsMap = {};

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

export default abstract class SchemaField<T, D extends Data<T>> extends Model<D, EventArgsMap> {

  public previousValue: T | undefined = undefined;

  public abstract isValid(value: unknown): boolean;

  public getCurrentValue(): T | undefined {
    return this.data.cv;
  }

  public setCurrentValue(value: unknown): boolean {
    if (value === undefined || this.isValid(value)) {
      this.previousValue = this.data.cv;
      this.data.cv = value as T;
      return true;
    }
    return false;
  }

  public unsetValue(): void {
    this.setCurrentValue(undefined);
    return undefined;
  }

  public resetValue(): T | undefined {
    this.setCurrentValue(this.data.dv);
    return this.getCurrentValue();
  }

  public restoreValue(): T | undefined {
    this.setCurrentValue(this.previousValue);
    return this.getCurrentValue();
  }
}
