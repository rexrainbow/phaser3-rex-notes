// import * as Phaser from 'phaser';

/**
 * Resolve a promise when an event is emitted.
 *
 * @param eventEmitter - Event emitter instance.
 * @param eventName - Event name to wait for.
 * @returns Promise resolved when the event fires.
 */
export function WaitEvent(
    eventEmitter: Phaser.Events.EventEmitter,
    eventName: string
): Promise<any>;

/**
 * Resolve a promise when a complete event is emitted.
 *
 * @param eventEmitter - Event emitter instance.
 * @returns Promise resolved when complete fires.
 */
export function WaitComplete(
    eventEmitter: Phaser.Events.EventEmitter
): Promise<any>;
