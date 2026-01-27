import EaseValueTaskBase from "../../utils/componentbase/tweentask/EaseValueTaskBase";

export default Fade;

declare namespace Fade {
    /**
     * End behavior mode identifiers.
     */
    type ModeType = 0 | 1 | 2 | 'stop' | 'destroy' | 'yoyo';

    /**
     * Fade configuration.
     */
    interface IConfig {
        /**
         * End behavior mode.
         */
        mode?: ModeType,
        /**
         * Start alpha value.
         */
        start?: number,
        /**
         * End alpha value.
         */
        end?: number,
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Delay in ms.
         */
        delay?: number
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
             * Fade component.
             */
            fade: Fade
        ) => void;
    }
}

/**
 * Fade task component.
 */
declare class Fade extends EaseValueTaskBase {
    /**
     * Create a Fade component.
     * @param gameObject - Target game object.
     * @param config - Fade configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Fade.IConfig
    );

    /**
     * Set end behavior mode.
     * @param mode - Mode identifier.
     * @returns This instance.
     */
    setMode(mode: Fade.ModeType): this;
    /**
     * Current mode value.
     */
    mode: number;

    /**
     * Set alpha range.
     * @param start - Start alpha.
     * @param end - End alpha.
     * @returns This instance.
     */
    setAlphaRange(start: number, end: number): this;
    /**
     * Start alpha value.
     */
    alphaStart: number;
    /**
     * End alpha value.
     */
    alphaEnd: number;
}
