// import * as Phaser from 'phaser';
import DataMethods from '../../../../utils/data/DataMethods';

export default class Base extends DataMethods {
    readonly type: string;

    setActive(active?: boolean): this;
    active: boolean;

    setDirty(dirty?: boolean): this;

    scene: Phaser.Scene;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
}