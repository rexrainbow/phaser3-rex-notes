import BaseShapes from "../shapes/BaseShapes";
import * as Geoms from '../shapes/geoms/';

export default CustomShapes;

declare namespace CustomShapes {

    type NameTypes = string | string[] | number;

    type Arc = Geoms.Arc;
    type Circle = Geoms.Circle;
    type Curve = Geoms.Curve;
    type Ellipse = Geoms.Ellipse;
    type Line = Geoms.Line;
    type Lines = Geoms.Lines;
    type Rectangle = Geoms.Rectangle;
    type Triangle = Geoms.Triangle;
    type ShapeTypes = Arc | Circle | Curve | Ellipse |
        Line | Lines | Rectangle | Triangle;

    type ShapeMapType = {
        arc?: NameTypes,
        circle?: NameTypes,
        curve?: NameTypes,
        ellipse?: NameTypes,
        line?: NameTypes,
        lines?: NameTypes,
        rectangle?: NameTypes,
        triangle?: NameTypes,
    };
    type ShapeArrayType = {
        name: string,
        type: 'arc' | 'circle' | 'curve' | 'ellipse' | 'line' | 'rectangle' | 'triangle'
    }[];
    type CreatrShapeCallbackType = (this: CustomShapes) => void

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        create?: ShapeMapType | ShapeArrayType | CreatrShapeCallbackType;

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