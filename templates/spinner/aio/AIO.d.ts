import Base from '../base/Base';

declare namespace AIO {
    /**
     * Animation mode names for the spinner.
     */
    type AnimationModeType = 'arrow' | 'audio' | 'ball' | 'bars' | 'box' | 'clock' |
        'cube' | 'dots' | 'facebook' | 'grid' | 'hearts' | 'ios' | 'oribit' | 'oval' |
        'pie' | 'puff' | 'radio' | 'rings' | 'spinner';

    /**
     * Direction values for the animation.
     */
    type DirectionType = 0 | 'right' | 1 | 'down' | 2 | 'left' | 3 | 'up';

    /**
     * Reset configuration for AIO.
     */
    interface IResetFromConfig extends Base.IResetFromConfig {
        /**
         * Direction for the animation.
         */
        direction?: DirectionType
    }

    /**
     * Configuration options for creating an AIO spinner.
     */
    interface IConfig extends Base.IConfig {
        /**
         * Initial animation mode.
         */
        animationMode?: AnimationModeType,
    }
}

/**
 * Spinner that can switch between multiple animation modes.
 */
declare class AIO extends Base {
    /**
     * Create an AIO spinner.
     *
     * @param scene - The Phaser.Scene that owns this spinner.
     * @param config - Configuration options for the spinner.
     */
    constructor(
        scene: Phaser.Scene,
        config?: AIO.IConfig
    )

    /**
     * Set the animation mode.
     *
     * @param mode - The animation mode to use.
     * @param config - Reset configuration.
     * @returns This AIO instance.
     */
    setAnimationMode(
        mode?: AIO.AnimationModeType,
        config?: AIO.IResetFromConfig
    ): this;

    /**
     * Pick a random animation mode.
     *
     * @param config - Reset configuration.
     * @returns This AIO instance.
     */
    setRandomAnimationMode(
        config?: AIO.IResetFromConfig
    ): this;

    /**
     * Current animation mode.
     */
    animationMode: AIO.AnimationModeType;
}

export default AIO;
