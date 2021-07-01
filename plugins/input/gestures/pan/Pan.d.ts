import * as Phaser from 'phaser';

export interface IConfig {
    threshold?: number,

    enable?: boolean,

    eventEmitter?: boolean | Phaser.Events.EventEmitter
}

export default class Pan extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    )

    enable: boolean;
    setEnable(enable?: boolean): this;
    toggleEnable(): this;

    setDragThreshold(distance: number): this;
    dragThreshold: number;

    readonly isPanning: boolean;
}