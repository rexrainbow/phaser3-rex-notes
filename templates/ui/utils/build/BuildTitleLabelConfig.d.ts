import TitleLabel from '../../titlelabel/TitleLabel';
import BuildLabelConfig from './BuildLabelConfig';
import CreateBackground from './CreateBackground';
import CreateText from './CreateText';
import { GeneralCreateGameObjectCallbackType } from './GeneralCreateGameObjectCallbackType';

export default BuildTitleLabelConfig;

declare namespace BuildTitleLabelConfig {
    /**
     * Configuration options for building a title label config.
     */
    interface IConfig extends BuildLabelConfig.IConfig {

        /**
         * Inner background style configuration.
         */
        innerBackground?: CreateBackground.IConfig,
        /**
         * Separator style configuration.
         */
        separator?: CreateBackground.IConfig,

        /**
         * Title text style configuration.
         */
        title?: CreateText.IConfig,
        /**
         * Title wrapping mode.
         */
        wrapTitle?: boolean | 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character',
        /**
         * Set to true to auto-adjust title font size.
         */
        adjustTitleFontSize?: boolean,
        /**
         * Set to true to expand title width.
         */
        expandTitleWidth?: boolean,
        /**
         * Set to true to expand title height.
         */
        expandTitleHeight?: boolean,

        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,

            innerLeft?: number,
            innerRight?: number,
            innerTop?: number,
            innerBottom?: number,

            title?: number,
            titleLeft?: number,
            titleRight?: number,
            separator?: number,
            separatorLeft?: number,
            separatorRight?: number,
            text?: number,
            textLeft?: number,
            textRight?: number,

            icon?: number,
            iconTop?: number,
            iconBottom?: number,
            iconLeft?: number,
            iconRight?: number,
            actionTop?: number,
            actionBottom?: number,
            actionLeft?: number,
            actionRight?: number,
        },
    }


    /**
     * Factory callbacks used to create title-label sub-objects.
     */
    interface ICreators extends BuildLabelConfig.ICreators {
        /**
         * Inner background creator.
         */
        innerBackground?: GeneralCreateGameObjectCallbackType,
        /**
         * Separator creator.
         */
        separator?: GeneralCreateGameObjectCallbackType,
        /**
         * Title creator.
         */
        title?: GeneralCreateGameObjectCallbackType,
    }
}

/**
 * Build a normalized title-label configuration from style configs and creators.
 *
 * @param scene - Scene that owns created objects.
 * @param config - Optional source configuration.
 * @param creators - Optional factory callbacks.
 * @returns Normalized title-label configuration.
 */
declare function BuildTitleLabelConfig(
    scene: Phaser.Scene,
    config?: BuildTitleLabelConfig.IConfig,
    creators?: BuildTitleLabelConfig.ICreators
): TitleLabel.IConfig;
