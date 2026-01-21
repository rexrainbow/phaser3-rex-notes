interface EventEmitterMixin {
    /**
     * Configure the internal event emitter or disable it.
     */
    setEventEmitter(
        eventEmitter?: Phaser.Events.EventEmitter | boolean,
        EventEmitterClass?: typeof Phaser.Events.EventEmitter
    ): this;
    /**
     * Destroy the internal emitter if it is privately owned.
     */
    destroyEventEmitter(): this;
    /**
     * Get the underlying event emitter instance, if any.
     */
    getEventEmitter(): Phaser.Events.EventEmitter | undefined;
    /**
     * Add a listener for an event.
     */
    on(...args: any[]): this;
    /**
     * Add a one-time listener for an event.
     */
    once(...args: any[]): this;
    /**
     * Remove a listener for an event.
     */
    off(...args: any[]): this;
    /**
     * Emit an event with arguments.
     */
    emit(event: string | symbol, ...args: any[]): this;
    /**
     * Alias of on(...).
     */
    addListener(...args: any[]): this;
    /**
     * Alias of off(...).
     */
    removeListener(...args: any[]): this;
    /**
     * Remove all listeners for an event or all events.
     */
    removeAllListeners(...args: any[]): this;
    /**
     * Return the number of listeners for an event.
     */
    listenerCount(...args: any[]): number;
    /**
     * Return the listeners for an event.
     */
    listeners(...args: any[]): Function[];
    /**
     * Return all event names with listeners.
     */
    eventNames(): Array<string | symbol>;
}

export default EventEmitterMixin;
