export default StatesImage;

declare namespace StatesImage {
    /**
     * Configuration options for creating a states-aware image object.
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
         * Default texture key.
         */
        key?: string,
        /**
         * Default frame key.
         */
        frame?: string,
        /**
         * Default scale value.
         */
        scale?: number,

        /**
         * Active-state texture key.
         */
        'active.key'?: string,
        /**
         * Active-state frame key.
         */
        'active.frame'?: string,
        /**
         * Active-state scale value.
         */
        'active.scale'?: number,

        /**
         * Hover-state texture key.
         */
        'hover.key'?: string,
        /**
         * Hover-state frame key.
         */
        'hover.frame'?: string,
        /**
         * Hover-state scale value.
         */
        'hover.scale'?: number,

        /**
         * Disable-state texture key.
         */
        'disable.key'?: string,
        /**
         * Disable-state frame key.
         */
        'disable.frame'?: string,
        /**
         * Disable-state scale value.
         */
        'disable.scale'?: number,

    }
}

/**
 * Image object with active/hover/disable state styles.
 */
declare class StatesImage extends Phaser.GameObjects.Image {
    /**
     * Create a states image object.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional state-style configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: StatesImage.IConfig
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
