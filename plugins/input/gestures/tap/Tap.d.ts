import * as Phaser from 'phaser';

export interface IConfig {
    time?: number,
    tapInterval?: number,
    threshold?: number,
    tapOffset?: number,

    taps?: number | undefined,
    minTaps?: number | undefined,
    maxTaps?: number | undefined,

    enable?: boolean,

    eventEmitter?: boolean | Phaser.Events.EventEmitter
}

export default class Tap extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: IConfig
    )

    enable: boolean;
    setEnable(enable?: boolean): this;
    toggleEnable(): this;

    setHoldTime(time: number): this;
    holdTime: number;
    setTapInterval(time: number): this;
    tapInterval: number;

    setDragThreshold(distance: number): this;
    dragThreshold: number;
    setTapOffset(distance: number): this;
    tapOffset: number;

    setMaxTaps(amount: number): this;
    maxTaps: number;
    setMaxTaps(amount: number): this;
    minTaps: number;
    setTaps(minTaps: number, maxTaps: number): this;

    readonly isTapped: boolean;
}