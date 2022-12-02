import BaseShapes from '../shapes/BaseShapes';

// import * as Phaser from 'phaser';
export default Triangle;

declare namespace Triangle {
    type DirectionType = 0 | 1 | 2 | 3 | 'right' | 'down' | 'left' | 'up';

    interface IPaddingConfig {
        x?: number, y?: number,

        left?: number, right?: number, top?: number, bottom?: number,
    }

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        color?: number,
        alpha?: number,

        strokeColor?: number,
        strokeAlpha?: number,
        strokeWidth?: number,

        direction?: DirectionType,

        padding?: number | IPaddingConfig,

        radius?: number,
    }
}

declare class Triangle extends BaseShapes {
    constructor(
        scene: Phaser.Scene,
        config?: Triangle.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        fillColor?: number, fillAlpha?: number
    );

    setVerticeRotation(rotation: number): this;
    verticeRotation: number;

    setVerticeAngle(angle: number): this;
    verticeAngle: number;

    setDirection(direction: Triangle.DirectionType): this;
    direction: number;

    setPadding(left?: number, top?: number, right?: number, bottom?: number): this;
    setPadding(padding?: Triangle.IPaddingConfig): this;
    padding: {
        left: number, right: number, top: number, bottom: number,
    };

    setRadius(radius?: number): this;
    radius: number;
}