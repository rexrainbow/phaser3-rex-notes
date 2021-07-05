// import * as Phaser from 'phaser';
import OnePointerTracer from '../onepointertracer/OnePointerTracer';
import { IConfig as IConfigBase } from '../onepointertracer/OnePointerTracer';


export interface IConfig extends IConfigBase{
    threshold?: number,
    velocityThreshold?: number,
    dir: 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir',
}

export default class Swipe extends OnePointerTracer {
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: IConfig
    )

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