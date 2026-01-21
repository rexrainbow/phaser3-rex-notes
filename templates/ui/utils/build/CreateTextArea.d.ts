import TextArea from '../../textarea/TextArea';
import { GeneralCreateGameObjectCallbackType } from './GeneralCreateGameObjectCallbackType';
import CreateBackground from './CreateBackground';
import CreateText from './CreateText';

export default CreateTextArea;

declare namespace CreateTextArea {
    /**
     * Input modes for the slider.
     */
    type SliderInputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';
    /**
     * Slider position options.
     */
    type SliderPositionTypes = 0 | 1 | 'right' | 'left'

    interface IConfig {
        /**
         * Spacing configuration.
         */
        space?: {
            /**
             * Left space.
             */
            left?: number,
            /**
             * Right space.
             */
            right?: number,
            /**
             * Top space.
             */
            top?: number,
            /**
             * Bottom space.
             */
            bottom?: number,

            /**
             * Text padding or spacing.
             */
            text?: number | {
                /**
                 * Left text space.
                 */
                left?: number,
                /**
                 * Right text space.
                 */
                right?: number,
                /**
                 * Top text space.
                 */
                top?: number,
                /**
                 * Bottom text space.
                 */
                bottom?: number,
            },
        },

        /**
         * Background configuration.
         */
        background?: CreateBackground.IConfig,

        /**
         * Text configuration.
         */
        text?: CreateText.IConfig,
        /**
         * Fixed text width.
         */
        textWidth?: number | undefined,
        /**
         * Fixed text height.
         */
        textHeight?: number | undefined,
        /**
         * True to enable text mask.
         */
        textMask?: boolean,
        /**
         * True to keep scrolling enabled even when content fits.
         */
        alwaysScrollable?: boolean,

        /**
         * Slider configuration or true to enable default slider.
         */
        slider?: ({
            /**
             * Track background configuration.
             */
            track?: CreateBackground.IConfig,
            /**
             * Thumb background configuration.
             */
            thumb?: CreateBackground.IConfig,

            /**
             * Slider input mode.
             */
            input?: SliderInputTypes,
            /**
             * Slider position.
             */
            position?: SliderPositionTypes,

            /**
             * True to hide slider when unscrollable.
             */
            hideUnscrollableSlider?: boolean,
            /**
             * True to disable dragging when unscrollable.
             */
            disableUnscrollableDrag?: boolean,
            /**
             * True to adapt thumb size to content.
             */
            adaptThumbSize?: boolean,
            /**
             * Minimum thumb size.
             */
            minThumbSize?: number,

            /**
             * Optional scroll buttons.
             */
            buttons?: {
                /**
                 * Top button.
                 */
                top?: Phaser.GameObjects.GameObject,
                /**
                 * Bottom button.
                 */
                bottom?: Phaser.GameObjects.GameObject,
                /**
                 * Left button.
                 */
                left?: Phaser.GameObjects.GameObject,
                /**
                 * Right button.
                 */
                right?: Phaser.GameObjects.GameObject,
                /**
                 * Scroll step size.
                 */
                step?: number
            }
        } |
            boolean
        ),

        /**
         * Scroller configuration or true to enable default scroller.
         */
        scroller?: (
            {
                /**
                 * Drag threshold.
                 */
                threshold?: number,
                /**
                 * Sliding deceleration, or false to disable.
                 */
                slidingDeceleration?: number | false,
                /**
                 * Back deceleration, or false to disable.
                 */
                backDeceleration?: number | false,
                /**
                 * Drag rate.
                 */
                dragRate?: number,
            } |
            boolean
        ),

        /**
         * Mouse wheel scroller configuration or true to enable.
         */
        mouseWheelScroller?: (
            {
                /**
                 * True to require focus.
                 */
                focus?: boolean,
                /**
                 * Scroll speed.
                 */
                speed?: number,
            } |
            boolean
        ),

        /**
         * Clamp child OY within bounds.
         */
        clampChildOY?: boolean,

    }

    interface ICreatorsConfig {
        /**
         * Background creator callback.
         */
        background?: GeneralCreateGameObjectCallbackType,
        /**
         * Text creator callback.
         */
        text?: GeneralCreateGameObjectCallbackType,
        /**
         * Track creator callback.
         */
        track?: GeneralCreateGameObjectCallbackType,
        /**
         * Thumb creator callback.
         */
        thumb?: GeneralCreateGameObjectCallbackType,
    }
}

/**
 * Create a text area with optional slider and scroller.
 * @param scene - The Scene to which this object belongs.
 * @param config - Text area configuration.
 * @param creators - Game object creators for parts.
 * @returns The created text area.
 */
declare function CreateTextArea(
    scene: Phaser.Scene,
    config?: CreateTextArea.IConfig,
    creators?: CreateTextArea.ICreatorsConfig,
): TextArea;
