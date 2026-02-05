// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import RoundRecrangle from '../../../plugins/roundrectangle';

export default NumberBar;

declare namespace NumberBar {

    /**
     * Input modes supported by the slider.
     */
    type SliderInputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';

    /**
     * Callback fired when number bar value changes.
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
         * Number bar instance.
         */
        numberBar: NumberBar
    ) => void;

    /**
     * Configuration options for creating a number bar.
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

            /**
             * Space between icon and slider.
             */
            icon?: number,
            /**
             * Space around slider section.
             */
            slider?: number,
        },

        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Optional icon game object.
         */
        icon?: Phaser.GameObjects.GameObject,

        /**
         * Set to true to mask icon.
         */
        iconMask?: boolean,

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
             * Gap between slider elements.
             */
            gap?: number,
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
         * Optional text game object.
         */
        text?: Phaser.GameObjects.GameObject,

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
 * Composite UI component that combines icon, slider, and value text.
 */
declare class NumberBar extends Sizer {
    /**
     * Create a number bar component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional number bar configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: NumberBar.IConfig
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
     * Current display text.
     */
    text: string;
    /**
     * Set display text.
     *
     * @param text - Text string.
     * @returns This component instance.
     */
    setText(text: string): this;

}
