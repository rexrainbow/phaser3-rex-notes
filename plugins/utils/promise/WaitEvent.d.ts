import * as Phaser from 'phaser';

export type WaitEvent = (
    eventEmitter: Phaser.Events.EventEmitter,
    eventName: string
) => Promise<any>;

export type WaitComplete = (
    eventEmitter: Phaser.Events.EventEmitter,
) => Promise<any>;
