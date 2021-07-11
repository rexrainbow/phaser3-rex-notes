// import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';

export default GridTable;

declare namespace GridTable {

    type MaskUpdateModeTyps = 0 | 1 | 'update' | 'everyTick';

    interface CellData {
        scene: Phaser.Scene,
        width: number,
        height: number,
        item: unknown,
        index: number,

        setHeight(value: number): void;
        setWidth(value: number): void;
    }

    interface IConfig extends Scrollable.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            table?: number | {
                left?: number, right?: number, top?: number, bottom?: number,
            },

            header?: number,
            footer?: number,
        },

        table: {
            width?: number | undefined,
            height?: number | undefined,

            cellWidth?: number | undefined,
            cellHeight?: number | undefined,
            columns?: number,
            mask?: (
                {
                    padding?: number,
                    updateMode?: MaskUpdateModeTyps
                } |
                boolean
            ),
            interactive?: boolean,
            reuseCellContainer?: boolean,
        },

        createCellContainerCallback: (
            (cell: CellData, cellContainer: Phaser.GameObjects.GameObject | null)
                => Phaser.GameObjects.GameObject | null
        ),

        items: unknown[]
    }

}

declare class GridTable extends Scrollable {
    constructor(
        scene: Phaser.Scene,
        config?: GridTable.IConfig
    );

    setItems(items?: unknown[]): this;
    refresh(): this;
    updateVisibleCell(cellIndex: number): this;

    getCell(cellIndex: number): GridTable.CellData;
    getCellContainer(cellIndex: number): Phaser.GameObjects.GameObject | null;
}