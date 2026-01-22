import EventEmitter from '../eventemitter/EventEmitter';

export default WaitEvent;

declare namespace WaitEvent {

}

declare class WaitEvent extends EventEmitter {
    /**
     * Create a wait event helper.
     * @param parent - Optional parent object.
     */
    constructor(
        parent?: Object,
    );

    /**
     * Wait for an event.
     * @param eventEmitter - Event emitter.
     * @param eventName - Event name.
     * @param completeNextTick - True to complete on next tick.
     * @returns Parent object.
     */
    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string,
        completeNextTick?: boolean
    ): Object;

    /**
     * Add a wait complete callback.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    addWaitCompleteCallback(callback: Function, scope?: Object): this;
    /**
     * Clear wait complete callbacks.
     * @returns This instance.
     */
    clearWaitCompleteCallbacks(): this;

}
