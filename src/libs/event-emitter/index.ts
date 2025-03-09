
export type EventArgsMap<K extends string | symbol | number = string> = Record<K, unknown[]>;

export type Handler<A extends unknown[]> = (...args: A) => void;

export type Listener<A extends unknown[]> = {
  event: string | symbol | number;
  handler: Handler<A>;
};

export type EventListenersMap<M extends EventArgsMap>
  = { [K in keyof M]?: Listener<M[K]>[] };

export type Listeners<M extends EventArgsMap, K extends keyof M> = Listener<M[K]>[];

export default class EventEmitter<M extends EventArgsMap<string | symbol | number>> {

  private eventEmitterListeners: EventListenersMap<M> = {};

  private eventEmitterDefineEventListeners<K extends keyof M>(event: K): Listener<M[K]>[] {
    return this.eventEmitterListeners[event] || (this.eventEmitterListeners[event] = []);
  }

  private eventEmitterTick<K extends keyof M>(handlers: Handler<M[K]>[], args: M[K]): void {
    for (const handler of handlers) {
      handler(...args);
    }
  }

  public emit<K extends keyof M>(event: K, ...args: M[K]): this {
    const handlers = this.eventEmitterDefineEventListeners(event)
      .map(({ handler }) => handler) as Handler<M[keyof M]>[];
    if (handlers.length !== 0) {
      console.debug(EventEmitter.name, this.constructor.name, `emit ${String(event)}`, ...args);
      setTimeout(this.eventEmitterTick.bind(this, handlers, args), 0);
    }
    return this;
  }

  public on<K extends keyof M>(event: K, handler: Handler<M[K]>): this {
    const listener: Listener<M[K]> = { event, handler };
    this.eventEmitterDefineEventListeners(event)
      .push(listener);
    return this;
  }
}
