import Label from '../../label/Label';
import CreateBackground from './CreateBackground';
import CreateBBCodeText from './CreateBBCodeText';

export default BuildDisplayLabelConfig;

declare namespace BuildDisplayLabelConfig {
    interface IConfig {
        background?: CreateBackground.IConfig,

        iconMask?: boolean,
        squareFitIcon?: boolean,
        iconSize?: number, iconWidth?: number, iconHeight?: number,

        text?: CreateBBCodeText.IConfig,
        expandTextWidth?: boolean,
        expandTextHeight?: boolean,

        squareFitAction?: boolean,
        actionMask?: boolean,
        actionSize?: number, actionWidth?: number, actionHeight?: number,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            icon?: number,
            text?: number,
        },

        align?: Label.AlignTypes,
    }
}

declare function BuildDisplayLabelConfig(
    scene: Phaser.Scene,
    config?: BuildDisplayLabelConfig.IConfig,
    deepCloneConfig?: boolean
): Label.IConfig