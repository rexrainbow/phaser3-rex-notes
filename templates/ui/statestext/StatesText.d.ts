export default StatesText;

declare namespace StatesText {
    /**
     * Configuration options for creating a states-aware text object.
     */
    interface IConfig extends Phaser.GameObjects.TextStyle {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Initial text content.
         */
        text?: string,

        /**
         * Active-state font family.
         */
        'active.fontFamily'?: string,
        /**
         * Active-state font size.
         */
        'active.fontSize'?: string,
        /**
         * Active-state font style.
         */
        'active.fontStyle'?: string,
        /**
         * Active-state background color.
         */
        'active.backgroundColor'?: null | string | number,
        /**
         * Active-state text color.
         */
        'active.color'?: null | string | number,
        /**
         * Active-state fill color.
         */
        'active.fill'?: null | string | number,
        /**
         * Active-state stroke color.
         */
        'active.stroke'?: null | string | number,
        /**
         * Active-state stroke thickness.
         */
        'active.strokeThickness'?: number,

        /**
         * Hover-state font family.
         */
        'hover.fontFamily'?: string,
        /**
         * Hover-state font size.
         */
        'hover.fontSize'?: string,
        /**
         * Hover-state font style.
         */
        'hover.fontStyle'?: string,
        /**
         * Hover-state background color.
         */
        'hover.backgroundColor'?: null | string | number,
        /**
         * Hover-state text color.
         */
        'hover.color'?: null | string | number,
        /**
         * Hover-state fill color.
         */
        'hover.fill'?: null | string | number,
        /**
         * Hover-state stroke color.
         */
        'hover.stroke'?: null | string | number,
        /**
         * Hover-state stroke thickness.
         */
        'hover.strokeThickness'?: number,

        /**
         * Disable-state font family.
         */
        'disable.fontFamily'?: string,
        /**
         * Disable-state font size.
         */
        'disable.fontSize'?: string,
        /**
         * Disable-state font style.
         */
        'disable.fontStyle'?: string,
        /**
         * Disable-state background color.
         */
        'disable.backgroundColor'?: null | string | number,
        /**
         * Disable-state text color.
         */
        'disable.color'?: null | string | number,
        /**
         * Disable-state fill color.
         */
        'disable.fill'?: null | string | number,
        /**
         * Disable-state stroke color.
         */
        'disable.stroke'?: null | string | number,
        /**
         * Disable-state stroke thickness.
         */
        'disable.strokeThickness'?: number,
    }
}

/**
 * Text object with active/hover/disable state styles.
 */
declare class StatesText extends Phaser.GameObjects.Text {
    /**
     * Create a states text object.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional state-style configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: StatesText.IConfig
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
