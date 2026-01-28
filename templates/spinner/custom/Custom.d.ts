import Base from '../base/Base';
import * as Geoms from '../../../plugins/gameobjects/shape/shapes/geoms';

export default Custom;

declare namespace Custom {

    /**
     * Name values for shape lookups.
     */
    type NameTypes = string | string[] | number;

    /**
     * Arc shape type.
     */
    type Arc = Geoms.Arc;
    /**
     * Circle shape type.
     */
    type Circle = Geoms.Circle;
    /**
     * Curve shape type.
     */
    type Curve = Geoms.Curve;
    /**
     * Ellipse shape type.
     */
    type Ellipse = Geoms.Ellipse;
    /**
     * Line shape type.
     */
    type Line = Geoms.Line;
    /**
     * Lines shape type.
     */
    type Lines = Geoms.Lines;
    /**
     * Rectangle shape type.
     */
    type Rectangle = Geoms.Rectangle;
    /**
     * Round rectangle shape type.
     */
    type RoundRectangle = Geoms.RoundRectangle;
    /**
     * Triangle shape type.
     */
    type Triangle = Geoms.Triangle;
    /**
     * Supported shape types.
     */
    type ShapeTypes = Arc | Circle | Curve | Ellipse |
        Line | Lines | Rectangle | RoundRectangle | Triangle;

    /**
     * Callback used to create shapes.
     */
    type CreateCallback = (this: Custom) => void;

    /**
     * Callback used to update shapes.
     */
    type UpdateCallback = (this: Custom) => void;

    /**
     * Configuration options for creating a Custom spinner.
     */
    interface IConfig extends Base.IConfig {
        /**
         * Shape creation configuration or callback.
         */
        create?: {
            /**
             * Arc shape names.
             */
            arc?: NameTypes,
            /**
             * Circle shape names.
             */
            circle?: NameTypes,
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
             * Triangle shape names.
             */
            triangle?: NameTypes,
        } | CreateCallback;

        /**
         * Update callback for custom shapes.
         */
        update?: UpdateCallback;

        /**
         * Custom spinner type name.
         */
        type?: string,
    }

}

/**
 * Custom spinner with user-defined shapes.
 */
declare class Custom extends Base {
    /**
     * Create a Custom spinner.
     *
     * @param scene - The Phaser.Scene that owns this spinner.
     * @param config - Configuration options for the spinner.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Custom.IConfig
    )

    /**
     * Get a shape by name.
     *
     * @param name - The shape name.
     * @returns The shape instance.
     */
    getShape(name: string): Custom.ShapeTypes;
    /**
     * Get all shapes.
     *
     * @returns The list of shapes.
     */
    getShapes(): Custom.ShapeTypes[];
}
