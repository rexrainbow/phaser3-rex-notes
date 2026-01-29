export default CursorAtBounds;

declare namespace CursorAtBounds {
    /**
     * CursorAtBounds configuration.
     */
    interface IConfig {
        /**
         * True to enable.
         */
        enable?: boolean,
        /**
         * Bounds rectangle.
         */
        bounds?: Phaser.Geom.Rectangle,
        /**
         * Sensitive distance in pixels.
         */
        sensitiveDistance?: number,
        /**
         * True to release when pointer is out of game.
         */
        pointerOutGameRelease?: boolean,
        /**
         * True to release when pointer is out of bounds.
         */
        pointerOutBoundsRelease?: boolean,
    }
}

/**
 * Cursor input helper based on pointer bounds.
 */
declare class CursorAtBounds {
    /**
     * Create a cursor-at-bounds helper.
     * @param scene - The Scene to which this helper belongs.
     * @param config - CursorAtBounds configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: CursorAtBounds.IConfig
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
     * Set bounds rectangle.
     * @param bounds - Bounds rectangle.
     * @returns This instance.
     */
    setBounds(bounds: Phaser.Geom.Rectangle): this;
    /**
     * Get bounds rectangle.
     * @returns Bounds rectangle.
     */
    getBounds(): Phaser.Geom.Rectangle;
    /**
     * Bounds rectangle.
     */
    bounds: Phaser.Geom.Rectangle;

    /**
     * Set sensitive distance.
     * @param distance - Distance in pixels.
     * @returns This instance.
     */
    setSensitiveDistance(distance: number): this;
    /**
     * Sensitive distance in pixels.
     */
    sensitiveDistance: number;

    /**
     * Create cursor keys from pointer bounds.
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
     * True if pointer is on the left.
     */
    readonly left: boolean;
    /**
     * True if pointer is on the right.
     */
    readonly right: boolean;
    /**
     * True if pointer is on the top.
     */
    readonly up: boolean;
    /**
     * True if pointer is on the bottom.
     */
    readonly down: boolean;
    /**
     * True if no direction is active.
     */
    readonly nokey: boolean;
}
