import BaseGeom from "../base/BaseGeom";
import type {
    DashPatternConfig as StrokeDashPatternConfig,
    DashPatternType as StrokeDashPatternType,
    IStrokePathMethods,
    IStrokePathState,
} from "../../../utils/strokepath/StrokePathMethods";

export default Triangle;

declare namespace Triangle {
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
 * Triangle geometry.
 */
declare class Triangle extends BaseGeom {
    /**
     * Create a triangle.
     * @param x0 - Point 0 x.
     * @param y0 - Point 0 y.
     * @param x1 - Point 1 x.
     * @param y1 - Point 1 y.
     * @param x2 - Point 2 x.
     * @param y2 - Point 2 y.
     */
    constructor(
        x0?: number,
        y0?: number,
        x1?: number,
        y1?: number,
        x2?: number,
        y2?: number
    );

    /**
     * Set point 0.
     * @param x - Point 0 x.
     * @param y - Point 0 y.
     * @returns This instance.
     */
    setP0(
        x: number,
        y: number
    ): this;
    /**
     * Point 0 x.
     */
    x0: number;
    /**
     * Point 0 y.
     */
    y0: number;

    /**
     * Set point 1.
     * @param x - Point 1 x.
     * @param y - Point 1 y.
     * @returns This instance.
     */
    setP1(
        x: number,
        y: number
    ): this;
    /**
     * Point 1 x.
     */
    x1: number;
    /**
     * Point 1 y.
     */
    y1: number;

    /**
     * Set point 2.
     * @param x - Point 2 x.
     * @param y - Point 2 y.
     * @returns This instance.
     */
    setP2(
        x: number,
        y: number
    ): this;
    /**
     * Point 2 x.
     */
    x2: number;
    /**
     * Point 2 y.
     */
    y2: number;
}

interface Triangle extends IStrokePathMethods, IStrokePathState {
}
