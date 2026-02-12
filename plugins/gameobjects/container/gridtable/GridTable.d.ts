import ContainerLite from '../../container/containerlite/ContainerLite';
import { AlignType } from '../../../utils/actions/AlignType';

export default GridTable;

declare namespace GridTable {

    /**
     * Scroll orientation values.
     */
    type ScrollModeType = 0 | 1 | 'v' | 'vertical' | 'h' | 'horizontal';

    interface Cell {
        /**
         * Scene that owns the cell.
         */
        scene: Phaser.Scene,
        /**
         * Cell width.
         */
        width: number,
        /**
         * Cell height.
         */
        height: number,
        /**
         * Extra width offset.
         */
        deltaWidth: number,
        /**
         * Extra height offset.
         */
        deltaHeight: number,
        /**
         * Current item data.
         */
        item: unknown,
        /**
         * Collection of items in this cell.
         */
        items: unknown[],
        /**
         * Cell index.
         */
        index: number,

        /**
         * Set cell height.
         * @param value - Height value.
         * @returns This cell.
         */
        setHeight(value: number): Cell,
        /**
         * Set cell delta height.
         * @param value - Delta height value.
         * @returns This cell.
         */
        setDeltaHeight(value: number): Cell,
        /**
         * Set cell width.
         * @param value - Width value.
         * @returns This cell.
         */
        setWidth(value: number): Cell,
        /**
         * Set cell delta width.
         * @param value - Delta width value.
         * @returns This cell.
         */
        setDeltaWidth(value: number): Cell,
        /**
         * Set alignment for the cell container.
         * @param align - Alignment value.
         * @returns This cell.
         */
        setCellContainerAlign(align: AlignType): Cell

        /**
         * Assign the cell container.
         * @param cellContainer - The container to assign.
         */
        setContainer(cellContainer?: Phaser.GameObjects.GameObject | null): void,
        /**
         * Get the cell container.
         * @returns The container or null.
         */
        getContainer(): Phaser.GameObjects.GameObject | null,
        /**
         * Pop and return the container.
         * @returns The container or null.
         */
        popContainer(): Phaser.GameObjects.GameObject | null,
        /**
         * Destroy the container if present.
         * @returns This cell.
         */
        destroyContainer(): this,
    }

    /**
     * Callback fired when a cell becomes visible.
     */
    type CellVisibleCallbackType = (
        cell: Cell,
        cellContainer: Phaser.GameObjects.GameObject | null,
        table: GridTable
    ) => void;

    /**
     * Callback fired when a cell becomes invisible.
     */
    type CellInvisibleCallbackType = (
        cell: Cell
    ) => void;

    /**
     * Mask update modes.
     */
    type MaskUpdateModeType = 0 | 1 | 'update' | 'everyTick';
    type MaskConfig = {
        /**
         * Mask padding.
         */
        padding?: number | {
            /**
             * Left padding.
             */
            left?: number,
            /**
             * Right padding.
             */
            right?: number,
            /**
             * Top padding.
             */
            top?: number,
            /**
             * Bottom padding.
             */
            bottom?: number,
        },
        /**
         * Mask update mode.
         */
        updateMode?: MaskUpdateModeType,

        /**
         * Callback when a child becomes visible.
         */
        onVisible?: (
            child: Phaser.GameObjects.GameObject,
            parent: ContainerLite
        ) => void;
        /**
         * Callback when a child becomes invisible.
         */
        onInvisible?: (
            child: Phaser.GameObjects.GameObject,
            parent: ContainerLite
        ) => void;
        /**
         * Callback scope.
         */
        scope?: Object

    } |
        boolean;


    interface IConfig {
        /**
         * Total number of cells.
         */
        cellsCount?: number,
        /**
         * Column count.
         */
        columns?: number,
        /**
         * Default cell height.
         */
        cellHeight?: number,
        /**
         * Default cell width.
         */
        cellWidth?: number,
        /**
         * True to lock cell size.
         */
        fixedCellSize?: boolean,

        /**
         * Callback when a cell becomes visible.
         */
        cellVisibleCallback: CellVisibleCallbackType,
        /**
         * Scope for cellVisibleCallback.
         */
        cellVisibleCallbackScope?: Object,
        /**
         * True to reuse cell containers.
         */
        reuseCellContainer?: boolean,

        /**
         * Callback when a cell becomes invisible.
         */
        cellInvisibleCallback: CellInvisibleCallbackType,
        /**
         * Scope for cellInvisibleCallback.
         */
        cellInvisibleCallbackScope: undefined,

        /**
         * True to clamp table offset within bounds.
         */
        clampTableOXY?: boolean,
        /**
         * True to start from the bottom.
         */
        startFromBottom?: boolean,
        /**
         * Scroll orientation.
         */
        scrollMode?: ScrollModeType,
        /**
         * Mask configuration.
         */
        mask?: MaskConfig,
        /**
         * True to enable layer support.
         */
        enableLayer?: boolean,
    }

    namespace Events {
        /**
         * Fired when a cell becomes visible.
         */
        type CellvisibleCallbackType = (
            cell: Cell,
            cellContainer: Phaser.GameObjects.GameObject | null,
            table: GridTable
        ) => void;

