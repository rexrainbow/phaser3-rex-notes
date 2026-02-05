import Click from '../click/Click';

export default FullscreenButton;

declare namespace FullscreenButton {
    /**
     * Callback type used when fullscreen state changes.
     */
    type CallbackTypes =
        string |
        {
            /**
             * Texture key to apply.
             */
            key?: string,
            /**
             * Frame name to apply.
             */
            frame?: string
        } |
        ((
            /**
             * Target game object of this button behavior.
             */
            gameObject: Phaser.GameObjects.GameObject
        ) => void);

    /**
     * Configuration options for fullscreen button behavior.
     */
    interface IConfig extends Click.IConfig {
        /**
         * Action executed when entering fullscreen.
         */
        onEnter?: CallbackTypes,
        /**
         * Action executed when leaving fullscreen.
         */
        onLeave?: CallbackTypes
    }
}

/**
 * Click behavior that toggles fullscreen and updates button appearance.
 */
declare class FullscreenButton extends Click {
    /**
     * Create a fullscreen button behavior.
     *
     * @param gameObject - Target game object.
     * @param config - Optional fullscreen button configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: FullscreenButton.IConfig
    );
}
