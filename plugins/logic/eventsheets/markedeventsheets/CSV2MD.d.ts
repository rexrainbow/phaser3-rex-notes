export default CSV2MD;

/**
 * Convert CSV to marked text.
 *
 * @param csvString - CSV source string.
 * @returns Marked text string.
 */
declare function CSV2MD(csvString: string): string;

/**
 * Convert CSV to marked text with a title.
 *
 * @param csvString - CSV source string.
 * @param title - Title string.
 * @returns Marked text string.
 */
declare function CSV2MD(
    csvString: string,
    title: string
): string;

/**
 * Convert CSV to marked text with configuration.
 *
 * @param csvString - CSV source string.
 * @param config - Conversion configuration.
 * @returns Marked text string.
 */
declare function CSV2MD(
    csvString: string,
    config: {
        /**
         * Title string.
         */
        title: string
    }
): string;
