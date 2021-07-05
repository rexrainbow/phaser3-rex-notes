// import * as Phaser from 'phaser';
import TwoPointersTracer from '../twopointerstracer/TwoPointersTracer';
import { IConfig as IConfigBase } from '../twopointerstracer/TwoPointersTracer';


export interface IConfig extends IConfigBase {
    threshold?: number,
}

export default class Pinch extends TwoPointersTracer {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: IConfig
    )

    setDragThreshold(distance: number): this;
    dragThreshold: number;

    readonly scaleFactor: number;
    readonly isPinched: boolean;
}