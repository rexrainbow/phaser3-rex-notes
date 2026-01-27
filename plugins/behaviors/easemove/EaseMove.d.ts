import EaseValueTaskBase from "../../utils/componentbase/tweentask/EaseValueTaskBase";

export default EaseMove;

declare namespace EaseMove {
    /**
     * End behavior mode identifiers.
     */
    type ModeType = 0 | 1 | 2 | 'stop' | 'destroy' | 'yoyo';

    /**
     * EaseMove configuration.
     */
    interface IConfig {
        /**
         * End behavior mode.
         */
        mode?: ModeType,

        /**
         * Target x.
         */
        x?: number,
        /**
         * Target y.
         */
        y?: number,
        /**
         * Start x.
         */
        startX?: number,
        /**
         * Start y.
         */
        startY?: number,
        /**
         * End x.
         */
        endX?: number,
        /**
         * End y.
         */
        endY?: number,

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
        ease?: string
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
             * EaseMove component.
             */
            easeMove: EaseMove
        ) => void;
    }
}

/**
 * Ease movement task component.
 */
declare class EaseMove extends EaseValueTaskBase {
    /**
     * Create an EaseMove component.
     * @param gameObject - Target game object.
     * @param config - EaseMove configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: EaseMove.IConfig
    );

    /**
     * Set end behavior mode.
     * @param mode - Mode identifier.
     * @returns This instance.
     */
    setMode(mode: EaseMove.ModeType): this;
    /**
     * Current mode value.
     */
    mode: number;

    /**
     * Set target position.
     * @param x - Target x.
     * @param y - Target y.
     * @returns This instance.
     */
    setTargetPosition(
        x: number,
        y: number
    ): this;
    /**
     * Set target position from config.
     * @param config - Position configuration.
     * @returns This instance.
     */
    setTargetPosition(
        config?: {
            /**
             * Start x.
             */
            startX?: number,
            /**
             * Start y.
             */
            startY?: number,
            /**
             * End x.
             */
            endX?: number,
            /**
             * End y.
             */
            endY?: number,
        }
    ): this;
    /**
     * Start x.
     */
    startX: number;
    /**
     * Start y.
     */
    startY: number;
    /**
     * End x.
     */
    endX: number;
    /**
     * End y.
     */
    endY: number;
}
