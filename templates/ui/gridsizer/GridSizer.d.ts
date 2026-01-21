// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js';
import GetBoundsConfig from '../../../plugins/utils/bounds/GetBoundsConfig.js';

export default GridSizer;

declare namespace GridSizer {
    /**
     * Alignment values for grid cells.
     */
    type AlignTypes = number | 'center' | 'left' | 'right' | 'top' | 'bottom' |
        'left-top' | 'left-center' | 'left-bottom' |
        'center-top' | 'center-center' | 'center-bottom' |
        'right-top' | 'right-center' | 'right-bottom';
    /**
     * Padding types used for children.
     */
    type PaddingTypes = GetBoundsConfig.PaddingConfigType;

    /**
     * Callback to create a container for a grid cell.
     * @param scene - The Scene to which this object belongs.
     * @param x - Cell x position.
     * @param y - Cell y position.
     * @param config - Cell configuration.
     */
    type CreateCellContainerCallbackType = (
        scene: Phaser.Scene,
        x: number, y: number,
        config: {
            /**
             * Column index.
             */
            column?: number,
            /**
             * Row index.
             */
            row?: number,

            /**
             * Alignment for the cell.
             */
            align?: GridSizer.AlignTypes,
            /**
             * Padding for the cell.
             */
            padding?: GridSizer.PaddingTypes,
            /**
             * True to expand the cell.
             */
            expand?: boolean,
            /**
             * Optional key to register the cell.
             */
            key?: string
        }
    ) => Phaser.GameObjects.GameObject;

    interface IConfig extends BaseSizer.IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Initial width.
         */
        width?: number,
        /**
         * Initial height.
         */
        height?: number,

        /**
         * Column count.
         */
        column?: number,
        /**
         * Row count.
         */
        row?: number,

        /**
         * Column proportions.
         */
        columnProportions?: number | number[],
        /**
         * Row proportions.
         */
        rowProportions?: number | number[],

        /**
         * Spacing configuration.
         */
        space?: {
            /**
             * Left space.
             */
            left?: number,
            /**
             * Right space.
             */
            right?: number,
            /**
             * Top space.
             */
            top?: number,
            /**
             * Bottom space.
             */
            bottom?: number,

            /**
             * Column spacing.
             */
            column?: number | number[],
            /**
             * Row spacing.
             */
            row?: number | number[],

            /**
             * Indent left for odd rows.
             */
            indentLeftOdd?: number,
            /**
             * Indent left for even rows.
             */
            indentLeftEven?: number,
            /**
             * Indent top for odd rows.
             */
            indentTopOdd?: number,
            /**
             * Indent top for even rows.
             */
            indentTopEven?: number,
        },

        /**
         * Callback to create a container for each cell.
         */
        createCellContainerCallback?: CreateCellContainerCallbackType
    }

    interface IAddConfig {
        /**
         * Column index.
         */
        column?: number | undefined,
        /**
         * Row index or true to auto-place.
         */
        row?: number | undefined | true,
        /**
         * Alignment for the child.
         */
        align?: GridSizer.AlignTypes,
        /**
         * Padding around the child.
         */
        padding?: GridSizer.PaddingTypes,
        /**
         * Expand settings.
         */
        expand?: boolean |
        {
            /**
             * Expand width.
             */
            width?: boolean,
            /**
             * Expand height.
             */
            height?: boolean,
        },
        /**
         * Optional key to register the child.
         */
        key?: string,
        /**
         * Local x offset.
         */
        offsetX?: number,
        /**
         * Local y offset.
         */
        offsetY?: number,
        /**
         * Origin x offset.
         */
        offsetOriginX?: number,
        /**
         * Origin y offset.
         */
        offsetOriginY?: number,
    }

}


/**
 * Grid-based sizer with fixed rows and columns.
 */
declare class GridSizer extends BaseSizer {
    /**
     * Children stored by grid index.
     */
    sizerChildren: (Phaser.GameObjects.GameObject | null)[];

    /**
     * Create a grid sizer with config only.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: GridSizer.IConfig
    );

    /**
     * Create a grid sizer at a position.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the sizer.
     * @param y - The y position of the sizer.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: GridSizer.IConfig
    );

    /**
     * Create a sized grid sizer at a position.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the sizer.
     * @param y - The y position of the sizer.
     * @param width - The width of the sizer.
     * @param height - The height of the sizer.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: GridSizer.IConfig
    );

    /**
     * Create a sized grid sizer at a position with rows and columns.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the sizer.
     * @param y - The y position of the sizer.
     * @param width - The width of the sizer.
     * @param height - The height of the sizer.
     * @param column - Column count.
     * @param row - Row count.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        column: number, row: number,
        config?: GridSizer.IConfig
    );

    /**
     * Set the proportion for a column.
     * @param columnIndex - Column index.
     * @param proportion - Proportion value.
     * @returns This instance.
     */
    setColumnProportion(columnIndex: number, proportion: number): this;
    /**
     * Set the proportion for a row.
     * @param rowIndex - Row index.
     * @param proportion - Proportion value.
     * @returns This instance.
     */
    setRowProportion(rowIndex: number, proportion: number): this;

