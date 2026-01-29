// import * as Phaser from 'phaser';
import EaseValueTaskBase from "../../utils/componentbase/tweentask/EaseValueTaskBase";

export default Flip;

declare namespace Flip {

    /**
     * Face identifiers.
     */
    type FaceTypes = 0 | 1 | 'front' | 'back';

    /**
     * Face definition.
     */
    type FaceDefTypes = string |
    { key?: string, frame?: string } |
        ((gameObject: Phaser.GameObjects.GameObject) => void);

    /**
     * Flip orientation identifiers.
     */
    type OrientationTypes = 0 | 1 | 'x' | 'y' | 'horizontal' | 'vertical';

    /**
     * Flip configuration.
     */
    interface IConfig {
        /**
         * Initial face.
         */
        face?: FaceTypes,
        /**
         * Front face definition.
         */
        front?: FaceDefTypes,
        /**
         * Back face definition.
         */
        back?: FaceDefTypes,

        /**
         * Flip orientation.
         */
        orientation?: OrientationTypes,
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Delay in ms.
         */
        delay?: number,
        /**
         * Ease name.
         */
        ease?: string,

        /**
         * Event emitter override or true to use game object emitter.
         */
        eventEmitter?: boolean | Phaser.Events.EventEmitter
    }

    namespace Events {
        /**
         * Complete callback.
         */
        type CompleteCallbackType = (
            /**
             * Target game object.
             */
            gameObject: Phaser.GameObjects.GameObject,
            /**
             * Flip component.
             */
            flip: Flip
        ) => void;
    }

}

/**
 * Flip effect component.
 */
declare class Flip extends EaseValueTaskBase {
    /**
     * Create a Flip component.
     * @param gameObject - Target game object.
     * @param config - Flip configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Flip.IConfig
    );

    /**
     * Flip the game object.
     * @param duration - Duration in ms.
     * @returns This instance.
     */
    flip(duration?: number): this;

    /**
     * Set current face.
     * @param face - Face identifier.
     * @returns This instance.
     */
    setFace(
        face: 0 | 1 | 'front' | 'back'
    ): this;
    /**
     * Toggle current face.
     * @returns This instance.
     */
    toggleFace(): this;
    /**
     * Current face value.
     */
    face: number;

    /**
     * Set front face.
     * @param key - Texture key or callback.
     * @param frame - Texture frame.
     * @returns This instance.
     */
    setFrontFace(
        key: string |
            ((gameObject: Phaser.GameObjects.GameObject) => void),
        frame?: string
    ): this;
    /**
     * Set back face.
     * @param key - Texture key or callback.
     * @param frame - Texture frame.
     * @returns This instance.
     */
    setBackFace(
        key: string |
            ((gameObject: Phaser.GameObjects.GameObject) => void),
        frame?: string
    ): this;
}
