export default FileDropZone;

declare namespace FileDropZone {

    /**
     * Callback used to test whether a dropped file passes a filter.
     */
    type FilterCallbackType = (
        /**
         * Current file under test.
         */
        file: File,
        /**
         * Full dropped file list.
         */
        files: File[]
    ) => boolean;

    /**
     * Mapping from filter names to filter callbacks.
     */
    type FiltersType = { [filterType: string]: FilterCallbackType };

    /**
     * Callback fired after loading a dropped file.
     */
    type LoadCompleteCallbackType = (
        /**
         * Loaded file data.
         */
        data: any
    ) => void;

    /**
     * Configuration options for creating a file drop zone.
     */
    interface IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Initial width.
         */
        width?: number,
        /**
         * Initial height.
         */
        height?: number,

        /**
         * Initial filter map.
         */
        filters?: FiltersType

    }
}

/**
 * DOM-based game object that accepts dragged-and-dropped files.
 */
declare class FileDropZone extends Phaser.GameObjects.DOMElement {
    /**
     * Create a file drop zone with explicit bounds.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Initial width.
     * @param height - Initial height.
     * @param config - Optional drop zone configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        config?: FileDropZone.IConfig
    );

    /**
     * Create a file drop zone with position and config.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param config - Optional drop zone configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        config?: FileDropZone.IConfig
    );

    /**
     * Create a file drop zone with config only.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional drop zone configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: FileDropZone.IConfig
    );

    /**
     * Enable or disable file dropping.
     *
     * @param enable - True to enable drop handling.
     * @returns This drop zone instance.
     */
    setDropEnable(enable?: boolean): this;
    /**
     * Toggle file dropping enabled state.
     *
     * @returns This drop zone instance.
     */
    toggleDropEnable(): this;
    /**
     * Current drop-enabled state.
     */
    dropEnable: boolean;

    /**
     * Add a named file filter.
     *
     * @param name - Filter name.
     * @param callback - Filter callback.
     * @returns This drop zone instance.
     */
    addFilter(
        name: string,
        callback: FileDropZone.FilterCallbackType
    ): this;
    /**
     * Add multiple named file filters.
     *
     * @param filters - Filter map.
     * @returns This drop zone instance.
     */
    addFilters(filters: FileDropZone.FiltersType): this;

    /**
     * Sync drop zone transform to another game object.
     *
     * @param gameObject - Target game object.
     * @returns This drop zone instance.
     */
    syncTo(gameObject: Phaser.GameObjects.GameObject): this;

    /**
     * Currently dropped files.
     */
    readonly files: File[];

    /**
     * Load a dropped file via Phaser loader.
     *
     * @param file - File object to load.
     * @param loaderType - Loader type key.
     * @param key - Cache key for loaded resource.
     * @param cacheType - Optional cache type.
     * @param onComplete - Optional callback invoked after load completes.
     * @returns This drop zone instance.
     */
    loadFile(
        file: File,
        loaderType: string,
        key: string,
        cacheType?: string,
        onComplete?: FileDropZone.LoadCompleteCallbackType
    ): this;

    /**
     * Load a dropped file and return a promise.
     *
     * @param file - File object to load.
     * @param loaderType - Loader type key.
     * @param key - Cache key for loaded resource.
     * @param cacheType - Optional cache type.
     * @returns Promise resolved with loaded data.
     */
    loadFilePromise(
        file: File,
        loaderType: string,
        key: string,
        cacheType?: string
    ): Promise<any>;
}
