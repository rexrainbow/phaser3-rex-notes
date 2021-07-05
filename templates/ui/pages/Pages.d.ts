// import * as Phaser from 'phaser';
import OverlapSizer from '../overlapsizer/OverlapSizer';
import { IConfig as IConfigBase } from '../overlapsizer/OverlapSizer';

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
    swapMode?: 0 | 1 | 'invisible' | 'destroy'
}

export default class Page extends OverlapSizer {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    setSwapMode(
        mode: 0 | 1 | 'invisible' | 'destroy'
    ): this;

    addPage(
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

    swapPage(key: string): this;
    currentKey: string;
    previousKey: string;
    keys: string[];

    getPage(key: string): Phaser.GameObjects.GameObject;
    currentPage: Phaser.GameObjects.GameObject;
    previousPage: Phaser.GameObjects.GameObject;
}