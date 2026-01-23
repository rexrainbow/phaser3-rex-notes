export default class EventEmitter {
    /**
     * Stop emitting events and clear internal state.
     */
    shutdown(): void;
    /**
     * Destroy this emitter.
     */
    destroy(): void;

    /**
     * Get a list of event names with registered listeners.
     */
    eventNames(): (string | symbol)[];
    /**
     * Get listeners for an event.
     * @param event - Event name.
     */
    listeners(event: string | symbol): Function[];
    /**
     * Get listener count for an event.
     * @param event - Event name.
     */
    listenerCount(event: string | symbol): number;
    /**
     * Emit an event.
     * @param event - Event name.
     * @param args - Event arguments.
     * @returns True if any listeners were called.
     */
    emit(event: string | symbol, ...args: any[]): boolean;
    /**
     * Register a listener.
     * @param event - Event name.
     * @param fn - Callback function.
     * @param context - Callback context.
     */
    on(event: string | symbol, fn: Function, context?: any): this;
    /**
     * Register a listener.
     * @param event - Event name.
     * @param fn - Callback function.
     * @param context - Callback context.
     */
    addListener(event: string | symbol, fn: Function, context?: any): this;
    /**
     * Register a one-time listener.
     * @param event - Event name.
     * @param fn - Callback function.
     * @param context - Callback context.
     */
    once(event: string | symbol, fn: Function, context?: any): this;
    /**
     * Remove a listener.
     * @param event - Event name.
     * @param fn - Callback function.
     * @param context - Callback context.
     * @param once - True to remove only once listeners.
     */
    removeListener(event: string | symbol, fn?: Function, context?: any, once?: boolean): this;
    /**
     * Remove a listener.
     * @param event - Event name.
     * @param fn - Callback function.
     * @param context - Callback context.
     * @param once - True to remove only once listeners.
     */
    off(event: string | symbol, fn?: Function, context?: any, once?: boolean): this;
    /**
     * Remove all listeners for an event or all events.
     * @param event - Event name.
     */
    removeAllListeners(event?: string | symbol): this;
}
