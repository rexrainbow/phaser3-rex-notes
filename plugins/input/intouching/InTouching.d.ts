import ComponentBase from '../../utils/componentbase/ComponentBase';

export default InTouching;

declare namespace InTouching {

    /**
     * InTouching configuration.
     */
    interface IConfig {
        /**
         * True to enable.
         */
        enable?: boolean,
        /**
         * Cooldown time in ms.
         */
        cooldown?: number,
    }
}

/**
 * Touch state helper for a game object.
 */
declare class InTouching extends ComponentBase {
    /**
     * Create an InTouching component.
     * @param gameObject - Target game object.
     * @param config - InTouching configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: InTouching.IConfig
    );

    /**
     * Previous in-touch state.
     */
    prevIsInTouch: boolean;
    /**
     * Current in-touch state.
     */
    isInTouching: boolean;

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
     * Set cooldown time.
     * @param time - Cooldown time in ms.
     * @returns This instance.
     */
    setCooldown(time: number): this;
    /**
     * Cooldown time in ms.
     */
    cooldownTime: number;
}
