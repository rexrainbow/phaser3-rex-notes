// import * as Phaser from 'phaser';
import Blitter from '../blitter/Blitter';

export default NinePatch;

declare namespace NinePatch {
    /**
     * Stretch mode values for nine-patch segments.
     */
    type StretchModeValueType = 0 | 1 | 'scale' | 'repeat';

    /**
     * Stretch mode configuration for edge and internal cells.
     */
    interface IStretchModeConfig {
        /**
         * Stretch mode for edge cells.
         */
        edge?: StretchModeValueType,
        /**
         * Stretch mode for internal cells.
         */
        internal?: StretchModeValueType,
    }

    /**
     * Callback used to resolve frame name by grid position.
     */
    type GetFrameNameCallbackType = (
        /**
         * Column index of nine-patch cell.
         */
        colIndex: number,
        /**
         * Row index of nine-patch cell.
         */
        rowIndex: number,
        /**
         * Base frame name.
         */
        baseFrame: string
    ) => string | undefined;

    /**
     * Configuration options for creating a nine-patch blitter object.
     */
    interface IConfig {
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
         * Base texture key.
         */
        key?: string,
        /**
         * Base frame name.
         */
        baseFrame?: string,
        /**
         * Callback used to resolve frame names.
         */
        getFrameNameCallback?: GetFrameNameCallbackType,

        /**
         * Column widths configuration.
         */
        columns?: (number | undefined)[],
        /**
         * Row heights configuration.
         */
        rows?: (number | undefined)[],

        /**
         * Stretch mode configuration.
         */
        stretchMode?: StretchModeValueType | IStretchModeConfig,

        /**
         * Uniform max scale for fixed parts.
         */
        maxFixedPartScale?: number,
        /**
         * Horizontal max scale for fixed parts.
         */
        maxFixedPartScaleX?: number,
        /**
         * Vertical max scale for fixed parts.
         */
        maxFixedPartScaleY?: number,

        /**
         * Set to true to preserve original patch ratio.
         */
        preserveRatio?: boolean,
    }

}

/**
 * Blitter-based nine-patch object for scalable texture layouts.
 */
declare class NinePatch extends Blitter {
    /**
     * Create a nine-patch from configuration object.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional nine-patch configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: NinePatch.IConfig
    );

    /**
     * Create a nine-patch with position.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param config - Optional nine-patch configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        config?: NinePatch.IConfig
    );

    /**
     * Create a nine-patch with position and size.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Initial width.
     * @param height - Initial height.
     * @param config - Optional nine-patch configuration.
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
     * Create a nine-patch with texture key.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Initial width.
     * @param height - Initial height.
     * @param key - Base texture key.
     * @param config - Optional nine-patch configuration.
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
     * Create a nine-patch with texture key and split data.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Initial width.
     * @param height - Initial height.
     * @param key - Base texture key.
     * @param columns - Column widths.
     * @param rows - Row heights.
     * @param config - Optional nine-patch configuration.
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
     * Create a nine-patch with texture key, base frame, and split data.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Initial width.
     * @param height - Initial height.
     * @param key - Base texture key.
     * @param baseFrame - Base frame name.
     * @param columns - Column widths.
     * @param rows - Row heights.
     * @param config - Optional nine-patch configuration.
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
     * Resize nine-patch.
     *
     * @param width - New width.
     * @param height - New height.
     * @returns This game object.
     */
    resize(width: number, height: number): this;

    /**
     * Set base texture and split data.
     *
     * @param key - Base texture key.
     * @param baseFrame - Base frame name.
     * @param columns - Column widths.
     * @param rows - Row heights.
     * @returns This game object.
     */
    setBaseTexture(
        key: string,
        baseFrame: string | undefined,
        columns: (number | undefined)[],
        rows: (number | undefined)[]
    ): this;

    /**
     * Set stretch mode.
     *
     * @param mode - Stretch mode value or config.
     * @returns This game object.
     */
    setStretchMode(
        mode: NinePatch.StretchModeValueType | NinePatch.IStretchModeConfig
    ): this;

    /**
     * Set frame-name resolver callback.
     *
     * @param callback - Callback resolving frame name by cell.
     * @returns This game object.
     */
    setGetFrameNameCallback(
        callback: NinePatch.GetFrameNameCallbackType
    ): this;

    /**
     * Rebuild and redraw nine-patch texture.
     *
     * @returns This game object.
     */
    updateTexture(): this;

    /**
     * Enable or disable ratio preservation.
     *
     * @param enable - True to preserve patch ratio.
     * @returns This game object.
     */
    setPreserveRatio(enable?: boolean): this;
    /**
     * Current preserve-ratio state.
     */
    preserveRatio: boolean;

    /**
     * Set maximum scale of fixed parts.
     *
     * @param scaleX - Horizontal max scale.
     * @param scaleY - Vertical max scale.
     * @returns This game object.
     */
    setMaxFixedPartScale(
        scaleX: number,
        scaleY?: number
    ): this;
    /**
     * Horizontal max fixed-part scale.
     */
    maxFixedPartScaleX: number;
    /**
     * Vertical max fixed-part scale.
     */
    maxFixedPartScaleY: number;

    /**
     * Minimum width before violating fixed-part constraints.
     */
    readonly minWidth: number;

    /**
     * Minimum height before violating fixed-part constraints.
     */
    readonly minHeight: number;

    /**
     * Current horizontal fixed-part scale.
     */
    readonly fixedPartScaleX: number;

    /**
     * Current vertical fixed-part scale.
     */
    readonly fixedPartScaleY: number;
}