    /**
     * Add a child with config.
     * @param gameObject - The child to add.
     * @param config - Add configuration.
     * @returns This instance.
     */
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: GridSizer.IAddConfig
    ): this;

    /**
     * Add a child with individual settings.
     * @param gameObject - The child to add.
     * @param columnIndex - Column index.
     * @param rowIndex - Row index or true to auto-place.
     * @param align - Alignment for the child.
     * @param padding - Padding around the child.
     * @param expand - Expand settings.
     * @param key - Optional key to register the child.
     * @returns This instance.
     */
    add(
        gameObject: Phaser.GameObjects.GameObject,
        columnIndex?: number | undefined,
        rowIndex?: number | undefined | true,
        align?: GridSizer.AlignTypes,
        padding?: GridSizer.PaddingTypes,
        expand?: boolean |
        {
            /**
             * Expand width.
             */
            width?: boolean,
            /**
             * Expand height.
             */
            height?: boolean,
        },
        key?: string
    ): this;

    /**
     * Add multiple children with shared config.
     * @param gameObject - Children to add.
     * @param config - Add configuration.
     * @returns This instance.
     */
    addMultiple(
        gameObject: Phaser.GameObjects.GameObject[],
        config?: GridSizer.IAddConfig
    ): this;

    /**
     * Add an empty row.
     * @param proportion - Proportion value.
     * @param space - Row spacing.
     * @returns This instance.
     */
    addEmptyRow(proportion?: number, space?: number): this;
    /**
     * Add an empty column.
     * @param proportion - Proportion value.
     * @param space - Column spacing.
     * @returns This instance.
     */
    addEmptyColumn(proportion?: number, space?: number): this;

    /**
     * Insert an empty row.
     * @param rowIndex - Row index.
     * @param proportion - Proportion value.
     * @param space - Row spacing.
     * @returns This instance.
     */
    insertEmptyRow(
        rowIndex: number,
        proportion?: number, space?: number
    ): this;
    /**
     * Insert an empty column.
     * @param colIndex - Column index.
     * @param proportion - Proportion value.
     * @param space - Column spacing.
     * @returns This instance.
     */
    insertEmptyColumn(
        colIndex: number,
        proportion?: number, space?: number
    ): this;

    /**
     * Remove a child.
     * @param gameObject - The child to remove.
     * @param destroyChild - True to destroy the child.
     * @returns This instance.
     */
    remove(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Remove a child at a grid position.
     * @param columnIndex - Column index.
     * @param rowIndex - Row index.
     * @param destroyChild - True to destroy the child.
     * @returns This instance.
     */
    removeAt(
        columnIndex: number,
        rowIndex: number,
        destroyChild?: boolean
    ): this;

    /**
     * Remove all children.
     * @param destroyChild - True to destroy removed children.
     * @returns This instance.
     */
    removeAll(
        destroyChild?: boolean
    ): this;

    /**
     * Clear all children.
     * @param destroyChild - True to destroy cleared children.
     * @returns This instance.
     */
    clear(
        destroyChild?: boolean
    ): this;

    /**
     * Column count.
     */
    columnCount: number;
    /**
     * Row count.
     */
    rowCount: number;

    /**
     * Reset grid size and proportions.
     * @param column - Column count.
     * @param row - Row count.
     * @param columnProportions - Column proportions.
     * @param rowProportions - Row proportions.
     * @param space - Row and column spacing.
     * @returns This instance.
     */
    resetGrid(
        column: number, row: number,
        columnProportions?: number | number[],
        rowProportions?: number | number[],
        space?: {
            /**
             * Column spacing.
             */
            column?: number | number[],
            /**
             * Row spacing.
             */
            row?: number | number[],
        }
    ): this;

    /**
     * Sort children using a compare callback.
     * @param callback - Compare callback.
     * @returns This instance.
     */
    sortChildren(
        callback: (
            childA: Phaser.GameObjects.GameObject,
            childB: Phaser.GameObjects.GameObject
        ) => number
    ): this;

    /**
     * Sort children by a data value.
     * @param key - Data key.
     * @param descending - True to sort descending.
     * @returns This instance.
     */
    sortChildrenByData(
        key: string,
        descending?: boolean
    ): this;

    /**
     * Sort children by a property value.
     * @param key - Property name.
     * @param descending - True to sort descending.
     * @returns This instance.
     */
    sortChildrenByProperty(
        key: string,
        descending?: boolean
    ): this;

    /**
     * Get a child at a grid position.
     * @param columnIndex - Column index.
     * @param rowIndex - Row index.
     * @returns The child at the position.
     */
    getChildAt(
        columnIndex: number,
        rowIndex: number
    ): Phaser.GameObjects.GameObject;

    /**
     * Convert a child to grid indices.
     * @param child - The child to query.
     * @param out - Output object to write indices.
     * @returns The output object.
     */
    childToGridIndex(
        child: Phaser.GameObjects.GameObject,
        out: {
            /**
             * Column index.
             */
            x: number,
            /**
             * Row index.
             */
            y: number
        }
    ): { x: number, y: number };

    /**
     * Convert a child to grid indices.
     * @param child - The child to query.
     * @returns The grid indices.
     */
    childToGridIndex(
        child: Phaser.GameObjects.GameObject
    ): { x: number, y: number };

}
