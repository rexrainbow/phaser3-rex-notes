import TitleLabel from '../titlelabel/TitleLabel';
import BuildTitleLabelConfig from '../utils/build/BuildTitleLabelConfig';
import LabelBase from '../label/Base';

export default SimpleTitleLabel;

declare namespace SimpleTitleLabel {
    /**
     * Configuration options for creating a simple title label.
     */
    interface IConfig extends BuildTitleLabelConfig.IConfig {
    }

    /**
     * Factory callbacks used to create title-label sub-objects.
     */
    interface ICreatorsConfig extends BuildTitleLabelConfig.ICreators {
    }

    /**
     * Runtime display-content configuration of simple title label.
     */
    interface IResetDisplayContentConfig extends LabelBase.IResetDisplayContentConfig {
        /**
         * Title text content.
         */
        title?: string,
    }
}

/**
 * Title label with simplified build configuration and display helpers.
 */
declare class SimpleTitleLabel extends TitleLabel {
    /**
     * Create a simple title label component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional title label configuration.
     * @param creators - Optional custom creators for sub-objects.
     */
    constructor(
        scene: Phaser.Scene,
        config?: SimpleTitleLabel.IConfig,
        creators?: SimpleTitleLabel.ICreatorsConfig
    );

    /**
     * Reset displayed content.
     *
     * @param config - String content or display-content configuration.
     * @returns This component instance.
     */
    resetDisplayContent(
        config?: string | SimpleTitleLabel.IResetDisplayContentConfig
    ): this;

    /**
     * Set active state styling.
     *
     * @param enable - True to enable active state.
     * @returns This component instance.
     */
    setActiveState(enable?: boolean): this;
    /**
     * Set hover state styling.
     *
     * @param enable - True to enable hover state.
     * @returns This component instance.
     */
    setHoverState(enable?: boolean): this;
    /**
     * Set disable state styling.
     *
     * @param enable - True to enable disable state.
     * @returns This component instance.
     */
    setDisableState(enable?: boolean): this;
}
