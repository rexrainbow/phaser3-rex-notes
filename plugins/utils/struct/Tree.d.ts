export default Tree;

declare namespace Tree {
    /**
     * Tree data object type.
     */
    type DataType = Record<string, unknown>;
}
/**
 * Utility for nested key-path data access.
 */
declare class Tree {
    /**
     * Create a Tree instance.
     *
     * @param data - Initial tree data.
     */
    constructor(data?: Tree.DataType);

    /**
     * Get full path string from key path.
     *
     * @param keys - Key path string.
     * @returns Full path string.
     */
    getFullPath(keys?: string): string;
    /**
     * Get full path array from key path list.
     *
     * @param keys - Key path list.
     * @returns Full path list.
     */
    getFullPath(keys?: string[]): string[];

    /**
     * Set reference path.
     *
     * @param keys - Key path string.
     * @returns This Tree instance.
     */
    setRefPath(keys?: string): this;

    /**
     * Set value by key path.
     *
     * @param keys - Key path string.
     * @param value - Value to set.
     * @returns This Tree instance.
     */
    setValue(keys: string, value: any): this;
    /**
     * Set values from data object.
     *
     * @param data - Data object.
     * @returns This Tree instance.
     */
    setValue(data: Tree.DataType): this;
    /**
     * Reset current reference value.
     *
     * @returns This Tree instance.
     */
    setValue(): this;

    /**
     * Get value by key path.
     *
     * @param keys - Key path string or list.
     * @returns Stored value.
     */
    getValue(keys?: string | string[]): any;

    /**
     * Clone value by key path.
     *
     * @param keys - Key path string or list.
     * @returns Cloned data value.
     */
    cloneValue(keys?: string | string[]): Tree.DataType;

    /**
     * Remove key by path.
     *
     * @param keys - Key path string or list.
     * @returns This Tree instance.
     */
    removeKey(keys?: string | string[]): this;

    /**
     * Check whether a key path exists.
     *
     * @param keys - Key path string or list.
     * @returns True if the key exists.
     */
    hasKey(keys?: string | string[]): boolean;

    /**
     * Clear all tree data.
     *
     * @returns This Tree instance.
     */
    clear(): this;

    /**
     * Clone this tree.
     *
     * @param cloneData - Clone underlying data.
     * @returns Cloned Tree instance.
     */
    clone(cloneData?: boolean): Tree;

}
