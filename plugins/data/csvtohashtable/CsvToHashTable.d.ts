export default CsvToHashTable;

declare namespace CsvToHashTable {
    /**
     * Callback used to convert a CSV string cell value.
     */
    type ConverCallbackType = (
        /**
         * Original cell value as a string.
         */
        value: string,
        /**
         * Row key of the current cell.
         */
        rowKey: string | number,
        /**
         * Column key of the current cell.
         */
        colKey: string | number
    ) => any;

    /**
     * Callback used to provide initial data when appending rows or columns.
     */
    type AppendDataCallbackType = (
        /**
         * Current table instance.
         */
        table: CsvToHashTable,
        /**
         * Row key of the cell to initialize.
         */
        rowKey: string | number,
        /**
         * Column key of the cell to initialize.
         */
        colKey: string | number
    ) => any;

    /**
     * Built-in sort mode values.
     */
    type SortModeType = 0 | 1 | 2 | 3 | 'ascending' | 'descending' | 'logical ascending' | 'logical descending';

    /**
     * Callback used to compare two keys for sorting.
     */
    type SortCallbackType = (
        /**
         * First key to compare.
         */
        key0: string,
        /**
         * Second key to compare.
         */
        key1: string
    ) => number;

    /**
     * Callback used while iterating table data.
     */
    type EachCallbackType = (
        /**
         * Current table instance.
         */
        table: CsvToHashTable,
        /**
         * Row key of the current cell.
         */
        rowKey: string | number,
        /**
         * Column key of the current cell.
         */
        colKey: string | number,
        /**
         * Value stored in the current cell.
         */
        value: any
    ) => void;

    /**
     * Options for loading CSV text into a table.
     */
    interface ILoadConfig {
        /**
         * Delimiter character used to split columns.
         */
        delimiter?: string,
        /**
         * Enable default conversion or provide a custom conversion callback.
         */
        convert?: boolean | ConverCallbackType,
        /**
         * Scope used when invoking the conversion callback.
         */
        convertScope?: object
    }
}

/**
 * 2D data table keyed by row and column keys with CSV import helpers.
 */
declare class CsvToHashTable {
    /**
     * Create an empty table instance.
     */
    constructor();

    /**
     * Destroy this table instance.
     *
     * @returns No return value.
     */
    destroy(): void;

    /**
     * Load CSV text into this table.
     *
     * @param csvString - CSV text to parse and store.
     * @param config - Optional CSV parsing and conversion options.
     * @returns This table instance.
     */
    loadCSV(
        csvString: string,
        config?: CsvToHashTable.ILoadConfig
    ): this;

    /**
     * Convert values in a column.
     *
     * @param colKey - Target column key.
     * @param convertCallback - Conversion mode or custom conversion callback.
     * @param convertCallbackScope - Scope used when invoking the conversion callback.
     * @returns This table instance.
     */
    convertCol(
        colKey: string | number,
        convertCallback?: boolean | CsvToHashTable.ConverCallbackType,
        convertCallbackScope?: object
    ): this;

    /**
     * Convert values in a row.
     *
     * @param rowKey - Target row key.
     * @param convertCallback - Conversion mode or custom conversion callback.
     * @param convertCallbackScope - Scope used when invoking the conversion callback.
     * @returns This table instance.
     */
    convertRow(
        rowKey: string | number,
        convertCallback?: boolean | CsvToHashTable.ConverCallbackType,
        convertCallbackScope?: object
    ): this;

    /**
     * Get the value at a row and column key.
     *
     * @param rowKey - Row key of the target cell.
     * @param colKey - Column key of the target cell.
     * @returns Value stored at the target cell.
     */
    get(
        rowKey: string | number,
        colKey: string | number
    ): any;

    /**
     * Set the value at a row and column key.
     *
     * @param rowKey - Row key of the target cell.
     * @param colKey - Column key of the target cell.
     * @param value - Value to store.
     * @returns This table instance.
     */
    set(
        rowKey: string | number,
        colKey: string | number,
        value: any
    ): this;

    /**
     * Add a numeric value to an existing cell value.
     *
     * @param rowKey - Row key of the target cell.
     * @param colKey - Column key of the target cell.
     * @param value - Numeric value to add.
     * @returns This table instance.
     */
    add(
        rowKey: string | number,
        colKey: string | number,
        value: number
    ): this;

    /**
     * Check whether a row key exists.
     *
     * @param rowKey - Row key to check.
     * @returns True if the row key exists.
     */
    hasRowKey(rowKey: string | number): boolean;

