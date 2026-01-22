import BaseShapes from '../shapes/BaseShapes';

// import * as Phaser from 'phaser';
export default Line;

declare namespace Line {
    /**
     * Point on the line path.
     */
    type PointType = { x: number, y: number };
    /**
     * Line path type.
     */
    type LineType = 0 | 'bezier' | 1 | 'spline' | 2 | 'polyline' | 'poly' | 3 | 'straightline' | 'straight';

    /**
     * Endpoint shape type.
     */
    type EndPointType = 0 | 'none' | 1 | 'triangle' | 2 | 'dot' | 3 | 'box' | 4 | 'diamond';

    interface IConfig {
        /**
         * Line path points.
         */
        points?: PointType[],
        /**
         * Line width.
         */
        lineWidth?: number,
        /**
         * Line color.
         */
        color?: number,
        /**
         * Line alpha.
         */
        alpha?: number,
        /**
         * Line type.
         */
        lineType?: LineType,
        /**
         * Point radius for curves.
         */
        pointRadius?: number,

        /**
         * Head shape type.
         */
        headShape?: EndPointType | string | number,
        /**
         * Head size.
         */
        headSize?: number,
        /**
         * Head fill color.
         */
        headColor?: number,
        /**
         * Head fill alpha.
         */
        headAlpha?: number,
        /**
         * Head stroke width.
         */
        headStrokeWidth?: number,
        /**
         * Head stroke color.
         */
        headStrokeColor?: number,
        /**
         * Head stroke alpha.
         */
        headStrokeAlpha?: number,

        /**
         * Tail shape type.
         */
        tailShape?: EndPointType | string | number,
        /**
         * Tail size.
         */
        tailSize?: number,
        /**
         * Tail fill color.
         */
        tailColor?: number,
        /**
         * Tail fill alpha.
         */
        tailAlpha?: number,
        /**
         * Tail stroke width.
         */
        tailStrokeWidth?: number,
        /**
         * Tail stroke color.
         */
        tailStrokeColor?: number,
        /**
         * Tail stroke alpha.
         */
        tailStrokeAlpha?: number,
    }
}

/**
 * Line shape with optional head and tail endpoints.
 */
declare class Line extends BaseShapes {
    /**
     * Create a line shape.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Line.IConfig
    );

    /**
     * Create a line shape.
     * @param scene - The Scene to which this object belongs.
     * @param points - Line path points.
     * @param lineWidth - Line width.
     * @param color - Line color.
     * @param alpha - Line alpha.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        points?: Line.PointType[],
        lineWidth?: number,
        color?: number,
        alpha?: number,
        config?: Line.IConfig
    );

    /**
     * Set line points and type.
     * @param points - Line path points.
     * @param lineType - Line type.
     * @returns This instance.
     */
    setLine(
        points: Line.PointType[],
        lineType?: Line.LineType
    ): this;

    /**
     * Set line type.
     * @param lineType - Line type.
     * @returns This instance.
     */
    setLineType(lineType: Line.LineType): this;

    /**
     * Current points.
     */
    readonly points: Line.PointType[];
    /**
     * Current line type.
     */
    readonly lineType: number;

    /**
     * Set point radius for curves.
     * @param radius - Point radius.
     * @returns This instance.
     */
    setPointRadius(radius: number): this;

    /**
     * Set head shape.
     * @param endPointType - Endpoint shape.
     * @returns This instance.
     */
    setHeadShape(endPointType?: Line.EndPointType): this;
    /**
     * Set head size.
     * @param size - Head size.
     * @returns This instance.
     */
    setHeadSize(size?: number): this;
    /**
     * Set head fill style.
     * @param color - Fill color.
     * @param alpha - Fill alpha.
     * @returns This instance.
     */
    setHeadFillStyle(
        color?: number,
        alpha?: number
    ): this;
    /**
     * Set head stroke style.
     * @param lineWidth - Stroke width.
     * @param color - Stroke color.
     * @param alpha - Stroke alpha.
     * @returns This instance.
     */
    setHeadStrokeStyle(
        lineWidth?: number,
        color?: number,
        alpha?: number
    ): this;

    /**
     * Set tail shape.
     * @param endPointType - Endpoint shape.
     * @returns This instance.
     */
    setTailShape(endPointType?: Line.EndPointType): this;
    /**
     * Set tail size.
     * @param size - Tail size.
     * @returns This instance.
     */
    setTailSize(size?: number): this;
    /**
     * Set tail fill style.
     * @param color - Fill color.
     * @param alpha - Fill alpha.
     * @returns This instance.
     */
    setTailFillStyle(
        color?: number,
        alpha?: number
    ): this;
    /**
     * Set tail stroke style.
     * @param lineWidth - Stroke width.
     * @param color - Stroke color.
     * @param alpha - Stroke alpha.
     * @returns This instance.
     */
    setTailStrokeStyle(
        lineWidth?: number,
        color?: number,
        alpha?: number
    ): this;
}
