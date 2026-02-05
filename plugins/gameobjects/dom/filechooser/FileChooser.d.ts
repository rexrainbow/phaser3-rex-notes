export default FileChooser;

declare namespace FileChooser {

    /**
     * Configuration options for creating a file chooser.
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
         * Accepted MIME types or file extensions.
         */
        accept?: string,
        /**
         * Set to true to allow selecting multiple files.
         */
        multiple?: boolean
    }

    /**
     * Event callback types emitted by file chooser.
     */
    namespace Events {
        /**
         * Callback fired when selected file list changes.
         */
        type ValueChangeCallbackType = (
            /**
             * File chooser instance.
             */
            fileChooser: FileChooser
        ) => void;
    }

    /**
     * Callback fired after loading a selected file.
     */
    type LoadCompleteCallbackType = (
        /**
         * Loaded file data.
         */
        data: any
    ) => void;
}

/**
 * DOM-based file chooser game object.
 */
declare class FileChooser extends Phaser.GameObjects.DOMElement {
    /**
     * Create a file chooser with explicit bounds.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Initial width.
     * @param height - Initial height.
     * @param config - Optional file chooser configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        config?: FileChooser.IConfig
    );

    /**
     * Create a file chooser with position and config.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param config - Optional file chooser configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        config?: FileChooser.IConfig
    );

    /**
     * Create a file chooser with config only.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional file chooser configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: FileChooser.IConfig
    );

    /**
     * Sync file chooser transform to another game object.
     *
     * @param gameObject - Target game object.
     * @returns This file chooser instance.
     */
    syncTo(gameObject: Phaser.GameObjects.GameObject): this;

    /**
     * Currently selected files.
     */
    readonly files: File[];

    /**
     * Set accepted file types.
     *
     * @param accept - Accepted MIME types or extensions string.
     * @returns This file chooser instance.
     */
    setAccept(accept: string): this;

    /**
     * Set whether multiple file selection is allowed.
     *
     * @param multiple - True to allow selecting multiple files.
     * @returns This file chooser instance.
     */
    setMultiple(multiple?: boolean): this;

    /**
     * Load a selected file via Phaser loader.
     *
     * @param file - File object to load.
     * @param loaderType - Loader type key.
     * @param key - Cache key for loaded resource.
     * @param cacheType - Optional cache type.
     * @returns This file chooser instance.
     */
    loadFile(
        file: File,
        loaderType: string,
        key: string,
        cacheType?: string
    ): this;

    /**
     * Load a selected file via Phaser loader with completion callback.
     *
     * @param file - File object to load.
     * @param loaderType - Loader type key.
     * @param key - Cache key for loaded resource.
     * @param cacheType - Optional cache type.
     * @param onComplete - Optional callback invoked after load completes.
     * @returns This file chooser instance.
     */
    loadFile(
        file: File,
        loaderType: string,
        key: string,
        cacheType?: string,
        onComplete?: FileChooser.LoadCompleteCallbackType
    ): this;

    /**
     * Load a selected file and return a promise.
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

    /**
     * Enable or disable opening the file dialog.
     *
     * @param enable - True to enable opening.
     * @returns This file chooser instance.
     */
    setOpenEnable(
        enable?: boolean
    ): this;

}
