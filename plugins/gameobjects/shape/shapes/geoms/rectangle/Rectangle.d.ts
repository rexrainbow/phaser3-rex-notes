import BaseGeom from "../base/BaseGeom";
import type {
    DashPatternConfig as StrokeDashPatternConfig,
    DashPatternType as StrokeDashPatternType,
    IStrokePathMethods,
    IStrokePathState,
} from "../../../utils/strokepath/StrokePathMethods";

export default Rectangle;

declare namespace Rectangle {
    /**
     * Auto dash pattern configuration.
     */
    type DashPatternConfig = StrokeDashPatternConfig;

    /**
     * Dash pattern definition.
     */
    type DashPatternType = StrokeDashPatternType;
}

/**
 * Rectangle geometry.
 */
declare class Rectangle extends BaseGeom {
    /**
     * Create a rectangle.
     * @param x - Top-left x.
     * @param y - Top-left y.
     * @param width - Width.
     * @param height - Height.
     */
    constructor(
        x?: number,
        y?: number,
        width?: number,
        height?: number
    );

    /**
     * Set top-left position.
     * @param x - Top-left x.
     * @param y - Top-left y.
     * @returns This instance.
     */
    setTopLeftPosition(
        x: number,
        y: number
    ): this;
    /**
     * Top-left x.
     */
    x: number;
    /**
     * Top-left y.
     */
    y: number;

    /**
     * Set size.
     * @param width - Width.
     * @param height - Height.
     * @returns This instance.
     */
    setSize(
        width: number,
        height: number
    ): this;
    /**
     * Width.
     */
    width: number;
    /**
     * Height.
     */
    height: number;

    /**
     * Set center position.
     * @param x - Center x.
     * @param y - Center y.
     * @returns This instance.
     */
    setCenterPosition(
        x: number,
        y: number
    ): this;
    /**
     * Center x.
     */
    centerX: number;
    /**
     * Center y.
     */
    centerY: number;

}

interface Rectangle extends IStrokePathMethods, IStrokePathState {
}
