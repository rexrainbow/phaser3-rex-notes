// import * as Phaser from 'phaser';
import TwoPointersTracer from '../twopointerstracer/TwoPointersTracer';

export default Pinch;

declare namespace Pinch {

    /**
     * Pinch configuration.
     */
    interface IConfig extends TwoPointersTracer.IConfig {
        /**
         * Drag threshold in pixels.
         */
        threshold?: number,
    }

    namespace Events {
        /**
         * Pinch callback.
         */
        type PinchCallbackType = (
            /**
             * Pinch component.
             */
            pinch: Pinch,
        ) => void;
    }
}

/**
 * Pinch gesture component.
 */
declare class Pinch extends TwoPointersTracer {
    /**
     * Create a Pinch component.
     * @param gameObject - Target game object or scene.
     * @param config - Pinch configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Pinch.IConfig
    );

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
     * Current scale factor.
     */
    readonly scaleFactor: number;
    /**
     * True if pinching is in progress.
     */
    readonly isPinching: boolean;
    /**
     * True if a pinch has occurred.
     */
    readonly isPinched: boolean;
}
