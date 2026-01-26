// import * as Phaser from 'phaser';
import TwoPointersTracer from '../twopointerstracer/TwoPointersTracer';


export default Rotate;

declare namespace Rotate {

    /**
     * Rotate configuration.
     */
    interface IConfig extends TwoPointersTracer.IConfig {
        /**
         * Drag threshold in pixels.
         */
        threshold?: number,
    }

    namespace Events {
        /**
         * Rotate callback.
         */
        type RotateCallbackType = (
            /**
             * Rotate component.
             */
            rotate: Rotate,
        ) => void;
    }
}

/**
 * Rotate gesture component.
 */
declare class Rotate extends TwoPointersTracer {
    /**
     * Create a Rotate component.
     * @param gameObject - Target game object or scene.
     * @param config - Rotate configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Rotate.IConfig
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
     * Spin one or more game objects.
     * @param gameObejects - Game object or array of game objects.
     * @returns This instance.
     */
    spinObject(
        gameObejects: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Current rotation in radians.
     */
    readonly rotation: number;
    /**
     * True if rotating is in progress.
     */
    readonly isRotating: boolean;
    /**
     * True if a rotation has occurred.
     */
    readonly isRotated: boolean;
}
