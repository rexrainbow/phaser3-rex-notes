import BaseShapes from '../shapes/BaseShapes';

export default ToggleSwitch;

declare namespace ToggleSwitch {
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
         * Width of the toggle.
         */
        width: number,
        /**
         * Height of the toggle.
         */
        height: number,

        /**
         * Track color.
         */
        color?: number,
        /**
         * Track fill alpha.
         */
        trackFillAlpha?: number,
        /**
         * Track color when value is false.
         */
        falseValueTrackColor?: number,
        /**
         * Track fill alpha when value is false.
         */
        falseValueTrackFillAlpha?: number,

        /**
         * Thumb color.
         */
        thumbColor?: number,
        /**
         * Thumb alpha.
         */
        thumbAlpha?: number,

        /**
         * Track width.
         */
        trackWidth?: number,
        /**
         * Track height.
         */
        trackHeight?: number,
        /**
         * Track corner radius.
         */
        trackRadius?: number,

        /**
         * Thumb width.
         */
        thumbWidth?: number,
        /**
         * Thumb height.
         */
        thumbHeight?: number,
        /**
         * Thumb corner radius.
         */
        thumbRadius?: number,

        /**
         * Thumb x position for false value.
         */
        thumbLeft?: number,
        /**
         * Thumb x position for true value.
         */
        thumbRight?: number,
        /**
         * Right-to-left flag.
         */
        rtl?: boolean,

        /**
         * Toggle animation duration in ms.
         */
        animationDuration?: number,

        /**
         * Initial value.
         */
        value?: boolean,
    }
}

/**
 * Toggle switch shape with track and thumb styling.
 */
declare class ToggleSwitch extends BaseShapes {
    /**
     * Create a toggle switch shape.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - Width of the toggle.
     * @param height - Height of the toggle.
     * @param color - Track color.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        color?: number,
        config?: ToggleSwitch.IConfig
    );

    /**
     * Create a toggle switch shape.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - Width of the toggle.
     * @param height - Height of the toggle.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        config?: ToggleSwitch.IConfig
    );

    /**
     * Create a toggle switch shape.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ToggleSwitch.IConfig
    );

    /**
     * Current value.
     */
    value: boolean;
    /**
     * Set value.
     * @param value - New value.
     * @returns This instance.
     */
    setValue(value: boolean): this;
    /**
     * Toggle value.
     * @returns This instance.
     */
    toggleValue(): this;

    /**
     * Track fill color.
     */
    trackFillColor: number;
    /**
     * Track fill alpha.
     */
    trackFillAlpha: number;
    /**
     * Set track fill style.
     * @param color - Fill color.
     * @param alpha - Fill alpha.
     * @returns This instance.
     */
    setTrackFillStyle(
        color: number,
        alpha?: number
    ): this;

    /**
     * Track color when value is false.
     */
    falseValueTrackColor: number;
    /**
     * Track alpha when value is false.
     */
    falseValueTrackFillAlpha: number;
    /**
     * Set false-value track fill style.
     * @param color - Fill color.
     * @param alpha - Fill alpha.
     * @returns This instance.
     */
    setFalseValueTrackFillStyle(
        color: number,
        alpha?: number
    ): this;

    /**
     * Thumb color.
     */
    thumbColor: number;
    /**
     * Thumb alpha.
     */
    thumbAlpha: number;
    /**
     * Set thumb style.
     * @param color - Thumb color.
     * @param alpha - Thumb alpha.
     * @returns This instance.
     */
    setThumbStyle(
        color: number,
        alpha?: number
    ): this;

    /**
     * Track width.
     */
    trackWidth: number;
    /**
     * Track height.
     */
    trackHeight: number;
    /**
     * Set track size.
     * @param width - Track width.
     * @param height - Track height.
     * @returns This instance.
     */
    setTrackSize(
        width: number,
        height: number
    ): this;
    /**
     * Track radius.
     */
    trackRadius: number;
    /**
     * Set track radius.
     * @param radius - Corner radius.
     * @returns This instance.
     */
    setTrackRadius(radius: number): this;

    /**
     * Thumb width.
     */
    thumbWidth: number;
    /**
     * Thumb height.
     */
    thumbHeight: number;
    /**
     * Set thumb size.
     * @param width - Thumb width.
     * @param height - Thumb height.
     * @returns This instance.
     */
    setThumbSize(
        width: number,
        height: number
    ): this;
    /**
     * Thumb radius.
     */
    thumbRadius: number;
    /**
     * Set thumb radius.
     * @param radius - Corner radius.
     * @returns This instance.
     */
    setThumbRadius(radius: number): this;

    /**
     * Thumb x position for false value.
     */
    thumbLeftX: number;
    /**
     * Thumb x position for true value.
     */
    thumbRightX: number;
    /**
     * Set thumb positions.
     * @param left - Thumb x position for false value.
     * @param right - Thumb x position for true value.
     * @returns This instance.
     */
    setThumbPosition(
        left: number,
        right?: number
    ): this;

    /**
     * Right-to-left flag.
     */
    rtl: boolean;
    /**
     * Set right-to-left flag.
     * @param rtl - True to enable RTL.
     * @returns This instance.
     */
    setRTL(rtl?: boolean): this;

    /**
     * Toggle animation progress.
     */
    toggleAnimProgress: number;
    /**
     * Set toggle animation duration.
     * @param duration - Duration in ms.
     * @returns This instance.
     */
    setToggleAnimationDuration(duration: number): this;
}
