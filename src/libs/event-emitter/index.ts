
export type EventArgsMap<K extends string | symbol | number = string | symbol | number> = Record<K, unknown[]>;

export type Handler<A extends unknown[] = []> = (...args: A) => void;

export type Listener<A extends unknown[] = []> = {
  ttl: number;
  handler: Handler<A>;
};

export type EventHandlersMap<M extends EventArgsMap> = {
  [K in keyof M]?: Listener<M[K]>[];
};

export default class EventEmitter<M extends EventArgsMap = EventArgsMap> {

  private readonly eventEmitterEventHandlersMap: EventHandlersMap<M> = {};

  private readonly eventEmitterPipes: EventEmitter[] = [];

  private eventEmitterDefineEventListener<K extends keyof M>(event: K): Listener<M[K]>[] {
    return this.eventEmitterEventHandlersMap[event] || (this.eventEmitterEventHandlersMap[event] = []);
  }

  private eventEmitterFire<A extends unknown[]>(listeners: Listener<A>[], args: A): void {
    for (const { handler } of listeners) {
      handler(...args);
    }
  }

  public emit<K extends keyof M>(event: K, ...args: M[K]): this {
    const listeners = this.eventEmitterDefineEventListener(event);
    for (let index = 0; index < listeners.length; index++) {
      const listener = listeners[index];
      if (listener.ttl > 0) {
        listener.ttl--;
        if (listener.ttl === 0) {
          listeners.splice(index--, 1);
        }
      }
    }
    if (listeners.length !== 0) {
      // console.debug(EventEmitter.name, this.constructor.name, `emit ${String(event)}`, ...args);
      setTimeout(this.eventEmitterFire.bind(this, listeners as Listener<unknown[]>[], args), 0);
    }
    for (const pipe of this.eventEmitterPipes) {
      pipe.emit(event, ...args);
    }
    return this;
  }

  public on<K extends keyof M>(event: K, handler: Listener<M[K]>['handler'], ttl: number = -1): this {
    this.eventEmitterDefineEventListener(event)
      .push({ ttl, handler });
    return this;
  }

  public off<K extends keyof M>(event: K, handler?: Handler<M[K]>): this {
    const listener = this.eventEmitterDefineEventListener(event);
    if (handler !== undefined) {
      let index = 0;
      while ((index = listener.findIndex((listener => listener.handler === handler), index)) !== -1) {
        listener.splice(index, 1);
      }
    } else {
      listener.length = 0;
    }
    return this;
  }

  /**
   * Pass all this object events to specified in args EventEmitters
   * @param ee
   */
  public pipe(...ee: EventEmitter[]): this {
    for (const e of ee) {
      if (this.eventEmitterPipes.indexOf(e) !== -1) {
        throw new Error(`${this.constructor.name}: Unable to pipe event emitters: already piped`);
      }
      this.eventEmitterPipes.push(e);
    }
    return this;
  }

  /**
   * Stop passing all this objects events in objects specified in args
   * @param ee
   */
  public unpipe(...ee: EventEmitter[]): this {
    for (const e of ee) {
      let index = 0;
      while ((index = this.eventEmitterPipes.indexOf(e, index)) !== -1) {
        this.eventEmitterPipes.splice(index, 1);
      }
    }
    return this;
  }

  // public createPipedEventEmitter<P extends EventArgsMap>(): EventEmitter<P> {
  //   return new EventEmitter<P>()
  //     .pipe(this);
  // }
}
