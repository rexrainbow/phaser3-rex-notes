import BaseShapes from "../shapes/BaseShapes";
import * as Geoms from '../shapes/geoms/';

export default CustomShapes;

declare namespace CustomShapes {

    type NameTypes = string | string[] | number;

    type ArcShape = Geoms.Arc;
    type CircleShape = Geoms.Circle;
    type CurveShape = Geoms.Curve;
    type EllipseShape = Geoms.Ellipse;
    type LineShape = Geoms.Line;
    type LinesShape = Geoms.Lines;
    type RectangleShape = Geoms.Rectangle;
    type TriangleShape = Geoms.Triangle;
    type ShapeTypes = ArcShape | CircleShape | CurveShape | CurveShape | EllipseShape |
        LineShape | LinesShape | RectangleShape | TriangleShape;

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        create?: (
            {
                arc?: NameTypes,
                circle?: NameTypes,
                ellipse?: NameTypes,
                line?: NameTypes,
                lines?: NameTypes,
                rectangle?: NameTypes,
                triangle?: NameTypes,
            } |
            ((this: CustomShapes) => void)
        );

        update?: (this: CustomShapes) => void;

        type?: string,
    }
}

declare class CustomShapes extends BaseShapes {
    constructor(
        scene: Phaser.Scene,
        config?: CustomShapes.IConfig
    );

    setUpdateShapesCallback(
        callback: (this: CustomShapes) => void
    ): this;

    getShape(name: string): CustomShapes.ShapeTypes;
    getShapes(): CustomShapes.ShapeTypes[];
}