export default MouseWheelToUpDown;

declare namespace MouseWheelToUpDown {
    /**
     * MouseWheelToUpDown configuration.
     */
    interface IConfig {
        /**
         * Detection bounds.
         */
        bounds?: Phaser.Geom.Rectangle,
        /**
         * Sensitive distance in pixels.
         */
        sensitiveDistance?: number,
    }
}

/**
 * Mouse wheel to up/down input helper.
 */
declare class MouseWheelToUpDown {
    /**
     * Create a MouseWheelToUpDown helper.
     * @param scene - The Scene to which this helper belongs.
     * @param config - MouseWheelToUpDown configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: MouseWheelToUpDown.IConfig
    );

    /**
     * Enable or disable the helper.
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
     * Create cursor keys.
     * @returns Cursor key objects.
     */
    createCursorKeys(): {
        /**
         * Up key.
         */
        up: Phaser.Input.Keyboard.Key,
        /**
         * Down key.
         */
        down: Phaser.Input.Keyboard.Key,
        /**
         * Left key.
         */
        left: Phaser.Input.Keyboard.Key,
        /**
         * Right key.
         */
        right: Phaser.Input.Keyboard.Key,
    };

    /**
     * True if scrolling up.
     */
    readonly up: boolean;
    /**
     * True if scrolling down.
     */
    readonly down: boolean;
    /**
     * True if no key is active.
     */
    readonly nokey: boolean;
}
