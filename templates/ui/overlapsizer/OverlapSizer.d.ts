// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js';
import GetBoundsConfig from '../../../plugins/utils/bounds/GetBoundsConfig.js';

export default OverlapSizer;

declare namespace OverlapSizer {
    /**
     * Alignment values for overlapped children.
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
    }

    interface IAddConfig {
        /**
         * Optional key to register the child.
         */
        key?: string,

        /**
         * Alignment for the child.
         */
        align?: OverlapSizer.AlignTypes,

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

        /**
         * Padding around the child.
         */
        padding?: OverlapSizer.PaddingTypes,

        /**
         * Expand settings.
         */
        expand?: boolean |
        {
            /**
             * Expand width.
             */
            width?: boolean,
            /**
             * Expand height.
             */
            height?: boolean,
        },

        /**
         * Minimum width override.
         */
        minWidth?: number,
        /**
         * Minimum height override.
         */
        minHeight?: number,

        /**
         * Aspect ratio override.
         */
        aspectRatio?: true | number
    }
}

/**
 * Sizer that stacks children in the same bounds with per-child alignment.
 */
declare class OverlapSizer extends BaseSizer {
    /**
     * Children mapped by key.
     */
    sizerChildren: { [name: string]: Phaser.GameObjects.GameObject };

    /**
     * Create an overlap sizer with config only.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: OverlapSizer.IConfig
    );

    /**
     * Create an overlap sizer at a position.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the sizer.
     * @param y - The y position of the sizer.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: OverlapSizer.IConfig
    );

    /**
     * Create a sized overlap sizer at a position.
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
        config?: OverlapSizer.IConfig
    );

    /**
     * Add a child with config.
     * @param gameObject - The child to add.
     * @param config - Add configuration.
     * @returns This instance.
     */
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: OverlapSizer.IAddConfig
    ): this;

    /**
     * Add a child with individual settings.
     * @param gameObject - The child to add.
     * @param key - Optional key to register the child.
     * @param align - Alignment for the child.
     * @param padding - Padding around the child.
     * @param expand - Expand settings.
     * @param minWidth - Minimum width override.
     * @param minHeight - Minimum height override.
     * @param offsetX - Local x offset.
     * @param offsetY - Local y offset.
     * @param aspectRatio - Aspect ratio override.
     * @returns This instance.
     */
    add(
        gameObject: Phaser.GameObjects.GameObject,
        key?: string,
        align?: OverlapSizer.AlignTypes,
        padding?: OverlapSizer.PaddingTypes,
        expand?: boolean |
        {
            /**
             * Expand width.
             */
            width?: boolean,
            /**
             * Expand height.
             */
            height?: boolean,
        },
        minWidth?: number,
        minHeight?: number,
        offsetX?: number,
        offsetY?: number,
        aspectRatio?: true | number
    ): this;

    /**
     * Add multiple children with shared config.
     * @param gameObject - Children to add.
     * @param config - Add configuration.
     * @returns This instance.
     */
    addMultiple(
        gameObject: Phaser.GameObjects.GameObject[],
        config?: OverlapSizer.IAddConfig
    ): this;

    /**
     * Remove a child by object.
     * @param gameObject - The child to remove.
     * @param destroyChild - True to destroy the child.
     * @returns This instance.
     */
    remove(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Remove a child by key.
     * @param key - The child key.
     * @param destroyChild - True to destroy the child.
     * @returns This instance.
     */
    remove(
        key: string,
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
     * Get the key for a child.
     * @param gameObject - The child to query.
     * @returns The key for the child.
     */
    childToKey(
        gameObject: Phaser.GameObjects.GameObject
    ): string;
}
