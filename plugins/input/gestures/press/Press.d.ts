import * as Phaser from 'phaser';

export interface IConfig {
    time?: number,
    threshold?: number,

    enable?: boolean,

    eventEmitter?: boolean | Phaser.Events.EventEmitter
}

export default class Press extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: IConfig
    )

    enable: boolean;
    setEnable(enable?: boolean): this;
    toggleEnable(): this;

    setHoldTime(time: number): this;
    holdTime: number;
    setDragThreshold(distance: number): this;
    dragThreshold: number;

    readonly isPressed: boolean;
}