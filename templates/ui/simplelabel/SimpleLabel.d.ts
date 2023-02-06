import Label from '../label/Label';
import BBCodeText from '../bbcodetext/BBCodeText';

export default SimpleLabel;

declare namespace SimpleLabel {
    interface IRoundRectangleConfig {
        width?: number,
        height?: number,
        radius?: number | {
            tl?: (number | { x?: number, y?: number }),
            tr?: (number | { x?: number, y?: number }),
            bl?: (number | { x?: number, y?: number }),
            br?: (number | { x?: number, y?: number }),

            x?: number,
            y?: number,
        },

        color?: number,
        alpha?: number,

        strokeColor?: number,
        strokeAlpha?: number,
        strokeWidth?: number,
    }

    interface IConfig {
        background?: IRoundRectangleConfig,

        text?: BBCodeText.TextStyle,

        iconMask?: boolean,
        iconSize?: number, iconWidth?: number, iconHeight?: number,
        actionMask?: boolean,
        actionSize?: number, actionWidth?: number, actionHeight?: number,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            icon?: number,
            text?: number,
        },
    }

    type AlignTypes = number | 'left' | 'center' | 'right';

    interface IConfigClick {
        mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
        clickInterval?: number
    }
}

declare class SimpleLabel extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: SimpleLabel.IConfig
    );

}