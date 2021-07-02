import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';
import { IConfig as IConfigBase } from '../utils/scrollable/Scrollable';

type MaskUpdateModeTyps = 0 | 1 | 'update' | 'everyTick';

export interface CellData {
    scene: Phaser.Scene,
    width: number,
    height: number,
    item: unknown,
    index: number,

    setHeight(value: number): void;
    setWidth(value: number): void;
}

export interface IConfig extends IConfigBase {
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

export default class GridTable extends Scrollable {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    setItems(items?: unknown[]): this;
    refresh(): this;
    updateVisibleCell(cellIndex: number): this;

    getCell(cellIndex: number): CellData;
    getCellContainer(cellIndex: number): Phaser.GameObjects.GameObject | null;
}