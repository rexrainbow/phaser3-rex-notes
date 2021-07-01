import * as Phaser from 'phaser';

export interface IConfig {
    threshold?: number,
    velocityThreshold?: number,
    dir: 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir',

    enable?: boolean,

    eventEmitter?: boolean | Phaser.Events.EventEmitter
}

export default class Swipe extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: IConfig
    )

    enable: boolean;
    setEnable(enable?: boolean): this;
    toggleEnable(): this;

    setDragThreshold(distance: number): this;
    dragThreshold: number;

    setVelocityThreshold(velocity: number): this;
    velocityThreshold: number;

    setDirectionMode(
        dirMode: 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir'
    ): this;
    dirMode: number;

    readonly isSwiped: boolean;
}