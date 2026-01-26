import ComponentBase from '../../utils/componentbase/ComponentBase';

export default TouchEventStop;

declare namespace TouchEventStop {
    /**
     * Hit area mode identifiers.
     */
    type HitAreaMode = 0 | 1 | 'default' | 'fullWindow';

    /**
     * TouchEventStop configuration.
     */
    interface IConfig {
        /**
         * Hit area mode.
         */
        hitAreaMode?: HitAreaMode,
        /**
         * True to enable.
         */
        enable?: boolean,
        /**
         * True to stop all event levels.
         */
        stopAllLevels?: boolean,
    }
}

/**
 * Touch event stop component.
 */
declare class TouchEventStop extends ComponentBase {
    /**
     * Create a TouchEventStop component.
     * @param gameObject - Target game object.
     * @param config - TouchEventStop configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TouchEventStop.IConfig
    );

    /**
     * Set hit area mode.
     * @param mode - Hit area mode.
     * @returns This instance.
     */
    setHitAreaMode(
        mode?: TouchEventStop.HitAreaMode
    ): this;

    /**
     * Enable or disable the component.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * Toggle enable state.
     * @returns This instance.
     */
    toggleEnable(): this;
    /**
     * True if enabled.
     */
    enable: boolean;

    /**
     * Set stop mode.
     * @param stopAllLevels - True to stop all levels.
     * @returns This instance.
     */
    setStopMode(stopAllLevels?: boolean): this;
}
