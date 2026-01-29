import Base from '../base/Base';

declare namespace Arrow {
    /**
     * Direction values for the arrow.
     */
    type DirectionType = 0 | 'right' | 1 | 'down' | 2 | 'left' | 3 | 'up';

    /**
     * Reset configuration for Arrow.
     */
    interface IResetFromConfig extends Base.IResetFromConfig {
        /**
         * Direction for the arrow.
         */
        direction?: DirectionType
    }

    /**
     * Configuration options for creating an Arrow spinner.
     */
    interface IConfig extends Base.IConfig, IResetFromConfig {
    }
}

/**
 * Arrow spinner component.
 */
declare class Arrow extends Base {
    /**
     * Create an Arrow spinner.
     *
     * @param scene - The Phaser.Scene that owns this spinner.
     * @param config - Configuration options for the spinner.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Arrow.IConfig
    )

    /**
     * Set the arrow direction.
     *
     * @param direction - The direction value.
     * @returns This Arrow instance.
     */
    setDirection(direction?: Arrow.DirectionType): this;

    /**
     * Reset from configuration values.
     *
     * @param config - Reset configuration.
     * @param setDefaults - Whether to apply defaults.
     * @returns This Arrow instance.
     */
    resetFromConfig(
        config?: Arrow.IResetFromConfig,
        setDefaults?: boolean
    ): this;

}

export default Arrow;
