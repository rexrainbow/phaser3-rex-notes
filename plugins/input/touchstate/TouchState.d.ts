import ComponentBase from '../../utils/componentbase/ComponentBase';

export default TouchState;

declare namespace TouchState {

    /**
     * TouchState configuration.
     */
    interface IConfig {
        /**
         * True to enable.
         */
        enable?: boolean,
    }
}

/**
 * Touch state component for a game object.
 */
declare class TouchState extends ComponentBase {
    /**
     * Create a TouchState component.
     * @param gameObject - Target game object.
     * @param config - TouchState configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TouchState.IConfig
    );

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
}
