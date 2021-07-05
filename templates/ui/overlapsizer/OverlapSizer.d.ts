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
}

export default class OverlapSizer extends BaseSizer {
    sizerChildren: { [name: string]: Phaser.GameObjects.GameObject };

    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            key?: string,

            align?: AlignTypes,

            padding?: PaddingTypes,

            expand: boolean |
            {
                width?: boolean,
                height?: boolean,
            },

            minWidth?: number,

            minHeight?: number
        }
    ): this;

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

    childToKey(
        gameObject: Phaser.GameObjects.GameObject
    ): string;
}