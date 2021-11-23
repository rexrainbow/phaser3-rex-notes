// import * as Phaser from 'phaser';

export default Image;

declare namespace Image {

    interface IConfig {
        x: number, y: number,
        key?: string,
        frame?: string,
        hideCCW?: boolean,
    }

    class ControlPoint {
        setWorldXY(x: number, y: number): this;
        setPosition(x: number, y: number): this;
        getWorldXY(): { x: number, y: number };

        x: number;
        y: number;

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

    readonly topLeft: Image.ControlPoint;
    readonly topRight: Image.ControlPoint;
    readonly bottomLeft: Image.ControlPoint;
    readonly bottomRight: Image.ControlPoint;

}