import EaseValueTaskBase from "../../utils/componentbase/tweentask/EaseValueTaskBase";

export default Fade;

declare namespace Fade {
    /**
     * Behavior after fade-out completes.
     */
    type ModeType = 0 | 1 | 'stop' | 'destroy';

    /**
     * Configuration options for a fade task.
     */
    interface IConfig {
        /**
         * Completion mode after fade-out.
         */
        mode?: ModeType,
        /**
         * Set to true to enable the fade task.
         */
        enable?: boolean,
        /**
         * Volume range configuration object.
         */
        volume?: {
            /**
             * Starting volume value.
             */
            start?: number,
            /**
             * Ending volume value.
             */
            end?: number,
        }

        /**
         * Starting volume value.
         */
        start?: number,
        /**
         * Ending volume value.
         */
        end?: number,
        /**
         * Fade duration in milliseconds.
         */
        duration?: number,
        /**
         * Delay before fade starts in milliseconds.
         */
        delay?: number
    }
}

/**
 * Fade task that animates sound volume over time.
 */
declare class Fade extends EaseValueTaskBase {
    /**
     * Create a fade task.
     *
     * @param gameObject - Sound or game object associated with this task.
     * @param config - Optional fade configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Fade.IConfig
    );

    /**
     * Set completion mode.
     *
     * @param mode - Completion mode.
     * @returns This fade task.
     */
    setMode(mode: Fade.ModeType): this;

    /**
     * Set volume interpolation range.
     *
     * @param start - Starting volume value.
     * @param end - Ending volume value.
     * @returns This fade task.
     */
    setVolumeRange(
        start: number,
        end: number
    ): this;
}
