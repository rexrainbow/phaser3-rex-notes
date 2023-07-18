import EventEmitter from '../eventemitter/EventEmitter';

export default WaitEvent;

declare namespace WaitEvent {

}

declare class WaitEvent extends EventEmitter {
    constructor(
        parent?: Object,
    );

    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string,
        completeNextTick?: boolean
    ): Object;

    addWaitCompleteCallback(callback: Function, scope?: Object): this;
    clearWaitCompleteCallbacks(): this;

}