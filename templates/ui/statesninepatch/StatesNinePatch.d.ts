import NinePatch from '../ninepatch/NinePatch';
export default StatesNineSlice;

declare namespace StatesNineSlice {
    /**
     * Configuration options for creating a states-aware nine-slice object.
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
         * Default texture key.
         */
        key?: string,
        /**
         * Default frame key.
         */
        frame?: string,
        /**
         * Left fixed width.
         */
        leftWidth?: number,
        /**
         * Right fixed width.
         */
        rightWidth?: number,
        /**
         * Top fixed height.
         */
        topHeight?: number,
        /**
         * Bottom fixed height.
         */
        bottomHeight?: number,

        /**
         * Active-state texture key.
         */
        'active.key'?: string,
        /**
         * Active-state frame key.
         */
        'active.frame'?: string,

        /**
         * Hover-state texture key.
         */
        'hover.key'?: string,
        /**
         * Hover-state frame key.
         */
        'hover.frame'?: string,

        /**
         * Disable-state texture key.
         */
        'disable.key'?: string,
        /**
         * Disable-state frame key.
         */
        'disable.frame'?: string,
    }
}

/**
 * NinePatch object with active/hover/disable state textures.
 */
declare class StatesNineSlice extends NinePatch {
    /**
     * Create a states nine-slice object.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional state-style configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: StatesNineSlice.IConfig
    );

    /**
     * Set active state styling.
     *
     * @param enable - True to enable active state.
     * @returns This game object.
     */
    setActiveState(enable?: boolean): this;
    /**
     * Set hover state styling.
     *
     * @param enable - True to enable hover state.
     * @returns This game object.
     */
    setHoverState(enable?: boolean): this;
    /**
     * Set disable state styling.
     *
     * @param enable - True to enable disable state.
     * @returns This game object.
     */
    setDisableState(enable?: boolean): this;
}
