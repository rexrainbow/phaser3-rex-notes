export default WaitEvents;

declare namespace WaitEvents {
    /**
     * Callback fired when all wait events are completed.
     */
    type CompleteCallbackType = () => void;
}

/**
 * Utility for waiting on multiple events before completion.
 */
declare class WaitEvents {
    /**
     * Create a WaitEvents instance.
     *
     * @param completeCallback - Completion callback.
     * @param scope - Callback scope.
     */
    constructor(
        completeCallback?: WaitEvents.CompleteCallbackType,
        scope?: object
    );

    /**
     * Set completion callback.
     *
     * @param completeCallback - Completion callback.
     * @param scope - Callback scope.
     * @returns This WaitEvents instance.
     */
    setCompleteCallback(
        completeCallback: WaitEvents.CompleteCallbackType,
        scope?: object
    ): this;

    /**
     * Create and register a wait callback.
     *
     * @returns This WaitEvents instance.
     */
    waitCallback(): this;

    /**
     * Wait for an event from an emitter.
     *
     * @param eventEmitter - Event emitter instance.
     * @param eventName - Event name to wait for.
     * @returns This WaitEvents instance.
     */
    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string
    ): this;

    /**
     * Remove a registered completion callback.
     *
     * @param callback - Completion callback to remove.
     * @returns This WaitEvents instance.
     */
    remove(
        callback: WaitEvents.CompleteCallbackType
    ): this;

    /**
     * Clear all waiting callbacks.
     *
     * @returns This WaitEvents instance.
     */
    clear(): this;

    /**
     * True if there are no pending wait events.
     */
    readonly noWaitEvent: boolean;
}
