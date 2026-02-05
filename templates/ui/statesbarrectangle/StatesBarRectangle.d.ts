import LineProgress from '../lineprogress/LineProgress';

export default StatesBarRectangle;

declare namespace StatesBarRectangle {
    /**
     * Configuration options for creating a states-aware bar rectangle.
     */
    interface IConfig extends LineProgress.IConfig {
        /**
         * State transition ease duration in milliseconds.
         */
        easeDuration?: number,
        /**
         * State transition ease function name.
         */
        ease?: string,

        /**
         * Active-state bar color.
         */
        'active.barColor'?: number,
        /**
         * Active-state fill color.
         */
        'active.color'?: number,
        /**
         * Active-state fill alpha.
         */
        'active.alpha'?: number,
        /**
         * Active-state stroke color.
         */
        'active.strokeColor'?: number,
        /**
         * Active-state stroke alpha.
         */
        'active.strokeAlpha'?: number,
        /**
         * Active-state stroke width.
         */
        'active.strokeWidth'?: number,

        /**
         * Hover-state bar color.
         */
        'hover.barColor'?: number,
        /**
         * Hover-state fill color.
         */
        'hover.color'?: number,
        /**
         * Hover-state fill alpha.
         */
        'hover.alpha'?: number,
        /**
         * Hover-state stroke color.
         */
        'hover.strokeColor'?: number,
        /**
         * Hover-state stroke alpha.
         */
        'hover.strokeAlpha'?: number,
        /**
         * Hover-state stroke width.
         */
        'hover.strokeWidth'?: number,
        /**
         * Set to true to apply hover state to bar section.
         */
        'hover.bar'?: boolean,

        /**
         * Disable-state bar color.
         */
        'disable.barColor'?: number,
        /**
         * Disable-state fill color.
         */
        'disable.color'?: number,
        /**
         * Disable-state fill alpha.
         */
        'disable.alpha'?: number,
        /**
         * Disable-state stroke color.
         */
        'disable.strokeColor'?: number,
        /**
         * Disable-state stroke alpha.
         */
        'disable.strokeAlpha'?: number,
        /**
         * Disable-state stroke width.
         */
        'disable.strokeWidth'?: number,

    }
}

/**
 * Line progress bar rectangle with active/hover/disable state styles.
 */
declare class StatesBarRectangle extends LineProgress {
    /**
     * Create a states bar rectangle component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional state-style configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: StatesBarRectangle.IConfig
    );

    /**
     * Set active state styling.
     *
     * @param enable - True to enable active state.
     * @returns This component instance.
     */
    setActiveState(enable?: boolean): this;
    /**
     * Set hover state styling.
     *
     * @param enable - True to enable hover state.
     * @returns This component instance.
     */
    setHoverState(enable?: boolean): this;
    /**
     * Set disable state styling.
     *
     * @param enable - True to enable disable state.
     * @returns This component instance.
     */
    setDisableState(enable?: boolean): this;
}
