// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js';
import { IConfig as IConfigBase } from '../basesizer/BaseSizer';

type AlignTypes = number | 'center' | 'left' | 'right' | 'top' | 'bottom' |
    'left-top' | 'left-center' | 'left-bottom' |
    'center-top' | 'center-center' | 'center-bottom' |
    'right-top' | 'right-center' | 'right-bottom';
type PaddingTypes = number |
{
    left?: number,
    right?: number,
    top?: number,
    bottom?: number
};

export interface IConfig extends IConfigBase {
    x?: number,
    y?: number,
    width?: number,
    height?: number,

    column?: number,
    row?: number,

    columnProportions?: number | number[],
    rowProportions?: number | number[],

    space?: {
        left?: number, right?: number, top?: number, bottom?: number,

        column?: number | number[],
        row?: number | number[],
    },
}

export default class GridSizer extends BaseSizer {
    sizerChildren: (Phaser.GameObjects.GameObject | null)[];

    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        column: number, row: number,
        config?: IConfig
    );

    setColumnProportion(columnIndex: number, proportion: number): this;
    setRowProportion(rowIndex: number, proportion: number): this;

    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            column?: number,
            row?: number,

            align?: AlignTypes,

            padding?: PaddingTypes,

            expand: boolean,

            key?: string
        }
    ): this;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeAt(
        columnIndex: number,
        rowIndex: number,
        destroyChild?: boolean
    ): this;

    removeAll(
        destroyChild?: boolean
    ): this;

    clear(
        destroyChild?: boolean
    ): this;

    columnCount: number;
    rowCount: number;

    resetGrid(
        column: number, row: number,
        columnProportions?: number | number[],
        rowProportions?: number | number[],
        space?: {
            column?: number | number[],
            row?: number | number[],
        }
    ): this;
}