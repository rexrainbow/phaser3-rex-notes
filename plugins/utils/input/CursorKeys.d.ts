/**
 * Cursor key collection types.
 */
declare namespace CursorKeys {
    /**
     * Cursor key map.
     */
    interface ICursorKeys {
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
    }
}

/**
 * Helper for managing virtual cursor keys.
 */
declare class CursorKeys {
    /**
     * Cursor key map.
     */
    readonly cursorKeys: CursorKeys.ICursorKeys;
    /**
     * True if no key is down.
     */
    readonly noKeyDown: boolean;
    /**
     * All registered keys by name.
     */
    keys: { [name: string]: Phaser.Input.Keyboard.Key };

    /**
     * Destroy this helper.
     */
    destroy(): void;

    /**
     * Create default cursor keys.
     *
     * @returns Cursor key map.
     */
    createCursorKeys(): CursorKeys.ICursorKeys;

    /**
     * Set key down state.
     *
     * @param keyName - Key name.
     * @param isDown - Key down state.
     * @returns This CursorKeys instance.
     */
    setKeyState(keyName: string, isDown: boolean): this;

    /**
     * Clear all key states.
     *
     * @returns This CursorKeys instance.
     */
    clearAllKeysState(): this;

    /**
     * Get a key state by name.
     *
     * @param keyName - Key name.
     * @returns Keyboard key object.
     */
    getKeyState(keyName: string): Phaser.Input.Keyboard.Key;

    /**
     * True if up key is down.
     */
    readonly upKeyDown: boolean;
    /**
     * True if down key is down.
     */
    readonly downKeyDown: boolean;
    /**
     * True if left key is down.
     */
    readonly leftKeyDown: boolean;
    /**
     * True if right key is down.
     */
    readonly rightKeyDown: boolean;
    /**
     * True if any key is down.
     */
    readonly anyKeyDown: boolean;

    /**
     * Add a key.
     *
     * @param keyName - Key name.
     * @param keyCode - Key code or key string.
     * @returns This CursorKeys instance.
     */
    addKey(
        keyName: string,
        keyCode?: number | string
    ): this;

    /**
     * Add multiple keys.
     *
     * @param keyNames - Key name list.
     * @returns This CursorKeys instance.
     */
    addKeys(keyNames: string[]): this;

}

export default CursorKeys;
