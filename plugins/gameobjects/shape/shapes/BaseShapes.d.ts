import * as Phaser from 'phaser';
import BaseGeom from './geoms/base/BaseGeom';

export default class BaseShapes extends Phaser.GameObjects.Shape {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number
    );

    width: number;
    height: number;
    setSize(width: number, height: number): this;
    resize(width: number, height: number): this;

    dirty: boolean;
    setDirty(dirty?: boolean): this;

    updateShapes(): this;

    getShape(name: string): BaseGeom;
    getShapes(): BaseGeom[];
    addShape(shape: BaseGeom): this;
    deleteShape(name: string): this;
    clear(): this;
}