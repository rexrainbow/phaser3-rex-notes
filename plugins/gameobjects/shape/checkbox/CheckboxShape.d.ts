import BaseShapes from '../shapes/BaseShapes';

export default Checkbox;

declare namespace Checkbox {
    interface IConfig {
        /**
         * Initial x position.
         */
        x: number,
        /**
         * Initial y position.
         */
        y: number,
        /**
         * Initial width.
         */
        width: number,
        /**
         * Initial height.
         */
        height: number,

        /**
         * Checked box fill color.
         */
        color?: number,
        /**
         * Checked box fill alpha.
         */
        boxFillAlpha?: number,
        /**
         * Unchecked box fill color.
         */
        uncheckedColor?: number,
        /**
         * Unchecked box fill alpha.
         */
        uncheckedBoxFillAlpha?: number,

        /**
         * Box stroke line width.
         */
        boxLineWidth?: number,
        /**
         * Box stroke color.
         */
        boxStrokeColor?: number,
        /**
         * Box stroke alpha.
         */
        boxStrokeAlpha?: number,
        /**
         * Unchecked box stroke color.
         */
        uncheckedBoxStrokeColor?: number,
        /**
         * Unchecked box stroke alpha.
         */
        uncheckedBoxStrokeAlpha?: number,

        /**
         * Box size.
         */
        boxSize?: number,
        /**
         * Checker size.
         */
        checkerSize?: number,

        /**
         * Checker color.
         */
        checkerColor?: number,
        /**
         * Checker alpha.
         */
        checkerAlpha?: number,

        /**
         * True to render a circle box.
         */
        circleBox?: boolean,

        /**
         * Checker animation duration.
         */
        animationDuration?: number,

        /**
         * Checked state.
         */
        checked?: boolean,
        /**
         * Value state.
         */
        value?: boolean,
    }
}

/**
 * Checkbox shape built from custom shapes.
 */
declare class Checkbox extends BaseShapes {
    /**
     * Create a checkbox.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - The width.
     * @param height - The height.
     * @param color - Checked color.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        color?: number,
        config?: Checkbox.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: Checkbox.IConfig
    );

    /**
     * Create a checkbox from config.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Checkbox.IConfig
    );

    /**
     * Set value state.
     * @param value - New value.
     * @returns This instance.
     */
    setValue(value: boolean): this;
    /**
     * Toggle value state.
     * @returns This instance.
     */
    toggleValue(): this;
    /**
     * Value state.
     */
    value: boolean;

    /**
     * Set checked state.
     * @param checked - New checked state.
     * @returns This instance.
     */
    setChecked(checked?: boolean): this;
    /**
     * Toggle checked state.
     * @returns This instance.
     */
    toggleChecked(): this;
    /**
     * Checked state.
     */
    checked: boolean;

    /**
     * Set box shape to circle or square.
     * @param isCircleShape - True for circle box.
     * @returns This instance.
     */
    setBoxShape(isCircleShape?: boolean): this;

    /**
     * Set checked box fill style.
     * @param color - Fill color.
     * @param alpha - Fill alpha.
     * @returns This instance.
     */
    setBoxFillStyle(color: number, alpha?: number): this;
    /**
     * Checked box fill color.
     */
    boxFillColor: number;
    /**
     * Checked box fill alpha.
     */
    boxFillAlpha: number;
    /**
     * Set unchecked box fill style.
     * @param color - Fill color.
     * @param alpha - Fill alpha.
     * @returns This instance.
     */
    setUncheckedBoxFillStyle(color: number, alpha?: number): this;
    /**
     * Unchecked box fill color.
     */
    uncheckedBoxFillColor: number;
    /**
     * Unchecked box fill alpha.
     */
    uncheckedBoxFillAlpha: number;

    /**
     * Set box stroke style.
     * @param lineWidth - Line width.
     * @param color - Stroke color.
     * @param alpha - Stroke alpha.
     * @returns This instance.
     */
    setBoxStrokeStyle(lineWidth: number, color: number, alpha?: number): this;
    /**
     * Box line width.
     */
    boxLineWidth: number;
    /**
     * Box stroke color.
     */
    boxStrokeColor: number;
    /**
     * Box stroke alpha.
     */
    boxStrokeAlpha: number;

    /**
     * Set unchecked box stroke style.
     * @param lineWidth - Line width.
     * @param color - Stroke color.
     * @param alpha - Stroke alpha.
     * @returns This instance.
     */
    setUncheckedBoxStrokeStyle(lineWidth: number, color: number, alpha?: number): this;
    /**
     * Unchecked box line width.
     */
    uncheckedBoxLineWidth: number;
    /**
     * Unchecked box stroke color.
     */
    uncheckedBoxStrokeColor: number;
    /**
     * Unchecked box stroke alpha.
     */
    uncheckedBoxStrokeAlpha: number;

    /**
     * Set checker style.
     * @param color - Checker color.
     * @param alpha - Checker alpha.
     * @returns This instance.
     */
    setCheckerStyle(color: number, alpha?: number): this;
    /**
     * Checker color.
     */
    checkerColor: number;
    /**
     * Checker alpha.
     */
    checkAlpha: number;

    /**
     * Set checker animation duration.
     * @param duration - Duration in ms.
     * @returns This instance.
     */
    setCheckerAnimationDuration(duration: number): this;
    /**
     * Checker animation duration.
     */
    checkerAnimDuration: number;
}