    /**
     * Check whether a column key exists.
     *
     * @param colKey - Column key to check.
     * @returns True if the column key exists.
     */
    hasColKey(colKey: string | number): boolean;

    /**
     * Check whether a cell key pair exists.
     *
     * @param rowKey - Row key to check.
     * @param colKey - Column key to check.
     * @returns True if the target cell exists.
     */
    hasKey(
        rowKey: string | number,
        colKey: string | number
    ): boolean;

    /**
     * Check whether a row contains a value.
     *
     * @param rowKey - Row key to inspect.
     * @param data - Value to search for.
     * @returns True if the value is found in the row.
     */
    isValueInRol(
        rowKey: string | number,
        data: any
    ): boolean;

    /**
     * Check whether a column contains a value.
     *
     * @param colKey - Column key to inspect.
     * @param data - Value to search for.
     * @returns True if the value is found in the column.
     */
    isValueInCol(
        colKey: string | number,
        data: any
    ): boolean;

    /**
     * Clear all rows and columns.
     *
     * @returns This table instance.
     */
    clear(): this;

    /**
     * Append a column with a constant initial value.
     *
     * @param colKey - Key of the column to append.
     * @param initValue - Initial value for all cells in the new column.
     * @returns This table instance.
     */
    appendCol(
        colKey: string | number,
        initValue: any
    ): this;

    /**
     * Append a column with callback-generated initial values.
     *
     * @param colKey - Key of the column to append.
     * @param callback - Callback that generates each cell value.
     * @param scope - Optional callback execution scope.
     * @returns This table instance.
     */
    appendCol(
        colKey: string | number,
        callback: CsvToHashTable.AppendDataCallbackType,
        scope?: object
    ): this;

    /**
     * Append a row with a constant initial value.
     *
     * @param rowKey - Key of the row to append.
     * @param initValue - Initial value for all cells in the new row.
     * @returns This table instance.
     */
    appendRow(
        rowKey: string | number,
        initValue: any
    ): this;

    /**
     * Append a row with callback-generated initial values.
     *
     * @param rowKey - Key of the row to append.
     * @param callback - Callback that generates each cell value.
     * @param scope - Optional callback execution scope.
     * @returns This table instance.
     */
    appendRow(
        rowKey: string | number,
        callback: CsvToHashTable.AppendDataCallbackType,
        scope?: object
    ): this;

    /**
     * Remove a column by key.
     *
     * @param colKey - Column key to remove.
     * @returns This table instance.
     */
    removeCol(colKey: string | number): this;

    /**
     * Remove a row by key.
     *
     * @param rowKey - Row key to remove.
     * @returns This table instance.
     */
    removeRol(rowKey: string | number): this;

    /**
     * Sort rows by values in a target column.
     *
     * @param colKey - Column key used for sorting.
     * @param mode - Built-in sort mode.
     * @returns This table instance.
     */
    sortCol(
        colKey: string | number,
        mode: CsvToHashTable.SortModeType
    ): this;

    /**
     * Sort rows with a custom key comparison callback.
     *
     * @param callback - Callback used to compare row keys.
     * @param scope - Optional callback execution scope.
     * @returns This table instance.
     */
    sortCol(
        callback: CsvToHashTable.SortCallbackType,
        scope?: object
    ): this;

    /**
     * Sort columns by values in a target row.
     *
     * @param rowKey - Row key used for sorting.
     * @param mode - Built-in sort mode.
     * @returns This table instance.
     */
    sortRow(
        rowKey: string | number,
        mode: CsvToHashTable.SortModeType
    ): this;

    /**
     * Sort columns with a custom key comparison callback.
     *
     * @param callback - Callback used to compare column keys.
     * @param scope - Optional callback execution scope.
     * @returns This table instance.
     */
    sortRow(
        callback: CsvToHashTable.SortCallbackType,
        scope?: object
    ): this;

    /**
     * Iterate each column value in a row.
     *
     * @param rowKey - Row key to iterate.
     * @param callback - Callback invoked for each cell in the row.
     * @param scope - Optional callback execution scope.
     * @returns This table instance.
     */
    eachCol(
        rowKey: string | number,
        callback: CsvToHashTable.EachCallbackType,
        scope?: object
    ): this;

    /**
     * Iterate each row value in a column.
     *
     * @param colKey - Column key to iterate.
     * @param callback - Callback invoked for each cell in the column.
     * @param scope - Optional callback execution scope.
     * @returns This table instance.
     */
    eachRow(
        colKey: string | number,
        callback: CsvToHashTable.EachCallbackType,
        scope?: object
    ): this;

}
