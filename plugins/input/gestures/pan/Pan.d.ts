// import * as Phaser from 'phaser';
import OnePointerTracer from '../onepointertracer/OnePointerTracer';
import { IConfig as IConfigBase } from '../onepointertracer/OnePointerTracer';


export interface IConfig extends IConfigBase {
    threshold?: number,
}

export default class Pan extends OnePointerTracer {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: IConfig
    )

    setDragThreshold(distance: number): this;
    dragThreshold: number;

    readonly isPanned: boolean;
}