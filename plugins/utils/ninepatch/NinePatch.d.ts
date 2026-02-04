// import * as Phaser from 'phaser';

export default NinePatch;

declare namespace NinePatch {

    /**
     * Configuration options for creating a NinePatch.
     */
    interface IConfig {
        /**
         * X position.
         */
        x?: number,
        /**
         * Y position.
         */
        y?: number,
        /**
         * Width.
         */
        width?: number,
        /**
         * Height.
         */
        height?: number,

        /**
         * Texture key.
         */
        key?: string,
        /**
         * Base frame name.
         */
        baseFrame?: string,
        /**
         * Frame name.
         */
        frame?: string,
        /**
         * Callback to resolve frame names by column and row.
         */
        getFrameNameCallback?: (colIndex: number, rowIndex: number, baseFrame: string) => (string | undefined),

        /**
         * Column widths.
         */
        columns?: (number | undefined)[],
        /**
         * Left fixed width.
         */
        leftWidth?: number,
        /**
         * Right fixed width.
         */
        rightWidth?: number,

        /**
         * Row heights.
         */
        rows?: (number | undefined)[],
        /**
         * Top fixed height.
         */
        topHeight?: number,
        /**
         * Bottom fixed height.
         */
        bottomHeight?: number,

        /**
         * Stretch mode configuration.
         */
        stretchMode?: 0 | 1 | 'scale' | 'repeat' |
        {
            /**
             * Edge stretch mode.
             */
            edge?: 0 | 1 | 'scale' | 'repeat',
            /**
             * Internal stretch mode.
             */
            internal?: 0 | 1 | 'scale' | 'repeat',
        },

        /**
         * Max fixed part scale for both axes.
         */
        maxFixedPartScale?: number,
        /**
         * Max fixed part scale on X axis.
         */
        maxFixedPartScaleX?: number,
        /**
         * Max fixed part scale on Y axis.
         */
        maxFixedPartScaleY?: number,

        /**
         * Preserve aspect ratio of fixed parts.
         */
        preserveRatio?: boolean,
    }

}

/**
 * RenderTexture-based nine-patch game object.
 */
declare class NinePatch extends Phaser.GameObjects.RenderTexture {
    /**
     * Create a NinePatch with config only.
     *
     * @param scene - Scene instance.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: NinePatch.IConfig
    );

    /**
     * Create a NinePatch with position and config.
     *
     * @param scene - Scene instance.
     * @param x - X position.
     * @param y - Y position.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        config?: NinePatch.IConfig
    );

    /**
     * Create a NinePatch with position, size, and config.
     *
     * @param scene - Scene instance.
     * @param x - X position.
     * @param y - Y position.
     * @param width - Width.
     * @param height - Height.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        config?: NinePatch.IConfig
    );

    /**
     * Create a NinePatch with texture key.
     *
     * @param scene - Scene instance.
     * @param x - X position.
     * @param y - Y position.
     * @param width - Width.
     * @param height - Height.
     * @param key - Texture key.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        key: string,
        config?: NinePatch.IConfig
    );

    /**
     * Create a NinePatch with column and row sizes.
     *
     * @param scene - Scene instance.
     * @param x - X position.
     * @param y - Y position.
     * @param width - Width.
     * @param height - Height.
     * @param key - Texture key.
     * @param columns - Column widths.
     * @param rows - Row heights.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        key: string,
        columns: (number | undefined)[],
        rows: (number | undefined)[],
        config?: NinePatch.IConfig
    );

    /**
     * Create a NinePatch with base frame, columns, and rows.
     *
     * @param scene - Scene instance.
     * @param x - X position.
     * @param y - Y position.
     * @param width - Width.
     * @param height - Height.
     * @param key - Texture key.
     * @param baseFrame - Base frame name.
     * @param columns - Column widths.
     * @param rows - Row heights.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        key: string,
        baseFrame: string,
        columns: (number | undefined)[],
        rows: (number | undefined)[],
        config?: NinePatch.IConfig
    );

    /**
     * Resize the nine-patch.
     *
     * @param width - New width.
     * @param height - New height.
     * @returns This NinePatch instance.
     */
    resize(width: number, height: number): this;

    /**
     * Set base texture using columns and rows.
     *
     * @param key - Texture key.
     * @param baseFrame - Base frame name.
     * @param columns - Column widths.
     * @param rows - Row heights.
     * @returns This NinePatch instance.
     */
    setBaseTexture(
        key: string,
        baseFrame: string | undefined,
        columns: (number | undefined)[],
        rows: (number | undefined)[]
    ): this;

    /**
     * Set base texture using edge sizes.
     *
     * @param key - Texture key.
     * @param baseFrame - Base frame name.
     * @param leftWidth - Left fixed width.
     * @param rightWidth - Right fixed width.
     * @param topHeight - Top fixed height.
     * @param bottomHeight - Bottom fixed height.
     * @returns This NinePatch instance.
     */
    setBaseTexture(
        key: string,
        baseFrame: string | undefined,
        leftWidth: number,
        rightWidth: number,
        topHeight: number,
        bottomHeight: number
    ): this;

    /**
     * Set base texture using key and base frame.
     *
     * @param key - Texture key.
     * @param baseFrame - Base frame name.
     * @returns This NinePatch instance.
     */
    setBaseTexture(
        key: string,
        baseFrame: string | undefined
    ): this;

    /**
     * Set stretch mode.
     *
     * @param mode - Stretch mode configuration.
     * @returns This NinePatch instance.
     */
    setStretchMode(
        mode: 0 | 1 | 'scale' | 'repeat' |
        {
            edge?: 0 | 1 | 'scale' | 'repeat',
            internal?: 0 | 1 | 'scale' | 'repeat',
        }
    ): this;

    /**
     * Set frame-name callback.
     *
     * @param callback - Callback to resolve frame names.
     * @returns This NinePatch instance.
     */
    setGetFrameNameCallback(
        callback: (colIndex: number, rowIndex: number, baseFrame: string) => (string | undefined)
    ): this;

    /**
     * Rebuild texture rendering.
     *
     * @returns This NinePatch instance.
     */
    updateTexture(): this;

    /**
     * Enable or disable ratio preservation.
     *
     * @param enable - Preserve ratio flag.
     * @returns This NinePatch instance.
     */
    setPreserveRatio(enable?: boolean): this;
    /**
     * Preserve-ratio flag.
     */
    preserveRatio: boolean;

    /**
     * Set max fixed-part scale.
     *
     * @param scaleX - Max scale on X axis.
     * @param scaleY - Max scale on Y axis.
     * @returns This NinePatch instance.
     */
    setMaxFixedPartScale(scaleX: number, scaleY?: number): this;
    /**
     * Max fixed-part scale on X axis.
     */
    maxFixedPartScaleX: number;
    /**
     * Max fixed-part scale on Y axis.
     */
    maxFixedPartScaleY: number;

    /**
     * Minimum width based on fixed parts.
     */
    readonly minWidth: number;

    /**
     * Minimum height based on fixed parts.
     */
    readonly minHeight: number;

    /**
     * Current fixed-part scale on X axis.
     */
    readonly fixedPartScaleX: number;

    /**
     * Current fixed-part scale on Y axis.
     */
    readonly fixedPartScaleY: number;

    /**
     * Left fixed width.
     */
    readonly leftWidth: number;
    /**
     * Right fixed width.
     */
    readonly rightWidth: number;
    /**
     * Top fixed height.
     */
    readonly topHeight: number;
    /**
     * Bottom fixed height.
     */
    readonly bottomHeight: number;

}
