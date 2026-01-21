import BBCodeText from '../../bbcodetext/BBCodeText';
import Label from '../../label/Label';
import CreateTextArea from './CreateTextArea';

export default CreateText;

declare namespace CreateText {
    interface IBitmapTextConfig {
        /**
         * Type tag for bitmap text.
         */
        $type?: 'bitmaptext',
        /**
         * Bitmap font key.
         */
        key: string,
        /**
         * Bitmap font size.
         */
        size?: number,
        /**
         * Bitmap font size override.
         */
        fontSize?: number,
        /**
         * Text color.
         */
        color?: number,

        /**
         * Alpha value.
         */
        alpha?: number,
        /**
         * Tint color.
         */
        tint?: number,
        /**
         * Flip horizontally.
         */
        flipX?: boolean,
        /**
         * Flip vertically.
         */
        flipY?: boolean,
        /**
         * Origin applied to both axes.
         */
        origin?: number,
        /**
         * Origin x value.
         */
        originX?: number,
        /**
         * Origin y value.
         */
        originY?: number,
    }

    interface ITextConfig extends Phaser.GameObjects.TextStyle {
        /**
         * Type tag for text.
         */
        $type?: 'text',

        /**
         * Alpha value.
         */
        alpha?: number,
        /**
         * Tint color.
         */
        tint?: number,
        /**
         * Flip horizontally.
         */
        flipX?: boolean,
        /**
         * Flip vertically.
         */
        flipY?: boolean,
        /**
         * Origin applied to both axes.
         */
        origin?: number,
        /**
         * Origin x value.
         */
        originX?: number,
        /**
         * Origin y value.
         */
        originY?: number,
    }

    interface IBBCodeTextConfig extends BBCodeText.TextStyle {
        /**
         * Type tag for BBCode text.
         */
        $type?: 'bbcodetext',

        /**
         * Alpha value.
         */
        alpha?: number,
        /**
         * Tint color.
         */
        tint?: number,
        /**
         * Flip horizontally.
         */
        flipX?: boolean,
        /**
         * Flip vertically.
         */
        flipY?: boolean,
        /**
         * Origin applied to both axes.
         */
        origin?: number,
        /**
         * Origin x value.
         */
        originX?: number,
        /**
         * Origin y value.
         */
        originY?: number,
    }

    interface ILabelConfig extends Label.IConfig {
        /**
         * Type tag for label.
         */
        $type?: 'label',
    }

    interface ITextAreaConfig extends CreateTextArea.IConfig {
        /**
         * Type tag for textarea.
         */
        $type?: 'textarea',
    }

    type IConfig = IBitmapTextConfig | ITextConfig | IBBCodeTextConfig | ILabelConfig | ITextAreaConfig;

}

/**
 * Create a text game object based on config.
 * @param scene - The Scene to which this object belongs.
 * @param config - Text configuration.
 * @returns The created text object.
 */
declare function CreateText(
    scene: Phaser.Scene,
    config?: CreateText.IConfig
): Phaser.GameObjects.Text;
