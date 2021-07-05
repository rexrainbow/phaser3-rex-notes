// import * as Phaser from 'phaser';
import OnePointerTracer from '../onepointertracer/OnePointerTracer';
import { IConfig as IConfigBase } from '../onepointertracer/OnePointerTracer';


export interface IConfig extends IConfigBase {
    time?: number,
    threshold?: number,
}

export default class Press extends OnePointerTracer {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: IConfig
    )

    setHoldTime(time: number): this;
    holdTime: number;
    setDragThreshold(distance: number): this;
    dragThreshold: number;

    readonly isPressed: boolean;
}