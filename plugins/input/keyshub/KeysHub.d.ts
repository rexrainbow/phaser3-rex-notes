import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace KeysHub {
    /**
     * Key object with optional name.
     */
    interface IKey extends Phaser.Input.Keyboard.Key {
        /**
         * Key name.
         */
        key?: string,
    }

    /**
     * KeysHub configuration.
     */
    interface IConfig {
        /**
         * True to use single mode.
         */
        singleMode?: boolean
    }
}

/**
 * Keyboard key hub helper.
 */
declare class KeysHub extends ComponentBase {
    /**
     * Create a KeysHub.
     * @param parent - Scene instance.
     * @param config - KeysHub configuration.
     */
    constructor(
        parent: Phaser.Scene,
        config?: KeysHub.IConfig
    );

    /**
     * True if exclude mode is enabled.
     */
    readonly excludeMode: boolean;

    /**
     * Plug a key object.
     * @param keyObject - Key object.
     * @param key - Optional key name.
     * @returns This instance.
     */
    plugKeyObject(
        keyObject: Phaser.Input.Keyboard.Key,
        key?: string
    ): this;

    /**
     * Plug key objects.
     * @param keys - Key objects array or map.
     * @returns This instance.
     */
    plugKeyObjects(
        keys: Phaser.Input.Keyboard.Key[] | { key: [keyObject: Phaser.Input.Keyboard.Key] }
    ): this;

    /**
     * Unplug a key object.
     * @param keyObject - Key object.
     * @returns This instance.
     */
    unplugKeyObject(
        keyObject: Phaser.Input.Keyboard.Key
    ): this;

    /**
     * Unplug key objects.
     * @param keys - Key objects array or map.
     * @returns This instance.
     */
    unplugKeyObjects(
        keys: Phaser.Input.Keyboard.Key[] | { key: [keyObject: Phaser.Input.Keyboard.Key] }
    ): this;

    /**
     * Add a key by name.
     * @param key - Key name.
     * @returns Key object.
     */
    addKey(key: string): Phaser.Input.Keyboard.Key;

    /**
     * Add multiple keys by names.
     * @param keys - Key names.
     * @returns Key objects map.
     */
    addKeys(
        keys: string
    ): {
        key: [
            keyObject: Phaser.Input.Keyboard.Key
        ]
    };

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
     * Get all key objects.
     * @returns Key objects map.
     */
    getKeyObjects(
    ): {
        key: [
            keyObject: KeysHub.IKey[] | KeysHub.IKey
        ]
    };

    /**
     * Get key objects by name.
     * @param key - Key name.
     * @returns Key objects.
     */
    getKeyObjects(
        key: string
    ): KeysHub.IKey[];

    /**
     * Start defining a key.
     * @param key - Key name.
     * @returns This instance.
     */
    defineKeyStart(
        key: string
    ): this;

    /**
     * Stop defining a key.
     * @param keyObject - Key object.
     * @returns This instance.
     */
    defineKeyStop(
        keyObject?: Phaser.Input.Keyboard.Key
    ): this;

    /**
     * Cancel key definition.
     * @returns This instance.
     */
    defineKeyCancel(): this;

    /**
     * Listen for keyboard input.
     * @returns This instance.
     */
    listenFromKeyboard(): this;

}

export default KeysHub;
