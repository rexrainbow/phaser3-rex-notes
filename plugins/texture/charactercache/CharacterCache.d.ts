import EventEmitter from "../../utils/eventemitter/EventEmitter";

export default CharacterCache;

declare namespace CharacterCache {
    /**
     * Configuration options for creating a CharacterCache.
     */
    interface IConfig {
        /**
         * Texture key.
         */
        key: string,
        /**
         * Cell width.
         */
        cellWidth: number,
        /**
         * Cell height.
         */
        cellHeight: number,
        /**
         * Maximum character count.
         */
        maxCharacterCount?: number,
        /**
         * Enable frequency mode.
         */
        freqMode?: boolean,

        /**
         * Text game object to bind.
         */
        textObject?: Phaser.GameObjects.GameObject,
        /**
         * Text style configuration.
         */
        style?: Phaser.GameObjects.TextStyle,

        /**
         * Initial content string.
         */
        content?: string,

        /**
         * Event emitter instance or false to disable.
         */
        eventEmitter?: EventEmitter | false,
    }

    /**
     * Cached character data.
     */
    interface CacheData {
        /**
         * Character string.
         */
        character: string,
        /**
         * Usage frequency.
         */
        freq: number,
        /**
         * Alive flag.
         */
        alive: boolean,
        /**
         * Lock flag.
         */
        lock: boolean,
    }
}

/**
 * Cache for bitmap text characters.
 */
declare class CharacterCache extends EventEmitter {
    /**
     * Create a CharacterCache.
     *
     * @param scene - Scene or game instance.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene | Phaser.Game,
        config: CharacterCache.IConfig
    );

    /**
     * Texture key.
     */
    readonly key: string;
    /**
     * Cell width.
     */
    readonly cellWidth: number;
    /**
     * Cell height.
     */
    readonly cellHeight: number;
    /**
     * Count of cached characters.
     */
    readonly inCacheCount: number;

    /**
     * Destroy the cache.
     */
    destroy(): void;

    /**
     * Bind a text object.
     *
     * @param textObject - Text game object.
     * @returns This CharacterCache instance.
     */
    bindTextObject(
        textObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Override a bitmap text object.
     *
     * @param bitmapText - Bitmap text object.
     * @returns The overridden game object.
     */
    overrideBitmapText(
        bitmapText: Phaser.GameObjects.GameObject
    ): Phaser.GameObjects.GameObject;

    /**
     * Create a BitmapText using this cache.
     *
     * @param scene - Scene instance.
     * @param x - X position.
     * @param y - Y position.
     * @param text - Initial text.
     * @param size - Font size.
     * @param align - Alignment.
     * @returns The BitmapText instance.
     */
    addBitmapText(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        text?: string,
        size?: number,
        align?: number
    ): Phaser.GameObjects.BitmapText;

    /**
     * Create a DynamicBitmapText using this cache.
     *
     * @param scene - Scene instance.
     * @param x - X position.
     * @param y - Y position.
     * @param text - Initial text.
     * @param size - Font size.
     * @param align - Alignment.
     * @returns The DynamicBitmapText instance.
     */
    addDynamicBitmapText(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        text?: string,
        size?: number,
        align?: number
    ): Phaser.GameObjects.DynamicBitmapText;

    /**
     * Load content into the cache.
     *
     * @param content - Content string.
     * @param lock - Whether to lock the characters.
     * @returns This CharacterCache instance.
     */
    load(
        content: string,
        lock?: boolean
    ): this;

    /**
     * Unlock all cached characters.
     *
     * @returns This CharacterCache instance.
     */
    unlock(): this;

    /**
     * Get all cached data.
     *
     * @returns Cached character data list.
     */
    getAllData(
    ): CharacterCache.CacheData[];

    /**
     * Clear the cache.
     *
     * @returns This CharacterCache instance.
     */
    clear(): this;

}
