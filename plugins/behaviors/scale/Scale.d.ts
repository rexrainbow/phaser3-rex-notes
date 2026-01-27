import EaseValueTaskBase from "../../utils/componentbase/tweentask/EaseValueTaskBase";

export default Scale;

declare namespace Scale {
    /**
     * End behavior mode identifiers.
     */
    type ModeType = 0 | 1 | 2 | 'stop' | 'destroy' | 'yoyo';

    /**
     * Scale configuration.
     */
    interface IConfig {
        /**
         * End behavior mode.
         */
        mode?: ModeType,
        /**
         * Start scale.
         */
        start?: number,
        /**
         * End scale.
         */
        end?: number,
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
             * Scale component.
             */
            scale: Scale
        ) => void;
    }
}

/**
 * Scale task component.
 */
declare class Scale extends EaseValueTaskBase {
    /**
     * Create a Scale component.
     * @param gameObject - Target game object.
     * @param config - Scale configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Scale.IConfig
    );

    /**
     * Set end behavior mode.
     * @param mode - Mode identifier.
     * @returns This instance.
     */
    setMode(mode: Scale.ModeType): this;
    /**
     * Current mode value.
     */
    mode: number;

    /**
     * Set scale range.
     * @param start - Start scale.
     * @param end - End scale.
     * @returns This instance.
     */
    setScaleRange(
        start: number | { x: number, y: number },
        end: number | { x: number, y: number }
    ): this;
    /**
     * Start scale x.
     */
    startX: number;
    /**
     * Start scale y.
     */
    startY: number;
    /**
     * End scale x.
     */
    endX: number;
    /**
     * End scale y.
     */
    endY: number;
}
