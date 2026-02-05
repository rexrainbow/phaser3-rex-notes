import ColorInputBase from '../colorinputbase/ColorInputBase';
import RoundRectangle from '../../roundrectangle/RoundRectangle';
import ColorComponents from '../colorcomponents/ColorComponents';
import CanvasInput from '../../canvasinput/CanvasInput';

export default ColorInput;

declare namespace ColorInput {
    /**
     * Callback used to run color-picker transition animations.
     */
    type TransitCallbackType = (
        /**
         * Target game object to animate.
         */
        gameObject: Phaser.GameObjects.GameObject,
        /**
         * Transition duration in milliseconds.
         */
        duration: number
    ) => void;

    /**
     * Callback used to create a custom color-picker background object.
     */
    type CreateBackgroundCallbackType = (
        /**
         * Scene that owns the created game object.
         */
        scene: Phaser.Scene
    ) => Phaser.GameObjects.GameObject;

    /**
     * Configuration options for creating a color input component.
     */
    interface IConfig extends ColorInputBase.IConfig {
        colorPicker?: {
            /**
             * Width of the color picker panel.
             */
            width?: number,
            /**
             * Height of the color picker panel.
             */
            height?: number,

            /**
             * Background style configuration.
             */
            background?: RoundRectangle.IConfig,
            /**
             * Callback used to create a custom background object.
             */
            createBackgroundCallback: CreateBackgroundCallbackType,

            /**
             * Position of the hue palette.
             */
            hPalettePosition?: 0 | 1 | 2 | 3 | 'bottom' | 'left' | 'top' | 'right',

            /**
             * Expand direction when opening picker panel.
             */
            expandDirection?: 0 | 1 | 'down' | 'up',

            /**
             * Ease-in duration in milliseconds.
             */
            easeIn?: number,
            /**
             * Ease-out duration in milliseconds.
             */
            easeOut?: number,

            /**
             * Transition callback when picker opens.
             */
            transitIn?: TransitCallbackType,
            /**
             * Transition callback when picker closes.
             */
            transitOut?: TransitCallbackType,

            /**
             * Bounds rectangle to constrain picker placement.
             */
            bounds?: Phaser.Geom.Rectangle;

            space?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number,
                item?: number,
            }
        },

        colorComponents?: {
            /**
             * Height of the color components section.
             */
            height?: number,

            /**
             * Format label configuration.
             */
            formatLabel?: ColorComponents.IFormatLabelConfig,

            /**
             * Input text configuration.
             */
            inputText?: CanvasInput.IConfig,

            space?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number,
            },
        }
    }
}

/**
 * Color input component with popup color picker and editable components.
 */
declare class ColorInput extends ColorInputBase {
    /**
     * Create a color input component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional component configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ColorInput.IConfig
    );
}
