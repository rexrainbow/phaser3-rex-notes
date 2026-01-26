import ComponentBase from '../../utils/componentbase/ComponentBase.js';

export default Button;

declare namespace Button {

    /**
     * Button configuration.
     */
    interface IConfig {
        /**
         * Click mode.
         */
        mode?: 0 | 1 | 'pointerdown' | 'pointerup' | 'press' | 'release',
        /**
         * Minimum interval between clicks in ms.
         */
        clickInterval?: number,
        /**
         * Drag threshold in pixels.
         */
        threshold?: number,
        /**
         * True to enable.
         */
        enable?: boolean,

        /**
         * Event emitter override or true to use game object emitter.
         */
        eventEmitter?: boolean | Phaser.Events.EventEmitter
    }

    namespace Events {
        /**
         * Click callback.
         */
        type ClickCallbackType =
            (
                /**
                 * Button component.
                 */
                button: Button,
                /**
                 * Target game object.
                 */
                gameObject: Phaser.GameObjects.GameObject,
                /**
                 * Pointer input.
                 */
                pointer: Phaser.Input.Pointer,
                /**
                 * Input event data.
                 */
                event: Phaser.Types.Input.EventData
            ) => void;

        /**
         * Enable callback.
         */
        type EnableCallbackType = (
            /**
             * Button component.
             */
            button: Button,
            /**
             * Target game object.
             */
            gameObject: Phaser.GameObjects.GameObject,
        ) => void;

        /**
         * Disable callback.
         */
        type DisableCallbackType = (
            /**
             * Button component.
             */
            button: Button,
            /**
             * Target game object.
             */
            gameObject: Phaser.GameObjects.GameObject,
        ) => void;

    }
}

/**
 * Button input component for a game object.
 */
declare class Button extends ComponentBase {
    /**
     * Create a button component.
     * @param gameObject - Target game object.
     * @param config - Button configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Button.IConfig
    );

    /**
     * Enable or disable the button.
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
     * Set click mode.
     * @param mode - Click mode.
     * @returns This instance.
     */
    setMode(
        mode?: 0 | 1 | 'pointerdown' | 'press' | 'pointerup' | 'release'
    ): this;

    /**
     * Set click interval.
     * @param interval - Interval in ms.
     * @returns This instance.
     */
    setClickInterval(interval: number): this;

    /**
     * Set drag threshold.
     * @param distance - Threshold distance in pixels.
     * @returns This instance.
     */
    setDragThreshold(distance: number): this;
}
