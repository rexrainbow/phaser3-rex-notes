export default StatesBitmapText;

declare namespace StatesBitmapText {
    /**
     * Configuration options for creating a states-aware bitmap text object.
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
         * Default bitmap font key.
         */
        font?: string,
        /**
         * Default font size.
         */
        fontSize?: number,
        /**
         * Default text align value.
         */
        align?: number,
        /**
         * Default tint color.
         */
        tint?: number,
        /**
         * Default letter spacing.
         */
        letterSpacing?: number,
        /**
         * Default line spacing.
         */
        lineSpacing?: number,

        /**
         * Active-state font key.
         */
        'active.font'?: string,
        /**
         * Active-state font size.
         */
        'active.fontSize'?: number,
        /**
         * Active-state tint color.
         */
        'active.tint'?: number,
        /**
         * Active-state letter spacing.
         */
        'active.letterSpacing'?: number,
        /**
         * Active-state line spacing.
         */
        'active.lineSpacing'?: number,

        /**
         * Hover-state font key.
         */
        'hover.font'?: string,
        /**
         * Hover-state font size.
         */
        'hover.fontSize'?: number,
        /**
         * Hover-state tint color.
         */
        'hover.tint'?: number,
        /**
         * Hover-state letter spacing.
         */
        'hover.letterSpacing'?: number,
        /**
         * Hover-state line spacing.
         */
        'hover.lineSpacing'?: number,

        /**
         * Disable-state font key.
         */
        'disable.font'?: string,
        /**
         * Disable-state font size.
         */
        'disable.fontSize'?: number,
        /**
         * Disable-state tint color.
         */
        'disable.tint'?: number,
        /**
         * Disable-state letter spacing.
         */
        'disable.letterSpacing'?: number,
        /**
         * Disable-state line spacing.
         */
        'disable.lineSpacing'?: number,

    }
}

/**
 * BitmapText object with active/hover/disable state styles.
 */
declare class StatesBitmapText extends Phaser.GameObjects.BitmapText {
    /**
     * Create a states bitmap text object.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional state-style configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: StatesBitmapText.IConfig
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
