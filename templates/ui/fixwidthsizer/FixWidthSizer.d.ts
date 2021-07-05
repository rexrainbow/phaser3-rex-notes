// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js';
import { IConfig as IConfigBase } from '../basesizer/BaseSizer';

type AlignTypes = 0 | 1 | 2 | 3 | 4 | 5 |
    'left' | 'right' | 'center' | 'justify' | 'justify-left' | 'justify-right' | 'justify-cneter';
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

    space?: {
        left?: number, right?: number, top?: number, bottom?: number,

        item?: number, line?: number,
    },

    rtl?: boolean,

    align?: AlignTypes;
}

export default class Sizer extends BaseSizer {
    sizerChildren: Phaser.GameObjects.GameObject[];

    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            padding?: PaddingTypes,
            key?: string,
            index?: number,
        }
    ): this;

    addNewLine(): this;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeAll(
        destroyChild?: boolean
    ): this;

    clear(
        destroyChild?: boolean
    ): this;
}