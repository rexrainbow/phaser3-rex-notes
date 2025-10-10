// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js';
import GetBoundsConfig from '../../../plugins/utils/bounds/GetBoundsConfig.js';

export default Sizer;

declare namespace Sizer {

    type OrientationTypes = 0 | 1 | 'x' | 'y' | 'h' | 'v' | 'horizontal' | 'vertical' | 'left-to-right' | 'top-to-bottom';

    type AlignTypes = number | 'center' | 'left' | 'right' | 'top' | 'bottom' |
        'left-top' | 'left-center' | 'left-bottom' |
        'center-top' | 'center-center' | 'center-bottom' |
        'right-top' | 'right-center' | 'right-bottom';

    type PaddingTypes = GetBoundsConfig.PaddingConfigType;

    interface IConfig extends BaseSizer.IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        orientation?: OrientationTypes,
        rtl?: boolean,
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            item?: number,
        },
    }

    interface IAddConfig {
        proportion?: number,
        align?: Sizer.AlignTypes,
        padding?: Sizer.PaddingTypes,
        expand?: boolean,
        key?: string,
        index?: number,
        minWidth?: number,
        minHeight?: number,
        fitRatio?: number,
        offsetX?: number,
        offsetY?: number,
        offsetOriginX?: number,
        offsetOriginY?: number,
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
    orientation: number;

    setRTL(enable?: boolean): this;

    setItemSpacing(value: number): this;

    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Sizer.IAddConfig
    ): this;

    add(
        gameObject: Phaser.GameObjects.GameObject,
        proportion?: number,
        align?: Sizer.AlignTypes,
        padding?: Sizer.PaddingTypes,
        expand?: boolean,
        key?: string,
        index?: number,
        minWidth?: number,
        minHeight?: number,
        fitRatio?: number | boolean,
    ): this;

    insert(
        index: number,
        gameObject: Phaser.GameObjects.GameObject,
        config?: Sizer.IAddConfig
    ): this;

    insert(
        index: number,
        gameObject: Phaser.GameObjects.GameObject,
        proportion?: number,
        align?: Sizer.AlignTypes,
        padding?: Sizer.PaddingTypes,
        expand?: boolean,
        key?: string
    ): this;

    insertAtPosition(
        x: number,
        y: number,
        gameObject: Phaser.GameObjects.GameObject,
        config?: Sizer.IAddConfig
    ): this;

    insertAtPosition(
        x: number,
        y: number,
        gameObject: Phaser.GameObjects.GameObject,
        proportion?: number,
        align?: Sizer.AlignTypes,
        padding?: Sizer.PaddingTypes,
        expand?: boolean,
        key?: string
    ): this;

    addMultiple(
        gameObject: Phaser.GameObjects.GameObject[],
        config?: Sizer.IAddConfig
    ): this;

    addSpace(
        proportion?: number
    ): this;

    insertSpace(
        index?: number,
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

    getChildAlign(
        gameObject: Phaser.GameObjects.GameObject
    ): Sizer.AlignTypes;

    setChildAlign(
        gameObject: Phaser.GameObjects.GameObject,
        align: Sizer.AlignTypes
    ): this;

    getChildProportion(
        gameObject: Phaser.GameObjects.GameObject
    ): number;

    setChildProportion(
        gameObject: Phaser.GameObjects.GameObject,
        proportion: number
    ): this;

    getChildExpand(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    setChildExpand(
        gameObject: Phaser.GameObjects.GameObject,
        expand: boolean
    ): this;

    setChildrenAlignMode(
        mode: 'center' | 'left' | 'right' | 'top' | 'bottom'
    ): this;

    sortChildren(
        callback: (childA: Phaser.GameObjects.GameObject, childB: Phaser.GameObjects.GameObject) => number
    ): this;

    sortChildrenByData(
        key: string,
        descending?: boolean
    ): this;

    sortChildrenByProperty(
        key: string,
        descending?: boolean
    ): this;

}