export default LZString;

declare namespace LZString {
    /**
     * Supported encoding modes.
     */
    type EncodingType = 0 | 1 | 2 | 3 | 'none' | 'base64' | 'utf16' | 'uri';

    /**
     * Configuration options for creating an LZString instance.
     */
    interface IConfig {
        /**
         * Encoding mode.
         */
        encoding?: EncodingType
    }
}

/**
 * String compression and decompression helper.
 */
declare class LZString {
    /**
     * Create an LZString instance.
     *
     * @param config - Configuration options.
     */
    constructor(
        config?: LZString.IConfig
    );

    /**
     * Compress a string.
     *
     * @param src - Source string.
     * @returns Compressed string.
     */
    compress(src: string): string;

    /**
     * Decompress a string.
     *
     * @param result - Compressed string.
     * @returns Decompressed string.
     */
    decompress(result: string): string;

    /**
     * Set the encoding mode.
     *
     * @param mode - Encoding mode.
     * @returns This LZString instance.
     */
    setEncoding(mode: LZString.EncodingType): this;

}
