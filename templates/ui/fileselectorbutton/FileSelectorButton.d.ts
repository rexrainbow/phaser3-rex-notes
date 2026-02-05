import Label from '../label/Label';

export default FileSelectorButton;

declare namespace FileSelectorButton {
    /**
     * Callback fired after loading a selected file.
     */
    type LoadCompleteCallbackType = (
        /**
         * Loaded file data.
         */
        data: any
    ) => void;

    /**
     * Configuration options for creating a file selector button.
     */
    interface IConfig extends Label.IConfig {
        /**
         * Accepted MIME types or file extensions.
         */
        accept?: string,
        /**
         * Set to true to allow selecting multiple files.
         */
        multiple?: boolean,
    }
}

/**
 * Label-based button that opens file chooser dialog and loads selected files.
 */
declare class FileSelectorButton extends Label {
    /**
     * Create a file selector button.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional file selector configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: FileSelectorButton.IConfig
    );

    /**
     * Currently selected files.
     */
    readonly files: File[];

    /**
     * Set accepted file types.
     *
     * @param accept - Accepted MIME types or extensions string.
     * @returns This component instance.
     */
    setAccept(accept: string): this;

    /**
     * Set whether multiple file selection is allowed.
     *
     * @param multiple - True to allow selecting multiple files.
     * @returns This component instance.
     */
    setMultiple(multiple?: boolean): this;

    /**
     * Load a selected file via Phaser loader.
     *
     * @param file - File object to load.
     * @param loaderType - Loader type key.
     * @param key - Cache key for loaded resource.
     * @param cacheType - Optional cache type.
     * @returns This component instance.
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
     * @returns This component instance.
     */
    loadFile(
        file: File,
        loaderType: string,
        key: string,
        cacheType?: string,
        onComplete?: FileSelectorButton.LoadCompleteCallbackType
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
}
