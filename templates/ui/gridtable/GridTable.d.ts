// import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';
import GridTableCore from '../../../plugins/gridtable'

export default GridTable;

declare namespace GridTable {

    /**
     * Interface of Cell
     */
    interface ICell extends GridTableCore.Cell {
        /** Item data associated with this cell. */
        item: unknown,
        /** Full items array backing the grid table. */
        items: unknown[],
        /** Owning grid table instance. */
        gridTable: GridTable,
    }

    /**
     * Callback to create or update a cell container.
     * @param cell - Cell data.
     * @param cellContainer - Existing cell container.
     * @returns The created or updated container.
     */
    type CreateCellContainerCallbackType = (
        cell: ICell,
        cellContainer: Phaser.GameObjects.GameObject | null,
        gridTable: GridTable,
    ) => Phaser.GameObjects.GameObject | null;

    interface IConfig extends Scrollable.IConfig {
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
             * Table padding or spacing.
             */
            table?: number | {
                /**
                 * Left table padding.
                 */
                left?: number,
                /**
                 * Right table padding.
                 */
                right?: number,
                /**
                 * Top table padding.
                 */
                top?: number,
                /**
                 * Bottom table padding.
                 */
                bottom?: number,
            },

            /**
             * Horizontal slider spacing.
             */
            sliderX?: number,
            /**
             * Vertical slider spacing.
             */
            sliderY?: number,
            /**
             * Header spacing.
             */
            header?: number,
            /**
             * Footer spacing.
             */
            footer?: number,
        },

        /**
         * Scroll mode for the table.
         */
        scrollMode?: GridTableCore.ScrollModeType,

        /**
         * Table configuration.
         */
        table?: {
            /**
             * Table width.
             */
            width?: number | undefined,
            /**
             * Table height.
             */
            height?: number | undefined,

            /**
             * Cell width.
             */
            cellWidth?: number | undefined,
            /**
             * Cell height.
             */
            cellHeight?: number | undefined,
            /**
             * Column count.
             */
            columns?: number,
            /**
             * Mask configuration.
             */
            mask?: GridTableCore.MaskConfig,
            /**
             * True to enable cell interaction.
             */
            interactive?: boolean,
            /**
             * True to reuse cell containers.
             */
            reuseCellContainer?: boolean,
            /**
             * True to enable layer support.
             */
            enableLayer?: boolean,
        },

        /**
         * Callback to create cell containers.
         */
        createCellContainerCallback: CreateCellContainerCallbackType,

        /**
         * Initial items array.
         */
        items?: unknown[]
    }

}

/**
 * Scrollable grid table built on Scrollable and grid table core.
 */
declare class GridTable extends Scrollable {
    /**
     * Create a grid table.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: GridTable.IConfig
    );

    /**
     * Set the items array.
     * @param items - Items to render.
     * @returns This instance.
     */
    setItems(items?: unknown[]): this;
    /**
     * Current items array.
     */
    items: unknown[];

    /**
     * Refresh visible cells.
     * @returns This instance.
     */
    refresh(): this;
    /**
     * Update a visible cell by index.
     * @param cellIndex - Cell index.
     * @returns This instance.
     */
    updateVisibleCell(cellIndex: number): this;

    /**
     * Get a cell by index.
     * @param cellIndex - Cell index.
     * @returns The cell.
     */
    getCell(cellIndex: number): GridTableCore.Cell;
    /**
     * Get a cell container by index.
     * @param cellIndex - Cell index.
     * @returns The cell container or null.
     */
    getCellContainer(cellIndex: number): Phaser.GameObjects.GameObject | null;

    /**
     * Get all cell containers.
     *
     * @param out - Optional array to receive the containers.
     * @returns The array of cell containers.
     */
    getAllCellContainers(out?: Phaser.GameObjects.GameObject[]): Phaser.GameObjects.GameObject[];
    /**
     * Current start row index.
     */
    startRowIndex: number;

    /**
     * Reset all cell sizes.
     * @param width - Width value.
     * @param height - Height value.
     * @returns This instance.
     */
    resetAllCellsSize(width: number, height: number): this;
    /**
     * Measure a reference cell container from a cell, then reset all cell sizes.
     * @param cellIndex - Cell index used to build the reference container.
     * @returns This instance.
     */
    resetCellSizeFromCell(cellIndex?: number): this;

    /**
     * Scroll to a row.
     * @param rowIndex - Row index.
     * @returns This instance.
     */
    scrollToRow(rowIndex: number): this;
    /**
     * Scroll to the next row.
     * @param rowCount - Row count to move.
     * @returns This instance.
     */
    scrollToNextRow(rowCount?: number): this;
}
