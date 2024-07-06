import BBCodeText from '../../bbcodetext/BBCodeText';
import Label from '../../label/Label';
import CreateTextArea from './CreateTextArea';

export default CreateText;

declare namespace CreateText {
    interface IBitmapTextConfig {
        $type?: 'bitmaptext',
        key: string,
        size?: number, fontSize?: number,
        color?: number,

        alpha?: number,
        tint?: number,
        flipX?: boolean, flipY?: boolean,
        origin?: number, originX?: number, originY?: number,
    }

    interface ITextConfig extends Phaser.GameObjects.TextStyle {
        $type?: 'text',

        alpha?: number,
        tint?: number,
        flipX?: boolean, flipY?: boolean,
        origin?: number, originX?: number, originY?: number,
    }

    interface IBBCodeTextConfig extends BBCodeText.TextStyle {
        $type?: 'bbcodetext',

        alpha?: number,
        tint?: number,
        flipX?: boolean, flipY?: boolean,
        origin?: number, originX?: number, originY?: number,
    }

    interface ILabelConfig extends Label.IConfig {
        $type?: 'label',
    }

    interface ITextAreaConfig extends CreateTextArea.IConfig {
        $type?: 'textarea',
    }

    type IConfig = IBitmapTextConfig | ITextConfig | IBBCodeTextConfig | ILabelConfig | ITextAreaConfig;

}

declare function CreateText(
    scene: Phaser.Scene,
    config?: CreateText.IConfig
): Phaser.GameObjects.Text;