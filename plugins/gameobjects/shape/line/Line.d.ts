import BaseShapes from '../shapes/BaseShapes';

// import * as Phaser from 'phaser';
export default Line;

declare namespace Line {
    type PointType = { x: number, y: number };
    type LineType = 0 | 'bezier' | 1 | 'spline' | 2 | 'polyline' | 'poly' | 3 | 'straightline' | 'straight';

    type EndPointType = 0 | 'none' | 1 | 'triangle' | 2 | 'dot' | 3 | 'box' | 4 | 'diamond';

    interface IConfig {
        points?: PointType[],
        lineWidth?: number,
        color?: number,
        alpha?: number,
        lineType?: LineType,
        pointRadius?: number,

        headShape?: EndPointType | string | number,
        headSize?: number,
        headColor?: number,
        headAlpha?: number,
        headStrokeWidth?: number,
        headStrokeColor?: number,
        headStrokeAlpha?: number,

        tailShape?: EndPointType | string | number,
        tailSize?: number,
        tailColor?: number,
        tailAlpha?: number,
        tailStrokeWidth?: number,
        tailStrokeColor?: number,
        tailStrokeAlpha?: number,
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
        config?: Line.IConfig
    );

    setLine(
        points: Line.PointType[],
        lineType?: Line.LineType
    ): this;

    setLineType(lineType: Line.LineType): this;

    readonly points: Line.PointType[];
    readonly lineType: number;

    setPointRadius(radius: number): this;

    setHeadShape(endPointType?: Line.EndPointType): this;
    setHeadSize(size?: number): this;
    setHeadFillStyle(color?: number, alpha?: number): this;
    setHeadStrokeStyle(lineWidth?: number, color?: number, alpha?: number): this;

    setTailShape(endPointType?: Line.EndPointType): this;
    setTailSize(size?: number): this;
    setTailFillStyle(color?: number, alpha?: number): this;
    setTailStrokeStyle(lineWidth?: number, color?: number, alpha?: number): this;
}