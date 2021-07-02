import * as Phaser from 'phaser';

export interface IConfig {
    x: number, y: number,
    key?: string,
    frame?: string,
    hideCCW?: boolean,
    gridWidth?: number,
    girdHeight?: number
}

export default class Image extends Phaser.GameObjects.Mesh {
    constructor(
        scene: Phaser.Scene,
        x?: number | IConfig,
        y?: number,
        key?: string,
        frame?: string | null,
        config?: IConfig
    )

    transformVerts(
        x?: number, y?: number, z?: number,
        rotateX?: number, rotateY?: number, rotateZ?: number
    ): this;

    angleX: number;
    angleY: number;
    angleZ: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;

}