        /**
         * Fired when a cell becomes invisible.
         */
        type CellInvisibleCallbackType = (cell: Cell) => void;

        /**
         * Fired when a cell height changes.
         */
        type CellHeightchange = (
            cell: Cell,
            cellContainer: Phaser.GameObjects.GameObject | null,
            table: GridTable
        ) => void;

        /**
         * Fired when a cell width changes.
         */
        type CellWidthchange = (
            cell: Cell,
            cellContainer: Phaser.GameObjects.GameObject | null,
            table: GridTable
        ) => void;
    }
}

/**
 * Scrollable grid table container with cell recycling.
 */
declare class GridTable extends ContainerLite {

    /**
     * Create a grid table.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the table.
     * @param y - The y position of the table.
     * @param width - The width of the table.
     * @param height - The height of the table.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config: GridTable.IConfig
    );

    /**
     * Resize the table viewport.
     * @param width - New width.
     * @param height - New height.
     * @returns This instance.
     */
    resize(width: number, height: number): this;

    /**
     * Set table offset Y.
     * @param oy - Offset Y value.
     * @returns This instance.
     */
    setTableOY(oy: number): this;
    /**
     * Add to table offset Y.
     * @param dy - Delta Y value.
     * @returns This instance.
     */
    addTableOY(dy: number): this;
    /**
     * Set table offset X.
     * @param ox - Offset X value.
     * @returns This instance.
     */
    setTableOX(ox: number): this;
    /**
     * Add to table offset X.
     * @param dx - Delta X value.
     * @returns This instance.
     */
    addTableOX(dx: number): this;
    /**
     * Set table offsets.
     * @param ox - Offset X value.
     * @param oy - Offset Y value.
     * @returns This instance.
     */
    setTableOXY(ox: number, oy: number): this;
    /**
     * Add to table offsets.
     * @param dx - Delta X value.
     * @param dy - Delta Y value.
     * @returns This instance.
     */
    addTableOXY(dx: number, dy: number): this;
    /**
     * Current table offset Y.
     */
    tableOY: number;
    /**
     * Current table offset X.
     */
    tableOX: number;

    /**
     * Set table offset Y by percentage.
     * @param t - Percentage from 0 to 1.
     * @returns This instance.
     */
    setTableOYByPercentage(t: number): this;
    /**
     * Current table offset percentage.
     */
    t: number;
    /**
     * Get table offset Y percentage.
     * @returns Percentage from 0 to 1.
     */
    getTableOYPercentage(): number;
    /**
     * Scroll to the bottom.
     * @returns This instance.
     */
    scrollToBottom(): this;

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
    /**
     * Current start row index.
     */
    startRowIndex: number;

    /**
     * Update the table.
     * @param refresh - True to refresh visible cells.
     * @returns This instance.
     */
    updateTable(refresh?: boolean): this;
    /**
     * Update a visible cell by index.
     * @param cellIdx - Cell index.
     * @returns This instance.
     */
    updateVisibleCell(cellIdx: number): this;

    /**
     * Set grid size.
     * @param colCount - Column count.
     * @param rowCount - Row count.
     * @returns This instance.
     */
    setGridSize(colCount: number, rowCount: number): this;
    /**
     * Set total cell count.
     * @param count - Cell count.
     * @returns This instance.
     */
    setCellsCount(count: number): this;
    /**
     * Total cell count.
     */
    readonly cellsCount: number;
    /**
     * Column count.
     */
    readonly columnCount: number;

    /**
     * Total table height.
     */
    readonly tableHeight: number;
    /**
     * Total table width.
     */
    readonly tableWidth: number;

    /**
     * Top offset limit.
     */
    readonly topTableOY: number;
    /**
     * Bottom offset limit.
     */
    readonly bottomTableOY: number;
    /**
     * Left offset limit.
     */
    readonly leftTableOX: number;
    /**
     * Right offset limit.
     */
    readonly rightTableOX: number;

    /**
     * Get a cell by index.
     * @param cellIndex - Cell index.
     * @returns The cell.
     */
    getCell(cellIndex: number): GridTable.Cell;

    /**
     * Convert a point to cell index.
     * @param x - World x.
     * @param y - World y.
     * @returns Cell index.
     */
    pointToCellIndex(x: number, y: number): number;

    /**
     * Set a cell height.
     * @param cellIndex - Cell index.
     * @param cellHeight - Height value.
     * @returns This instance.
     */
    setCellHeight(cellIndex: number, cellHeight: number): this;
    /**
     * Set a cell width.
     * @param cellIndex - Cell index.
     * @param cellWidth - Width value.
     * @returns This instance.
     */
    setCellWidth(cellIndex: number, cellWidth: number): this;

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
     * Iterate visible cells with a callback.
     * @param callback - Callback per visible cell.
     * @returns This instance.
     */
    iterateVisibleCell(
        callback: (cell: GridTable.Cell) => void
    ): this;

    /**
     * Iterate visible cells with a callback.
     * @param callback - Callback per visible cell.
     * @returns This instance.
     */
    eachVisibleCell(
        callback: (cell: GridTable.Cell) => void
    ): this;
}
