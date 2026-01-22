export default DataMethods;

/**
 * Mixin class providing simple key-value data storage helpers.
 */
declare class DataMethods {
    /**
     * Set a data value.
     * @param key - Data key.
     * @param value - Data value.
     * @returns This instance.
     */
    setData(
        key: string,
        value: any
    ): this;
    /**
     * Set multiple data values.
     * @param data - Key-value map.
     * @returns This instance.
     */
    setData(
        data: { [key: string]: any }
    ): this;

    /**
     * Get a data value.
     * @param key - Data key.
     * @param defaultValue - Default value if missing.
     * @returns The data value.
     */
    getData(
        key: string,
        defaultValue?: any
    ): any;
    /**
     * Get all data values.
     * @returns Data map.
     */
    getData(): { [key: string]: any }

    /**
     * Increment a numeric data value.
     * @param key - Data key.
     * @param inc - Increment value.
     * @param defaultValue - Default value if missing.
     * @returns This instance.
     */
    incData(
        key: string,
        inc: number,
        defaultValue: number
    ): this;

    /**
     * Multiply a numeric data value.
     * @param key - Data key.
     * @param mul - Multiply value.
     * @param defaultValue - Default value if missing.
     * @returns This instance.
     */
    mulData(
        key: string,
        mul: number,
        defaultValue: number
    ): this;

    /**
     * Clear all data values.
     * @returns This instance.
     */
    clearData(): this;
}
