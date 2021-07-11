import Base from '../base/Base';
import * as Geoms from '../../../plugins/gameobjects/shape/shapes/geoms';

export default Custom;

declare namespace Custom {

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

    interface IConfig extends Base.IConfig {
        create?: {
            arc?: NameTypes,
            circle?: NameTypes,
            ellipse?: NameTypes,
            line?: NameTypes,
            lines?: NameTypes,
            rectangle?: NameTypes,
            triangle?: NameTypes,
        } | ((this: Custom) => void);

        update?: (this: Custom) => void;

        type?: string,
    }

}

declare class Custom extends Base {
    constructor(
        scene: Phaser.Scene,
        config?: Custom.IConfig
    )

    getShape(name: string): Custom.ShapeTypes;
    getShapes(): Custom.ShapeTypes[];
}