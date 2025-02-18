// import * as Phaser from 'phaser';

export default Image;

declare namespace Image {

    interface IConfig {
        x: number, y: number,
        key?: string,
        frame?: string,
        hideBackFace?: boolean,
        gridWidth?: number,
        girdHeight?: number
    }

}

declare class Image extends Phaser.GameObjects.Mesh {
    constructor(
        scene: Phaser.Scene,
        x?: number | Image.IConfig,
        y?: number,
        key?: string,
        frame?: string | null,
        config?: Image.IConfig
    )

    setRotationXYZ(rotationX?: number, rotationY?: number, rotationZ?: number): this;
    setRotationX(rotationX?: number): this;
    setRotatioY(rotationY?: number): this;
    setRotationZ(rotationZ?: number): this;
    rotationX: number;
    rotationY: number;
    rotationZ: number;

    setAngleXYZ(angleX?: number, angleY?: number, angleZ?: number): this;
    setAngleX(angleX?: number): this;
    setAngleY(angleY?: number): this;
    setAngleZ(angleZ?: number): this;
    angleX: number;
    angleY: number;
    angleZ: number;
}