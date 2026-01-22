import BaseShapes from '../shapes/BaseShapes';
import * as Geoms from '../shapes/geoms/';

export default CustomShapes;

declare namespace CustomShapes {

    /**
     * Shape name types.
     */
    type NameTypes = string | string[] | number;

    type Arc = Geoms.Arc;
    type Circle = Geoms.Circle;
    type Curve = Geoms.Curve;
    type Ellipse = Geoms.Ellipse;
    type Line = Geoms.Line;
    type Lines = Geoms.Lines;
    type Rectangle = Geoms.Rectangle;
    type RoundRectangle = Geoms.RoundRectangle;
    type Triangle = Geoms.Triangle;
    type ShapeTypes = Arc | Circle | Curve | Ellipse |
        Line | Lines | Rectangle | RoundRectangle | Triangle;

    type ShapeMapType = {
        /**
         * Arc shape names.
         */
        arc?: NameTypes,
        /**
         * Circle shape names.
         */
        circle?: NameTypes,
        /**
         * Curve shape names.
         */
        curve?: NameTypes,
        /**
         * Ellipse shape names.
         */
        ellipse?: NameTypes,
        /**
         * Line shape names.
         */
        line?: NameTypes,
        /**
         * Lines shape names.
         */
        lines?: NameTypes,
        /**
         * Rectangle shape names.
         */
        rectangle?: NameTypes,
        /**
         * Round rectangle shape names.
         */
        roundRectangle?: NameTypes,
        /**
         * Triangle shape names.
         */
        triangle?: NameTypes,
    };
    type ShapeArrayType = {
        /**
         * Shape name.
         */
        name: string,
        /**
         * Shape type.
         */
        type: 'arc' | 'circle' | 'curve' | 'ellipse' | 'line' | 'lines' | 'rectangle' | 'triangle'
    }[];
    /**
     * Callback used to create shapes.
     */
    type CreatrShapeCallbackType = (this: CustomShapes) => void

    interface IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Initial width.
         */
        width?: number,
        /**
         * Initial height.
         */
        height?: number,

        /**
         * Shape creation config.
         */
        create?: ShapeMapType | ShapeArrayType | CreatrShapeCallbackType;

        /**
         * Update callback.
         */
        update?: (this: CustomShapes) => void;

        /**
         * Custom type string.
         */
        type?: string,
    }
}

/**
 * Container for multiple custom shapes.
 */
declare class CustomShapes extends BaseShapes {
    /**
     * Create custom shapes.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - The width.
     * @param height - The height.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: CustomShapes.IConfig
    );

    /**
     * Create custom shapes from config.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: CustomShapes.IConfig
    );

    /**
     * Set update callback for shapes.
     * @param callback - Update callback.
     * @returns This instance.
     */
    setUpdateShapesCallback(
        callback: (this: CustomShapes) => void
    ): this;

    /**
     * Get a shape by name.
     * @param name - Shape name.
     * @returns Shape instance.
     */
    getShape(name: string): CustomShapes.ShapeTypes;
    /**
     * Get all shapes.
     * @returns Shapes array.
     */
    getShapes(): CustomShapes.ShapeTypes[];
}
