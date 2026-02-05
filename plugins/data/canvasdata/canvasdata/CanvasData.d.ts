export default CanvasData;

declare namespace CanvasData {
    /**
     * Callback invoked for each canvas data cell during iteration.
     */
    type ForEachCallbackType = (
        /**
         * Cell value at the current coordinate.
         */
        value: number,
        /**
         * X coordinate of the current cell.
         */
        x: number,
        /**
         * Y coordinate of the current cell.
         */
        y: number,
        /**
         * Canvas data instance being iterated.
         */
        canvasData: CanvasData
    ) => void;

}

/**
 * Stores and iterates bitmap-like numeric data mapped to a 2D canvas grid.
 */
declare class CanvasData {

    /**
     * Width of this canvas data in cells.
     */
    readonly width: number;
    /**
     * Height of this canvas data in cells.
     */
    readonly height: number;

    /**
     * Release references held by this instance.
     *
     * @returns No return value.
     */
    destroy(): void;

    /**
     * Convert a 32-bit color value to an integer color representation.
     *
     * @param value - Source 32-bit color value.
     * @returns Converted integer color value.
     */
    color32ToColorInt(value: number): number;

    /**
     * Extract alpha information from a 32-bit color value.
     *
     * @param value - Source 32-bit color value.
     * @returns Alpha channel value.
     */
    color32ToAlpha(value: number): number;

    /**
     * Iterate all cells in this canvas data.
     *
     * @param callback - Function called for each cell.
     * @param scope - Optional callback execution scope.
     * @returns This canvas data instance.
     */
    forEach(
        callback: CanvasData.ForEachCallbackType,
        scope?: object
    ): this;

    /**
     * Iterate only non-zero cells in this canvas data.
     *
     * @param callback - Function called for each non-zero cell.
     * @param scope - Optional callback execution scope.
     * @returns This canvas data instance.
     */
    forEachNonZero(
        callback: CanvasData.ForEachCallbackType,
        scope?: object
    ): this;

    /**
     * Get the value at the given coordinate.
     *
     * @param x - X coordinate in the canvas data grid.
     * @param y - Y coordinate in the canvas data grid.
     * @returns Stored value at the coordinate.
     */
    get(
        x: number,
        y: number
    ): boolean | number;

}
