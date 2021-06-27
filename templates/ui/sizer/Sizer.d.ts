import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js'

export default class Sizer extends BaseSizer {

    sizerChildren: Phaser.GameObjects.GameObject[];

    constructor(
        scene: Phaser.Scene,

        config?: {
            x?: number;
            y?: number;
            width?: number;
            height?: number;

            orientation?: 0 | 1 | 'x' | 'y' | 'h' | 'v' | 'horizontal' | 'vertical' | 'left-to-right' | 'top-to-bottom';

            space?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number,
                item?: number,
            };

            name?: string,

            anchor?: {
                left?: string, right?: string, centerX?: string, x?: string,
                top?: string, bottom?: string, centerY?: string, y?: string
            },

            draggable?: boolean | string | Phaser.GameObjects.GameObject
        }
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