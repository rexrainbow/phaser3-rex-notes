// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js';
import GetBoundsConfig from '../../../plugins/utils/bounds/GetBoundsConfig.js';

export default Sizer;

declare namespace Sizer {

    /**
     * Orientation values for the sizer.
     */
    type OrientationTypes = 0 | 1 | 'x' | 'y' | 'h' | 'v' | 'horizontal' | 'vertical' | 'left-to-right' | 'top-to-bottom';

    /**
     * Alignment values used for children.
     */
    type AlignTypes = number | 'center' | 'left' | 'right' | 'top' | 'bottom' |
        'left-top' | 'left-center' | 'left-bottom' |
        'center-top' | 'center-center' | 'center-bottom' |
        'right-top' | 'right-center' | 'right-bottom';

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
         * Layout orientation.
         */
        orientation?: OrientationTypes,
        /**
         * True to enable right-to-left layout.
         */
        rtl?: boolean,
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
        },
    }

    interface IAddConfig {
        /**
         * Proportion for sizing.
         */
        proportion?: number,
        /**
         * Alignment for the child.
         */
        align?: Sizer.AlignTypes,
        /**
         * Padding around the child.
         */
        padding?: Sizer.PaddingTypes,
        /**
         * True to expand the child.
         */
        expand?: boolean,
        /**
         * Optional key to register the child.
         */
        key?: string,
        /**
         * Insert index override.
         */
        index?: number,
        /**
         * Minimum width override.
         */
        minWidth?: number,
        /**
         * Minimum height override.
         */
        minHeight?: number,
        /**
         * Fit ratio override.
         */
        fitRatio?: number,
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
 * Linear sizer container with orientation and child layout controls.
 */
declare class Sizer extends BaseSizer {

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
        config?: Sizer.IConfig
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
        config?: Sizer.IConfig
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
        config?: Sizer.IConfig
    );

    /**
     * Create a sized sizer at a position with orientation.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the sizer.
     * @param y - The y position of the sizer.
     * @param width - The width of the sizer.
     * @param height - The height of the sizer.
     * @param orientation - Layout orientation.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        orientation?: Sizer.OrientationTypes,
        config?: Sizer.IConfig
    );

    /**
     * Set layout orientation.
     * @param orientation - Layout orientation.
     * @returns This instance.
     */
    setOrientation(
        orientation?: Sizer.OrientationTypes
    ): this;
    /**
     * Current orientation mode.
     */
    orientation: number;

    /**
     * Enable or disable right-to-left layout.
     * @param enable - True to enable RTL.
     * @returns This instance.
     */
    setRTL(enable?: boolean): this;

    /**
     * Set spacing between items.
     * @param value - Item spacing value.
     * @returns This instance.
     */
    setItemSpacing(value: number): this;

    /**
     * Add a child with config.
     * @param gameObject - The child to add.
     * @param config - Add configuration.
     * @returns This instance.
     */
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Sizer.IAddConfig
    ): this;

    /**
     * Add a child with individual settings.
     * @param gameObject - The child to add.
     * @param proportion - Proportion for sizing.
     * @param align - Alignment for the child.
     * @param padding - Padding around the child.
     * @param expand - True to expand the child.
     * @param key - Optional key to register the child.
     * @param index - Insert index override.
     * @param minWidth - Minimum width override.
     * @param minHeight - Minimum height override.
     * @param fitRatio - Fit ratio or auto-fit flag.
     * @returns This instance.
     */
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
        config?: Sizer.IAddConfig
    ): this;

    /**
     * Insert a child with individual settings.
     * @param index - Insert index.
     * @param gameObject - The child to insert.
     * @param proportion - Proportion for sizing.
     * @param align - Alignment for the child.
     * @param padding - Padding around the child.
     * @param expand - True to expand the child.
     * @param key - Optional key to register the child.
     * @returns This instance.
     */
    insert(
        index: number,
        gameObject: Phaser.GameObjects.GameObject,
        proportion?: number,
        align?: Sizer.AlignTypes,
        padding?: Sizer.PaddingTypes,
        expand?: boolean,
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
        config?: Sizer.IAddConfig
    ): this;

    /**
     * Insert a child at a world position with individual settings.
     * @param x - World x.
     * @param y - World y.
     * @param gameObject - The child to insert.
     * @param proportion - Proportion for sizing.
     * @param align - Alignment for the child.
     * @param padding - Padding around the child.
     * @param expand - True to expand the child.
     * @param key - Optional key to register the child.
     * @returns This instance.
     */
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

    /**
     * Add multiple children with shared config.
     * @param gameObject - Children to add.
     * @param config - Add configuration.
     * @returns This instance.
     */
    addMultiple(
        gameObject: Phaser.GameObjects.GameObject[],
        config?: Sizer.IAddConfig
    ): this;

    /**
     * Add a spacer with a proportion.
     * @param proportion - Proportion for spacing.
     * @returns This instance.
     */
    addSpace(
        proportion?: number
    ): this;

    /**
     * Insert a spacer at an index.
     * @param index - Insert index.
     * @param proportion - Proportion for spacing.
     * @returns This instance.
     */
    insertSpace(
        index?: number,
        proportion?: number
    ): this;

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
     * Get the alignment of a child.
     * @param gameObject - The child to query.
     * @returns The alignment value.
     */
    getChildAlign(
        gameObject: Phaser.GameObjects.GameObject
    ): Sizer.AlignTypes;

    /**
     * Set the alignment of a child.
     * @param gameObject - The child to update.
     * @param align - Alignment value.
     * @returns This instance.
     */
    setChildAlign(
        gameObject: Phaser.GameObjects.GameObject,
        align: Sizer.AlignTypes
    ): this;

    /**
     * Get the proportion of a child.
     * @param gameObject - The child to query.
     * @returns The proportion value.
     */
    getChildProportion(
        gameObject: Phaser.GameObjects.GameObject
    ): number;

    /**
     * Set the proportion of a child.
     * @param gameObject - The child to update.
     * @param proportion - Proportion value.
     * @returns This instance.
     */
    setChildProportion(
        gameObject: Phaser.GameObjects.GameObject,
        proportion: number
    ): this;

    /**
     * Get the expand flag of a child.
     * @param gameObject - The child to query.
     * @returns True if expanded.
     */
    getChildExpand(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Set the expand flag of a child.
     * @param gameObject - The child to update.
     * @param expand - True to expand.
     * @returns This instance.
     */
    setChildExpand(
        gameObject: Phaser.GameObjects.GameObject,
        expand: boolean
    ): this;

    /**
     * Set alignment mode for all children.
     * @param mode - Alignment mode.
     * @returns This instance.
     */
    setChildrenAlignMode(
        mode: 'center' | 'left' | 'right' | 'top' | 'bottom'
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
