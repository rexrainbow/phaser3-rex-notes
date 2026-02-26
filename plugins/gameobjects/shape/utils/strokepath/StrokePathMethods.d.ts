/**
 * Auto dash pattern configuration.
 */
export type DashPatternConfig = {
    /**
     * Number of dash segments along the full path.
     */
    segments?: number,
    /**
     * Drawn ratio of each segment, from 0 to 1.
     */
    drawRatio?: number,
};

/**
 * Dash pattern definition.
 */
export type DashPatternType = number[] | DashPatternConfig;

/**
 * Dash-pattern configuration methods mixed into path-like geometries.
 */
export interface IStrokePathConfigMethods {
    /**
     * Set stroke dash pattern and optional dash offset.
     *
     * @param dashPattern - Dash array or auto dash configuration.
     * @param dashOffset - Dash offset along the path.
     * @returns This instance.
     */
    setDashPattern(
        dashPattern?: DashPatternType,
        dashOffset?: number
    ): this;

    /**
     * Clear dash pattern and disable dashed stroke.
     *
     * @returns This instance.
     */
    clearDashPattern(): this;

    /**
     * Enable or disable dashed stroke rendering.
     *
     * @param enable - Set to true to enable dashed rendering.
     * @returns This instance.
     */
    setDashed(
        enable?: boolean
    ): this;
}

/**
 * Runtime state fields used by dashed stroke rendering.
 */
export interface IStrokePathState {
    /**
     * True if dashed stroke rendering is enabled.
     */
    isDashed: boolean,
    /**
     * Current dash pattern definition.
     */
    dashPattern: DashPatternType | undefined,
    /**
     * Current dash offset along the path.
     */
    dashOffset: number,
}

/**
 * Full stroke-path methods object mixed into path-like geometries.
 */
export interface IStrokePathMethods extends IStrokePathConfigMethods {
    /**
     * Build cached stroke path data based on current dash settings.
     *
     * @returns This instance.
     */
    buildStrokePath(): this;
}

/**
 * Dash-pattern configuration methods.
 */
declare const StrokePathConfigMethods: IStrokePathConfigMethods;

/**
 * Full stroke-path methods object.
 */
declare const StrokePathMethods: IStrokePathMethods;

export {
    StrokePathConfigMethods
};

export default StrokePathMethods;
