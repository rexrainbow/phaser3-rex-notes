import BaseShapes from '../shapes/BaseShapes';

// import * as Phaser from 'phaser';
export default Line;

declare namespace Line {
    type PointType = { x: number, y: number };
    type LineType = 0 | 'bezier' | 1 | 'spline' | 2 | 'polyline' | 'poly' | 3 | 'straightline' | 'straight';

    interface IConfig {
        points?: PointType[],
        lineWidth?: number,
        color?: number,
        alpha?: number,
        lineType?: LineType,
        pointRadius?: number,
    }
}

declare class Line extends BaseShapes {
    constructor(
        scene: Phaser.Scene,
        config?: Line.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        points?: Line.PointType[],
        lineWidth?: number,
        color?: number,
        alpha?: number,
        lineType?: Line.LineType
    );

    setLine(
        points: Line.PointType[],
        lineType?: Line.LineType
    ): this;

    setLineType(lineType: Line.LineType): this;

}