export default UniqueItemList;

declare namespace UniqueItemList {
    /**
     * Callback used to compare two items during sorting.
     */
    type SortCallbackType<ItemType = any> = (
        /**
         * First item to compare.
         */
        itemA: ItemType,
        /**
         * Second item to compare.
         */
        itemB: ItemType
    ) => number;

    /**
     * Callback used to invoke logic for each item.
     */
    type EachCallbackType<ItemType = any> = (
        /**
         * Current item in iteration order.
         */
        item: ItemType,
        /**
         * Zero-based index of the current item.
         */
        index: number
    ) => void;

    /**
     * Construction options for a unique item list.
     */
    interface IConfig {
        /**
         * Initial items added to the list.
         */
        items?: any[],
        /**
         * Set to true to remove destroyed or missing game objects automatically.
         */
        autoCleanup?: boolean,
    }
}

/**
 * Ordered list that keeps items unique.
 */
declare class UniqueItemList<ItemType = any> {
    /**
     * Create a unique item list from config options.
     *
     * @param config - Optional construction options.
     */
    constructor(
        config?: UniqueItemList.IConfig
    );

    /**
     * Create a unique item list from an initial item array.
     *
     * @param items - Optional initial items.
     */
    constructor(
        items?: any[]
    );

    /**
     * Get the first item.
     *
     * @returns First item in the list.
     */
    getFirst(): ItemType;

    /**
     * Get the last item.
     *
     * @returns Last item in the list.
     */
    getLast(): ItemType;

    /**
     * Get an item by index.
     *
     * @param index - Zero-based item index.
     * @returns Item at the given index.
     */
    get(index: number): ItemType;

    /**
     * Get a random item.
     *
     * @returns Randomly selected item.
     */
    getRandom(): ItemType;

    /**
     * Get internal item array reference.
     *
     * @returns Internal item array.
     */
    getItems(): ItemType[];

    /**
     * Clone current items into a new array.
     *
     * @returns New array containing the current items.
     */
    cloneItems(): ItemType[];

    /**
     * Number of items in this list.
     */
    readonly length: number;

    /**
     * Check whether this list has no items.
     *
     * @returns True if the list is empty.
     */
    isEmpty(): boolean;

    /**
     * Check whether an item exists in this list.
     *
     * @param item - Item to find.
     * @returns True if the item exists.
     */
    contains(item: ItemType): boolean;

    /**
     * Check whether any item in another list exists in this list.
     *
     * @param listB - List to compare.
     * @returns True if at least one item overlaps.
     */
    any(listB: UniqueItemList): boolean;

    /**
     * Check whether all items in another list exist in this list.
     *
     * @param listB - List to compare.
     * @returns True if all items overlap.
     */
    all(listB: UniqueItemList): boolean;

    /**
     * Add an item at an optional index.
     *
     * @param item - Item to add.
     * @param index - Optional insertion index.
     * @param moveToNewPosition - Set to true to move existing item to the new index.
     * @returns This list instance.
     */
    add(
        item: ItemType,
        index?: number,
        moveToNewPosition?: boolean
    ): this;

    /**
     * Add an item to the end of the list.
     *
     * @param item - Item to add.
     * @returns This list instance.
     */
    addLast(item: ItemType): this;

    /**
     * Add an item to the beginning of the list.
     *
     * @param item - Item to add.
     * @returns This list instance.
     */
    addFirst(item: ItemType): this;

    /**
     * Add multiple items to the list.
     *
     * @param items - Items to add.
     * @returns This list instance.
     */
    addMultiple(items: ItemType[]): this;

    /**
     * Clone this list.
     *
     * @param out - Optional output list to receive cloned items.
     * @returns Cloned list.
     */
    clone(out?: UniqueItemList): UniqueItemList;

    /**
     * Remove an item by value.
     *
     * @param item - Item to remove.
     * @returns This list instance.
     */
    remove(item: ItemType): this;

    /**
     * Remove an item by index when item value is not provided.
     *
     * @param item - Placeholder value used to select this overload.
     * @param index - Index of item to remove.
     * @returns This list instance.
     */
    remove(
        item: undefined | null | false,
        index: number
    ): this;

    /**
     * Remove the first item.
     *
     * @returns This list instance.
     */
    removeFirst(): this;

    /**
     * Remove the last item.
     *
     * @returns This list instance.
     */
    removeLast(): this;

    /**
     * Remove multiple items.
     *
     * @param items - Items to remove.
     * @returns This list instance.
     */
    removeMultiple(items: ItemType[]): this;

    /**
     * Clear all items.
     *
     * @param destroyItems - Set to true to destroy item objects if supported.
     * @returns This list instance.
     */
    clear(destroyItems?: boolean): this;

    /**
     * Remove and return an item by index.
     *
     * @param index - Optional index, defaults to the last item.
     * @returns Removed item.
     */
    pop(index?: number): ItemType;

    /**
     * Remove and return the first item.
     *
     * @returns Removed item.
     */
    popFirst(): ItemType;

    /**
     * Remove and return the last item.
     *
     * @returns Removed item.
     */
    popLast(): ItemType;

    /**
     * Remove and return a random item.
     *
     * @returns Removed item.
     */
    popRandom(): ItemType;

    /**
     * Slice a range of items into another list.
     *
     * @param startIndex - Inclusive start index.
     * @param endIndex - Exclusive end index.
     * @param out - Optional output list.
     * @returns Result list containing the sliced items.
     */
    slice(
        startIndex: number,
        endIndex: number,
        out?: UniqueItemList
    ): UniqueItemList;

    /**
     * Sort items with a custom comparison callback.
     *
     * @param callback - Comparison callback for sorting.
     * @returns This list instance.
     */
    sort(
        callback: UniqueItemList.SortCallbackType<ItemType>
    ): this;

    /**
     * Reverse item order.
     *
     * @returns This list instance.
     */
    reverse(): this;

    /**
     * Shuffle item order.
     *
     * @returns This list instance.
     */
    shuffle(): this;

    /**
     * Compute union with another list.
     *
     * @param listB - List to union with.
     * @param out - Optional output list.
     * @returns Union result list.
     */
    union(
        listB: UniqueItemList,
        out?: UniqueItemList
    ): UniqueItemList;

    /**
     * Compute intersection with another list.
     *
     * @param listB - List to intersect with.
     * @param out - Optional output list.
     * @returns Intersection result list.
     */
    intersect(
        listB: UniqueItemList,
        out?: UniqueItemList
    ): UniqueItemList;

    /**
     * Compute difference with another list.
     *
     * @param listB - List to diff against.
     * @param out - Optional output list.
     * @returns Difference result list.
     */
    difference(
        listB: UniqueItemList,
        out?: UniqueItemList
    ): UniqueItemList;

    /**
     * Invoke a callback for each item.
     *
     * @param callback - Callback invoked for each item.
     * @param scope - Optional callback execution scope.
     * @returns This list instance.
     */
    call(
        callback: UniqueItemList.EachCallbackType<ItemType>,
        scope?: object
    ): this;

    /**
     * Invoke a named method on each item with the provided arguments.
     *
     * @param fnName - Method name to invoke on each item.
     * @param args - Arguments passed to each method call.
     * @returns This list instance.
     */
    call(
        fnName: string,
        ...args: any
    ): this;

}
