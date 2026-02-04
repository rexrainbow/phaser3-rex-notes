export default CSVToArray;

declare namespace CSVToArray {
    /**
     * Configuration options for parsing CSV text.
     */
    interface IConfig {
        /**
         * Delimiter character used to split columns in each row.
         */
        delimiter?: string,
        /**
         * Set to true to convert value strings to typed values when possible.
         */
        convert?: boolean
    }
}

/**
 * Parse CSV text into a 2D array of row and column values.
 *
 * @param csvString - CSV text to parse.
 * @param config - Optional parsing configuration.
 * @returns Parsed table data where each entry is a row array.
 */
declare function CSVToArray(
    csvString: string,
    config?: CSVToArray.IConfig
): any[][];
