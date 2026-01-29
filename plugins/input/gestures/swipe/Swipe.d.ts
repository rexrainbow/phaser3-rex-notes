// import * as Phaser from 'phaser';
import OnePointerTracer from '../onepointertracer/OnePointerTracer';

export default Swipe;

declare namespace Swipe {

    /**
     * Swipe configuration.
     */
    interface IConfig extends OnePointerTracer.IConfig {
        /**
         * Drag threshold in pixels.
         */
        threshold?: number,
        /**
         * Velocity threshold in pixels per ms.
         */
        velocityThreshold?: number,
        /**
         * Direction mode.
         */
        dir: 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir',
    }

    namespace Events {
        /**
         * Swipe callback.
         */
        type SwipeCallbackType = (
            /**
             * Swipe component.
             */
            swipe: Swipe,
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
 * Swipe gesture component.
 */
declare class Swipe extends OnePointerTracer {
    /**
     * Create a Swipe component.
     * @param gameObject - Target game object or scene.
     * @param config - Swipe configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Swipe.IConfig
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
     * Set velocity threshold.
     * @param velocity - Velocity threshold.
     * @returns This instance.
     */
    setVelocityThreshold(velocity: number): this;
    /**
     * Velocity threshold value.
     */
    velocityThreshold: number;

    /**
     * Set direction mode.
     * @param dirMode - Direction mode.
     * @returns This instance.
     */
    setDirectionMode(
        dirMode: 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir'
    ): this;
    /**
     * Direction mode value.
     */
    dirMode: number;

    /**
     * True if swiping is in progress.
     */
    readonly isSwiping: boolean;
    /**
     * True if a swipe has occurred.
     */
    readonly isSwiped: boolean;
}
