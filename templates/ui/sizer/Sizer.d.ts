import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js';
import { IConfig as IConfigBase } from '../basesizer/BaseSizer';

export interface IConfig extends IConfigBase {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    orientation?: 0 | 1 | 'x' | 'y' | 'h' | 'v' | 'horizontal' | 'vertical' | 'left-to-right' | 'top-to-bottom',
    space?: {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
        item?: number,
    },
}

export default class Sizer extends BaseSizer {

    sizerChildren: Phaser.GameObjects.GameObject[];

    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    setOrientation(
        orientation?: 0 | 1 | 'x' | 'y' | 'h' | 'v' | 'horizontal' | 'vertical' | 'left-to-right' | 'top-to-bottom'
    ): this;

    setItemSpacing(value: number): this;

    add(gameObject: Phaser.GameObjects.GameObject,
        config?: {
            proportion?: number,
            align?: number | 'center' | 'left' | 'right' | 'top' | 'bottom' |
            'left-top' | 'left-center' | 'left-bottom' |
            'center-top' | 'center-center' | 'center-bottom' |
            'right-top' | 'right-center' | 'right-bottom',
            padding?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number
            },
            expand?: boolean,
            childKey?: string,
            index?: number
            minWidth?: number,
            minHeight?: number
        }
    ): this;

    addSpace(
        proportion?: number
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
}