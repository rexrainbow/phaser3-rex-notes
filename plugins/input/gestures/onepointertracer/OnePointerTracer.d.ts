// import * as Phaser from 'phaser';

export interface IConfig {
    enable?: boolean,
    bounds?: Phaser.Geom.Rectangle,
    eventEmitter?: boolean | Phaser.Events.EventEmitter,
}

export default class OnePointerTracer extends Phaser.Events.EventEmitter {

    enable: boolean;
    setEnable(enable?: boolean): this;
    toggleEnable(): this;

    bounds: Phaser.Geom.Rectangle | undefined;
    setDetectBounds(bounds?: Phaser.Geom.Rectangle): this;

    pointer: Phaser.Input.Pointer | undefined;
    lastPointer: Phaser.Input.Pointer | undefined;
}