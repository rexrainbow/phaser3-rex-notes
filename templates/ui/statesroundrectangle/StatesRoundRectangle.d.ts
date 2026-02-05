import RoundRectangle from '../roundrectangle/RoundRectangle';

export default StatesRoundRectangle;

declare namespace StatesRoundRectangle {
    /**
     * Radius config type used by state-specific radius fields.
     */
    type RadiusStateType =
        number |
        RoundRectangle.IRadiusConfig |
        ({
            /**
             * Radius value.
             */
            radius?: number | RoundRectangle.IRadiusConfig,
            /**
             * Corner curve iteration count.
             */
            iteration?: number
        });

    /**
     * Configuration options for creating a states-aware round rectangle.
     */
    interface IConfig extends RoundRectangle.IConfig {
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
         * Active-state radius configuration.
         */
        'active.radius'?: RadiusStateType,

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
         * Hover-state radius configuration.
         */
        'hover.radius'?: RadiusStateType,

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
        /**
         * Disable-state radius configuration.
         */
        'disable.radius'?: RadiusStateType,

    }
}

/**
 * Round rectangle object with active/hover/disable state styles.
 */
declare class StatesRoundRectangle extends RoundRectangle {
    /**
     * Create a states round rectangle object.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional state-style configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: StatesRoundRectangle.IConfig
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
