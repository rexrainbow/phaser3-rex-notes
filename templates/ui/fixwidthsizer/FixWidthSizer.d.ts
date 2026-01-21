// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer';
import GetBoundsConfig from '../../../plugins/utils/bounds/GetBoundsConfig.js';

export default FixWidthSizer;

declare namespace FixWidthSizer {
    /**
     * Alignment values for fixed-width layout.
     */
    type AlignTypes = 0 | 1 | 2 | 3 | 4 | 5 |
        'left' | 'right' | 'center' | 'justify' | 'justify-left' | 'justify-right' | 'justify-center';

    /**
     * Padding types used for children.
     */
    type PaddingTypes = GetBoundsConfig.PaddingConfigType;

    interface IConfig extends BaseSizer.IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Initial width.
         */
        width?: number,
        /**
         * Initial height.
         */
        height?: number,

        /**
         * Spacing configuration.
         */
        space?: {
            /**
             * Left space.
             */
            left?: number,
            /**
             * Right space.
             */
            right?: number,
            /**
             * Top space.
             */
            top?: number,
            /**
             * Bottom space.
             */
            bottom?: number,

            /**
             * Space between items.
             */
            item?: number,
            /**
             * Space between lines.
             */
            line?: number,

            /**
             * Indent left for odd rows.
             */
            indentLeftOdd?: number,
            /**
             * Indent left for even rows.
             */
            indentLeftEven?: number,
            /**
             * Indent top for odd rows.
             */
            indentTopOdd?: number,
            /**
             * Indent top for even rows.
             */
            indentTopEven?: number,
        },

        /**
         * True to enable right-to-left layout.
         */
        rtl?: boolean,

        /**
         * Alignment for lines and items.
         */
        align?: AlignTypes;
    }

    interface IAddConfig {
        /**
         * Padding around the child.
         */
        padding?: FixWidthSizer.PaddingTypes,
        /**
         * Optional key to register the child.
         */
        key?: string,
        /**
         * Insert index override.
         */
        index?: number,
        /**
         * Local x offset.
         */
        offsetX?: number,
        /**
         * Local y offset.
         */
        offsetY?: number,
        /**
         * Origin x offset.
         */
        offsetOriginX?: number,
        /**
         * Origin y offset.
         */
        offsetOriginY?: number,
    }
}

/**
 * Fixed-width sizer that wraps children into lines with spacing and alignment.
 * @remarks Supports orientation, line/item spacing, indent, justify, and RTL layout.
 */
declare class FixWidthSizer extends BaseSizer {
    /**
     * Children managed by this sizer.
     */
    sizerChildren: Phaser.GameObjects.GameObject[];

    /**
     * Create a sizer with config only.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: FixWidthSizer.IConfig
    );

    /**
     * Create a sizer at a position.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the sizer.
     * @param y - The y position of the sizer.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: FixWidthSizer.IConfig
    );

    /**
     * Create a sized sizer at a position.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the sizer.
     * @param y - The y position of the sizer.
     * @param width - The width of the sizer.
     * @param height - The height of the sizer.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: FixWidthSizer.IConfig
    );

    /**
     * Add a child with config.
     * @param gameObject - The child to add.
     * @param config - Add configuration.
     * @returns This instance.
     */
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            /**
             * Padding around the child.
             */
            padding?: FixWidthSizer.PaddingTypes,
            /**
             * Optional key to register the child.
             */
            key?: string,
            /**
             * Insert index override.
             */
            index?: number,
        }
    ): this;

    /**
     * Add a child with individual settings.
     * @param gameObject - The child to add.
     * @param padding - Padding around the child.
     * @param key - Optional key to register the child.
     * @param index - Insert index override.
     * @returns This instance.
     */
    add(
        gameObject: Phaser.GameObjects.GameObject,
        padding?: FixWidthSizer.PaddingTypes,
        key?: string,
        index?: number
    ): this;

    /**
     * Add multiple children with shared config.
     * @param gameObject - Children to add.
     * @param config - Add configuration.
     * @returns This instance.
     */
    addMultiple(
        gameObject: Phaser.GameObjects.GameObject[],
        config?: FixWidthSizer.IAddConfig
    ): this;

    /**
     * Insert a child with config.
     * @param index - Insert index.
     * @param gameObject - The child to insert.
     * @param config - Add configuration.
     * @returns This instance.
     */
    insert(
        index: number,
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            /**
             * Padding around the child.
             */
            padding?: FixWidthSizer.PaddingTypes,
            /**
             * Optional key to register the child.
             */
            key?: string,
        }
    ): this;

    /**
     * Insert a child with individual settings.
     * @param index - Insert index.
     * @param gameObject - The child to insert.
     * @param paddingConfig - Padding around the child.
     * @param key - Optional key to register the child.
     * @returns This instance.
     */
    insert(
        index: number,
        gameObject: Phaser.GameObjects.GameObject,
        paddingConfig?: FixWidthSizer.PaddingTypes,
        key?: string
    ): this;

    /**
     * Insert a child at a world position using config.
     * @param x - World x.
     * @param y - World y.
     * @param gameObject - The child to insert.
     * @param config - Add configuration.
     * @returns This instance.
     */
    insertAtPosition(
        x: number,
        y: number,
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            /**
             * Padding around the child.
             */
            padding?: FixWidthSizer.PaddingTypes,
            /**
             * Optional key to register the child.
             */
            key?: string,
        }
    ): this;

    /**
     * Insert a child at a world position with individual settings.
     * @param x - World x.
     * @param y - World y.
     * @param gameObject - The child to insert.
     * @param paddingConfig - Padding around the child.
     * @param key - Optional key to register the child.
     * @returns This instance.
     */
    insertAtPosition(
        x: number,
        y: number,
        gameObject: Phaser.GameObjects.GameObject,
        paddingConfig?: FixWidthSizer.PaddingTypes,
        key?: string
    ): this;

    /**
     * Start a new line for subsequent children.
     * @returns This instance.
     */
    addNewLine(): this;

    /**
     * Remove a child.
     * @param gameObject - The child to remove.
     * @param destroyChild - True to destroy the child.
     * @returns This instance.
     */
    remove(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Remove all children.
     * @param destroyChild - True to destroy removed children.
     * @returns This instance.
     */
    removeAll(
        destroyChild?: boolean
    ): this;

    /**
     * Clear all children.
     * @param destroyChild - True to destroy cleared children.
     * @returns This instance.
     */
    clear(
        destroyChild?: boolean
    ): this;

    /**
     * Sort children using a compare callback.
     * @param callback - Compare callback.
     * @returns This instance.
     */
    sortChildren(
        callback: (
            childA: Phaser.GameObjects.GameObject,
            childB: Phaser.GameObjects.GameObject
        ) => number
    ): this;

    /**
     * Sort children by a data value.
     * @param key - Data key.
     * @param descending - True to sort descending.
     * @returns This instance.
     */
    sortChildrenByData(
        key: string,
        descending?: boolean
    ): this;

    /**
     * Sort children by a property value.
     * @param key - Property name.
     * @param descending - True to sort descending.
     * @returns This instance.
     */
    sortChildrenByProperty(
        key: string,
        descending?: boolean
    ): this;
}
