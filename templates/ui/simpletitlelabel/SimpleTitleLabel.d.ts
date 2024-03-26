import TitleLabel from '../titlelabel/TitleLabel';
import BuildTitleLabelConfig from '../utils/build/BuildTitleLabelConfig';
import LabelBase from '../label/Base';

export default SimpleTitleLabel;

declare namespace SimpleTitleLabel {
    interface IConfig extends BuildTitleLabelConfig.IConfig {
    }

    interface ICreatorsConfig extends BuildTitleLabelConfig.ICreators {
    }

    interface IResetDisplayContentConfig extends LabelBase.IResetDisplayContentConfig {
        title?: string,
    }
}

declare class SimpleTitleLabel extends TitleLabel {
    constructor(
        scene: Phaser.Scene,
        config?: SimpleTitleLabel.IConfig,
        creators?: SimpleTitleLabel.ICreatorsConfig
    );

    resetDisplayContent(
        config?: string | SimpleTitleLabel.IResetDisplayContentConfig
    ): this;

    setActiveState(enable?: boolean): this;
    setHoverState(enable?: boolean): this;
    setDisableState(enable?: boolean): this;
}