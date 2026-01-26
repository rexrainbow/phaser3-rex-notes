// import * as Phaser from 'phaser';
import OnePointerTracer from '../onepointertracer/OnePointerTracer';

export default Tap;

declare namespace Tap {

    /**
     * Tap configuration.
     */
    export interface IConfig extends OnePointerTracer.IConfig {
        /**
         * Hold time in ms.
         */
        time?: number,
        /**
         * Interval between taps in ms.
         */
        tapInterval?: number,
        /**
         * Drag threshold in pixels.
         */
        threshold?: number,
        /**
         * Tap offset in pixels.
         */
        tapOffset?: number,

        /**
         * Exact tap count.
         */
        taps?: number | undefined,
        /**
         * Minimum taps.
         */
        minTaps?: number | undefined,
        /**
         * Maximum taps.
         */
        maxTaps?: number | undefined,
    }

    namespace Events {
        /**
         * Tap callback.
         */
        type TapCallbackType = (
            /**
             * Tap component.
             */
            tap: Tap,
            /**
             * Target game object.
             */
            gameObject: Phaser.GameObjects.GameObject,
            /**
             * Last pointer input.
             */
            lastPointer: Phaser.Input.Pointer
        ) => void;
    }

}

/**
 * Tap gesture component.
 */
declare class Tap extends OnePointerTracer {
    /**
     * Create a Tap component.
     * @param gameObject - Target game object or scene.
     * @param config - Tap configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Tap.IConfig
    );

    /**
     * Set hold time.
     * @param time - Hold time in ms.
     * @returns This instance.
     */
    setHoldTime(time: number): this;
    /**
     * Hold time in ms.
     */
    holdTime: number;
    /**
     * Set tap interval.
     * @param time - Interval in ms.
     * @returns This instance.
     */
    setTapInterval(time: number): this;
    /**
     * Tap interval in ms.
     */
    tapInterval: number;

    /**
     * Set drag threshold.
     * @param distance - Threshold distance in pixels.
     * @returns This instance.
     */
    setDragThreshold(distance: number): this;
    /**
     * Drag threshold in pixels.
     */
    dragThreshold: number;
    /**
     * Set tap offset.
     * @param distance - Offset distance in pixels.
     * @returns This instance.
     */
    setTapOffset(distance: number): this;
    /**
     * Tap offset in pixels.
     */
    tapOffset: number;

    /**
     * Set maximum tap count.
     * @param amount - Max tap count.
     * @returns This instance.
     */
    setMaxTaps(amount: number): this;
    /**
     * Maximum tap count.
     */
    maxTaps: number;
    /**
     * Set minimum tap count.
     * @param amount - Min tap count.
     * @returns This instance.
     */
    setMaxTaps(amount: number): this;
    /**
     * Minimum tap count.
     */
    minTaps: number;
    /**
     * Set tap count range.
     * @param minTaps - Minimum tap count.
     * @param maxTaps - Maximum tap count.
     * @returns This instance.
     */
    setTaps(minTaps: number, maxTaps: number): this;

    /**
     * True if tapping is in progress.
     */
    readonly isTapping: boolean;
    /**
     * True if a tap has occurred.
     */
    readonly isTapped: boolean;
}
