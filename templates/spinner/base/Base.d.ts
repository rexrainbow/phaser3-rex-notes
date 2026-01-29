// import * as Phaser from 'phaser';
import BaseShape from '../../../plugins/gameobjects/shape/shapes/BaseShapes';

export default Base;

declare namespace Base {
    /**
     * Configuration for resetting spinner state.
     */
    interface IResetFromConfig {
        /**
         * Duration in milliseconds.
         */
        duration?: number,
        /**
         * Easing name.
         */
        ease?: string,
        /**
         * Delay before starting in milliseconds.
         */
        delay?: number,
        /**
         * Delay between repeats in milliseconds.
         */
        repeatDelay?: number,
        /**
         * Tint color value.
         */
        color?: number,
        /**
         * Initial progress value.
         */
        value?: number,
    }

    /**
     * Configuration options for creating a Base spinner.
     */
    interface IConfig extends IResetFromConfig {
        /**
         * X position.
         */
        x?: number,
        /**
         * Y position.
         */
        y?: number,
        /**
         * Width of the spinner.
         */
        width?: number,
        /**
         * Height of the spinner.
         */
        height?: number,

        /**
         * Start running immediately.
         */
        start?: boolean,
    }

}

/**
 * Base class for spinner shapes.
 */
declare class Base extends BaseShape {
    /**
     * Create a Base spinner.
     *
     * @param scene - The Phaser.Scene that owns this spinner.
     * @param config - Configuration options for the spinner.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Base.IConfig
    )

    /**
     * Reset from configuration values.
     *
     * @param config - Reset configuration.
     * @param setDefaults - Whether to apply defaults.
     * @returns This Base instance.
     */
    resetFromConfig(
        config?: Base.IResetFromConfig,
        setDefaults?: boolean
    ): this;

    /**
     * Start running the spinner.
     *
     * @param duration - Duration in milliseconds.
     * @returns This Base instance.
     */
    start(duration?: number): this;
    /**
     * Pause the spinner.
     *
     * @returns This Base instance.
     */
    pause(): this;
    /**
     * Resume the spinner.
     *
     * @returns This Base instance.
     */
    resume(): this;
    /**
     * Stop the spinner.
     *
     * @returns This Base instance.
     */
    stop(): this;
    /**
     * Whether the spinner is running.
     */
    readonly isRunning: boolean;

    /**
     * Set the progress value.
     *
     * @param t - The progress value.
     * @returns This Base instance.
     */
    setValue(t: number): this;
    /**
     * Current progress value.
     */
    value: number;

    /**
     * Set the spinner color.
     *
     * @param color - The tint color value.
     * @returns This Base instance.
     */
    setColor(color: number): this;
    /**
     * Current color value.
     */
    color: number;

    /**
     * Set the duration.
     *
     * @param duration - Duration in milliseconds.
     * @returns This Base instance.
     */
    setDuration(duration: number): this;
    /**
     * Current duration value.
     */
    duration: this;

    /**
     * Set the easing function.
     *
     * @param ease - The easing name.
     * @returns This Base instance.
     */
    setEase(ease: string): this;
    /**
     * Current easing name.
     */
    ease: string;

    /**
     * Center X coordinate.
     */
    readonly centerX: number;
    /**
     * Center Y coordinate.
     */
    readonly centerY: number;
    /**
     * Radius of the spinner.
     */
    readonly radius: number;
}
