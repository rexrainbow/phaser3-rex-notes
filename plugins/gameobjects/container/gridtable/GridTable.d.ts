import ContainerLite from '../../container/containerlite/ContainerLite';
import { AlignType } from '../../../utils/actions/AlignType';

export default GridTable;

declare namespace GridTable {

    type ScrollModeType = 0 | 1 | 'v' | 'vertical' | 'h' | 'horizontal';

    interface Cell {
        scene: Phaser.Scene,
        width: number,
        height: number,
        deltaWidth: number,
        deltaHeight: number,
        item: unknown,
        items: unknown[],
        index: number,

        setHeight(value: number): Cell,
        setDeltaHeight(value: number): Cell,
        setWidth(value: number): Cell,
        setDeltaWidth(value: number): Cell,
        setCellContainerAlign(align: AlignType): Cell

        setContainer(cellContainer?: Phaser.GameObjects.GameObject | null): void,
        getContainer(): Phaser.GameObjects.GameObject | null,
        popContainer(): Phaser.GameObjects.GameObject | null,
        destroyContainer(): this,
    }

    type CellVisibleCallbackType = (
        cell: Cell,
        cellContainer: Phaser.GameObjects.GameObject | null,
        table: GridTable
    ) => void;

    type CellInvisibleCallbackType = (
        cell: Cell
    ) => void;

    type MaskUpdateModeType = 0 | 1 | 'update' | 'everyTick';
    type MaskConfig = {
        padding?: number | {
            left?: number, right?: number, top?: number, bottom?: number,
        },
        updateMode?: MaskUpdateModeType,

        onVisible?: (
            child: Phaser.GameObjects.GameObject,
            parent: ContainerLite
        ) => void;
        onInvisible?: (
            child: Phaser.GameObjects.GameObject,
            parent: ContainerLite
        ) => void;
        scope?: Object

    } |
        boolean;


    interface IConfig {
        cellsCount?: number,
        columns?: number,
        cellHeight?: number,
        cellWidth?: number,
        fixedCellSize?: boolean,

        cellVisibleCallback: CellVisibleCallbackType,
        cellVisibleCallbackScope?: Object,
        reuseCellContainer?: boolean,

        cellInvisibleCallback: CellInvisibleCallbackType,
        cellInvisibleCallbackScope: undefined,

        clampTableOXY?: boolean,
        startFromBottom?: boolean,
        scrollMode?: ScrollModeType,
        mask?: MaskConfig,
        enableLayer?: boolean,
    }

    namespace Events {
        type CellvisibleCallbackType = (
            cell: Cell,
            cellContainer: Phaser.GameObjects.GameObject | null,
            table: GridTable
        ) => void;

        type CellInvisibleCallbackType = (cell: Cell) => void;

        type CellHeightchange = (
            cell: Cell,
            cellContainer: Phaser.GameObjects.GameObject | null,
            table: GridTable
        ) => void;

        type CellWidthchange = (
            cell: Cell,
            cellContainer: Phaser.GameObjects.GameObject | null,
            table: GridTable
        ) => void;
    }
}

declare class GridTable extends ContainerLite {

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config: GridTable.IConfig
    );

    resize(width: number, height: number): this;

    setTableOY(oy: number): this;
    addTableOY(dy: number): this;
    setTableOX(ox: number): this;
    addTableOX(dx: number): this;
    setTableOXY(ox: number, oy: number): this;
    addTableOXY(dx: number, dy: number): this;
    tableOY: number;
    tableOX: number;

    setTableOYByPercentage(t: number): this;
    t: number;
    getTableOYPercentage(): number;
    scrollToBottom(): this;

    scrollToRow(rowIndex: number): this;
    scrollToNextRow(rowCount?: number): this;
    startRowIndex: number;

    updateTable(refresh?: boolean): this;
    updateVisibleCell(cellIdx: number): this;

    setGridSize(colCount: number, rowCount: number): this;
    setCellsCount(count: number): this;
    readonly cellsCount: number;
    readonly columnCount: number;

    readonly tableHeight: number;
    readonly tableWidth: number;

    readonly topTableOY: number;
    readonly bottomTableOY: number;
    readonly leftTableOX: number;
    readonly rightTableOX: number;

    getCell(cellIndex: number): GridTable.Cell;

    pointToCellIndex(x: number, y: number): number;

    setCellHeight(cellIndex: number, cellHeight: number): this;
    setCellWidth(cellIndex: number, cellWidth: number): this;

    resetAllCellsSize(width: number, height: number): this;

    iterateVisibleCell(
        callback: (cell: GridTable.Cell) => void
    ): this;

    eachVisibleCell(
        callback: (cell: GridTable.Cell) => void
    ): this;
}