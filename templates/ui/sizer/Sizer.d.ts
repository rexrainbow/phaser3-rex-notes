// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js';

export default Sizer;

declare namespace Sizer {

    type OrientationTypes = 0 | 1 | 'x' | 'y' | 'h' | 'v' | 'horizontal' | 'vertical' | 'left-to-right' | 'top-to-bottom';

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
    }

    interface IConfig extends BaseSizer.IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        orientation?: OrientationTypes,
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            item?: number,
        },
    }
}

declare class Sizer extends BaseSizer {

    sizerChildren: Phaser.GameObjects.GameObject[];

    constructor(
        scene: Phaser.Scene,
        config?: Sizer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: Sizer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: Sizer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        orientation?: Sizer.OrientationTypes,
        config?: Sizer.IConfig
    );

    setOrientation(
        orientation?: Sizer.OrientationTypes
    ): this;

    setItemSpacing(value: number): this;

    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            proportion?: number,

            align?: Sizer.AlignTypes,

            padding?: Sizer.PaddingTypes,

            expand?: boolean,

            childKey?: string,

            index?: number,

            minWidth?: number,

            minHeight?: number
        }
    ): this;

    add(
        gameObject: Phaser.GameObjects.GameObject,
        proportion?: number,
        align?: Sizer.AlignTypes,
        padding?: Sizer.PaddingTypes,
        expand?: boolean,
        childKey?: string,
        index?: number,
        minSize?: number
    ): this;

    insert(
        index: number,
        gameObject: Phaser.GameObjects.GameObject,
        proportion?: number,
        align?: Sizer.AlignTypes,
        padding?: Sizer.PaddingTypes,
        expand?: boolean,
        childKey?: string
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