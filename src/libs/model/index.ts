import EventEmitter, { EventArgsMap } from '../event-emitter';

export type InformationData<N extends string = string> = {
  name: N;
  description?: string;
};

export default abstract class Model<D, E extends EventArgsMap> extends EventEmitter<E> {

  public data: D;

  constructor(data: D) {
    super();
    this.data = data;
    this.onModelDataDefined();
  }

  /**
   * Method calls once data field has defined
   * @protected
   */
  protected onModelDataDefined(): void {}

  public toString(): string {
    return this.constructor.name;
  }
}
