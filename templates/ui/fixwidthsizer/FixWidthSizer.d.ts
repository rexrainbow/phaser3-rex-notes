// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js';

export default FixWidthSizer;

declare namespace FixWidthSizer {
    type AlignTypes = 0 | 1 | 2 | 3 | 4 | 5 |
        'left' | 'right' | 'center' | 'justify' | 'justify-left' | 'justify-right' | 'justify-center';

    type PaddingTypes = number |
    {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number
    };

    interface IConfig extends BaseSizer.IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            item?: number, line?: number,

            indentLeftOdd?: number, indentLeftEven?: number,
            indentTopOdd?: number, indentTopEven?: number,
        },

        rtl?: boolean,

        align?: AlignTypes;
    }

    interface IAddConfig {
        padding?: FixWidthSizer.PaddingTypes,
        key?: string,
        index?: number,
        offsetX?: number,
        offsetY?: number,
        offsetOriginX?: number,
        offsetOriginY?: number,
    }
}

declare class FixWidthSizer extends BaseSizer {
    sizerChildren: Phaser.GameObjects.GameObject[];

    constructor(
        scene: Phaser.Scene,
        config?: FixWidthSizer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: FixWidthSizer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: FixWidthSizer.IConfig
    );

    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            padding?: FixWidthSizer.PaddingTypes,
            key?: string,
            index?: number,
        }
    ): this;

    add(
        gameObject: Phaser.GameObjects.GameObject,
        padding?: FixWidthSizer.PaddingTypes,
        key?: string,
        index?: number
    ): this;

    addMultiple(
        gameObject: Phaser.GameObjects.GameObject[],
        config?: FixWidthSizer.IAddConfig
    ): this;

    insert(
        index: number,
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            padding?: FixWidthSizer.PaddingTypes,
            key?: string,
        }
    ): this;

    insert(
        index: number,
        gameObject: Phaser.GameObjects.GameObject,
        paddingConfig?: FixWidthSizer.PaddingTypes,
        key?: string
    ): this;

    insertAtPosition(
        x: number,
        y: number,
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            padding?: FixWidthSizer.PaddingTypes,
            key?: string,
        }
    ): this;

    insertAtPosition(
        x: number,
        y: number,
        gameObject: Phaser.GameObjects.GameObject,
        paddingConfig?: FixWidthSizer.PaddingTypes,
        key?: string
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
