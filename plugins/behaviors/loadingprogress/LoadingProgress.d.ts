export default LoadingProgress;

declare namespace LoadingProgress {
    /**
     * Progress callback.
     */
    type ProgressCallbackType = (
        /**
         * Target game object.
         */
        gameObject: Phaser.GameObjects.GameObject,
        /**
         * Progress value.
         */
        progress: number
    ) => void;

    /**
     * Transition callback.
     */
    type TransitCallbackType = (
        /**
         * Target game object.
         */
        gameObject: Phaser.GameObjects.GameObject,
        /**
         * Duration in ms.
         */
        duration: number
    ) => void;

    /**
     * LoadingProgress configuration.
     */
    interface IConfig {
        /**
         * Transition durations.
         */
        duration?: {
            /**
             * Duration for transit in.
             */
            in?: number,
            /**
             * Duration for transit out.
             */
            out?: number,
        },

        /**
         * Progress callback.
         */
        progress?: ProgressCallbackType,

        /**
         * Transit in callback.
         */
        transitIn?: TransitCallbackType,

        /**
         * Transit out callback.
         */
        transitOut?: TransitCallbackType,
    }
}

/**
 * Loading progress behavior for a game object.
 */
declare class LoadingProgress extends Phaser.Events.EventEmitter {
    /**
     * Create a LoadingProgress behavior.
     * @param gameObject - Target game object.
     * @param config - LoadingProgress configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: LoadingProgress.IConfig
    );
}
