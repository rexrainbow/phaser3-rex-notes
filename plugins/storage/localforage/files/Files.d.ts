export default Files;

declare namespace Files {
    /**
     * Configuration options for creating a Files instance.
     */
    interface IConfig {
        /**
         * Storage namespace name.
         */
        name?: string;
        /**
         * Enable zip compression.
         */
        zip?: boolean;
    }

    /**
     * Base file data shape.
     */
    interface IBaseData {
        /**
         * File id.
         */
        fileID?: string;

        /**
         * Other custom properties.
         */
        [name: string]: unknown;
    }

    /**
     * File header data.
     */
    interface IHeader extends IBaseData { }

    /**
     * File content data.
     */
    interface IContent extends IBaseData { }
}

/**
 * LocalForage-backed file storage helper.
 */
declare class Files {
    /**
     * Create a Files instance.
     *
     * @param config - Configuration options.
     */
    constructor(
        config: Files.IConfig
    );

    /**
     * Save file header and content.
     *
     * @param fileID - File id.
     * @param header - Header data.
     * @param content - Content data.
     * @param updateMode - Merge with existing data.
     * @returns Promise with saved file id.
     */
    save(
        fileID: string,
        header?: Files.IHeader,
        content?: Files.IContent,
        updateMode?: boolean
    ): Promise<
        { fileID: string }
    >;

    /**
     * Load all file headers.
     *
     * @returns Promise with header map keyed by file id.
     */
    loadHeaders(
    ): Promise<
        {
            headers: { [fileID: string]: Files.IHeader }
        }
    >;

    /**
     * Load a file by id.
     *
     * @param fileID - File id.
     * @returns Promise with file id, header, and content.
     */
    load(
        fileID: string
    ): Promise<
        {
            fileID: string,
            header: Files.IHeader,
            content: Files.IContent
        }
    >;
}
