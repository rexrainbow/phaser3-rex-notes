// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import RoundRecrangle from '../../../plugins/roundrectangle';

export default ScrollBar;

declare namespace ScrollBar {

    /**
     * Input modes supported by the slider.
     */
    type SliderInputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';

    /**
     * Callback fired when scrollbar value changes.
     */
    type ValueChangeCallbackType = (
        /**
         * New normalized value.
         */
        newValue: number,
        /**
         * Previous normalized value.
         */
        oldValue: number,
        /**
         * Scrollbar instance.
         */
        ScrollBar: ScrollBar
    ) => void;

    /**
     * Configuration options for creating a scrollbar.
     */
    interface IConfig extends Sizer.IConfig {
        space?: {
            /**
             * Left outer space.
             */
            left?: number,
            /**
             * Right outer space.
             */
            right?: number,
            /**
             * Top outer space.
             */
            top?: number,
            /**
             * Bottom outer space.
             */
            bottom?: number,
        },

        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        buttons?: {
            /**
             * Top button game object.
             */
            top?: Phaser.GameObjects.GameObject,
            /**
             * Bottom button game object.
             */
            bottom?: Phaser.GameObjects.GameObject,
            /**
             * Left button game object.
             */
            left?: Phaser.GameObjects.GameObject,
            /**
             * Right button game object.
             */
            right?: Phaser.GameObjects.GameObject,

            /**
             * Step value applied by button clicks.
             */
            step?: number,
        },

        slider?: {
            /**
             * Slider background object or style config.
             */
            background?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
            /**
             * Slider track object or style config.
             */
            track?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
            /**
             * Slider indicator object or style config.
             */
            indicator?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
            /**
             * Slider thumb object or style config.
             */
            thumb?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
            /**
             * Slider input mode.
             */
            input?: SliderInputTypes,

            /**
             * Slider gap size.
             */
            gap?: number,
            /**
             * Slider tick interval.
             */
            tick?: number,

            easeValue?: {
                /**
                 * Ease duration in milliseconds.
                 */
                duration?: number,
                /**
                 * Ease function name.
                 */
                ease?: string
            },
        };

        /**
         * Callback fired when value changes.
         */
        valuechangeCallback?: ValueChangeCallbackType,

        /**
         * Set to true to enable interaction.
         */
        enable?: boolean,
    }
}

/**
 * Composite UI scrollbar with optional buttons and slider controls.
 */
declare class ScrollBar extends Sizer {
    /**
     * Create a scrollbar component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional scrollbar configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ScrollBar.IConfig
    );

    /**
     * Current normalized value.
     */
    value: number;
    /**
     * Get value, optionally mapped to a custom range.
     *
     * @param min - Optional minimum of output range.
     * @param max - Optional maximum of output range.
     * @returns Current value.
     */
    getValue(
        min?: number,
        max?: number
    ): number;
    /**
     * Set value, optionally by mapping from a custom range.
     *
     * @param value - Value to set.
     * @param min - Optional minimum of input range.
     * @param max - Optional maximum of input range.
     * @returns This component instance.
     */
    setValue(
        value?: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Add delta to current value.
     *
     * @param inc - Increment value.
     * @param min - Optional minimum of input range.
     * @param max - Optional maximum of input range.
     * @returns This component instance.
     */
    addValue(
        inc?: number,
        min?: number,
        max?: number
    ): this;

    /**
     * Ease value to target.
     *
     * @param value - Target value.
     * @param min - Optional minimum of input range.
     * @param max - Optional maximum of input range.
     * @returns This component instance.
     */
    easeValueTo(
        value?: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Stop current value easing.
     *
     * @returns This component instance.
     */
    stopEaseValue(): this;
    /**
     * Set ease duration.
     *
     * @param duration - Duration in milliseconds.
     * @returns This component instance.
     */
    setEaseValueDuration(duration: number): this;
    /**
     * Set ease function.
     *
     * @param ease - Ease function name.
     * @returns This component instance.
     */
    setEaseValueFunction(ease: string): this;

    /**
     * Enable or disable interaction.
     *
     * @param enable - True to enable interaction.
     * @returns This component instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * Current enabled state.
     */
    enable: boolean;

    /**
     * Set slider gap value.
     *
     * @param gap - Gap value.
     * @param min - Optional minimum of input range.
     * @param max - Optional maximum of input range.
     * @returns This component instance.
     */
    setGap(
        gap?: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Current gap value.
     */
    gap: number;
    /**
     * Set slider tick interval.
     *
     * @param tick - Tick value.
     * @param min - Optional minimum of input range.
     * @param max - Optional maximum of input range.
     * @returns This component instance.
     */
    setTick(
        tick?: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Current tick interval.
     */
    tick: number;
}
