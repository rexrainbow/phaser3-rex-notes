// import * as Phaser from 'phaser';

export interface IConfig {
    mode?: 0 | 1 | 'pointerdown' | 'pointerup' | 'press' | 'release',
    clickInterval?: number,
    enable?: boolean,

    eventEmitter?: boolean | Phaser.Events.EventEmitter
}

export default class Buttons extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    )

    enable: boolean;
    setEnable(enable?: boolean): this;
    toggleEnable(): this;

    setMode(
        mode?: 0 | 1 | 'pointerdown' | 'press' | 'pointerup' | 'release'
    ): this;

    setClickInterval(interval: number): this;
}