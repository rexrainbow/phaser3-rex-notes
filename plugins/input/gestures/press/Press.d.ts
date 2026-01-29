// import * as Phaser from 'phaser';
import OnePointerTracer from '../onepointertracer/OnePointerTracer';

export default Press;

declare namespace Press {

    /**
     * Press configuration.
     */
    export interface IConfig extends OnePointerTracer.IConfig {
        /**
         * Hold time in ms.
         */
        time?: number,
        /**
         * Drag threshold in pixels.
         */
        threshold?: number,
    }

    namespace Events {
        /**
         * Press callback.
         */
        type PressCallbackType = (
            /**
             * Press component.
             */
            press: Press,
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
 * Press gesture component.
 */
declare class Press extends OnePointerTracer {
    /**
     * Create a Press component.
     * @param gameObject - Target game object or scene.
     * @param config - Press configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Press.IConfig
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
     * True if pressing is in progress.
     */
    readonly isPressing: boolean;
    /**
     * True if a press has occurred.
     */
    readonly isPressed: boolean;
}
