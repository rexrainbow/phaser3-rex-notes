import TitleLabel from '../../titlelabel/TitleLabel';
import BuildLabelConfig from './BuildLabelConfig';
import CreateBackground from './CreateBackground';
import CreateText from './CreateText';
import { GeneralCreateGameObjectCallbackType } from './GeneralCreateGameObjectCallbackType';

export default BuildTitleLabelConfig;

declare namespace BuildTitleLabelConfig {
    interface IConfig extends BuildLabelConfig.IConfig {

        innerBackground?: CreateBackground.IConfig,
        separator?: CreateBackground.IConfig,

        title?: CreateText.IConfig,
        wrapTitle?: boolean | 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character',
        adjustTitleFontSize?: boolean,
        expandTitleWidth?: boolean,
        expandTitleHeight?: boolean,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            innerLeft?: number, innerRight?: number, innerTop?: number, innerBottom?: number,

            title?: number, titleLeft?: number, titleRight?: number,
            separator?: number, separatorLeft?: number, separatorRight?: number,
            text?: number, textLeft?: number, textRight?: number,

            icon?: number, iconTop?: number, iconBottom?: number, iconLeft?: number, iconRight?: number,
            actionTop?: number, actionBottom?: number, actionLeft?: number, actionRight?: number,
        },
    }


    interface ICreators extends BuildLabelConfig.ICreators {
        innerBackground?: GeneralCreateGameObjectCallbackType,
        separator?: GeneralCreateGameObjectCallbackType,
        title?: GeneralCreateGameObjectCallbackType,
    }
}

declare function BuildTitleLabelConfig(
    scene: Phaser.Scene,
    config?: BuildTitleLabelConfig.IConfig,
    creators?: BuildTitleLabelConfig.ICreators,
): TitleLabel.IConfig