import Label from '../label/Label';
import BuildLabelConfig from '../utils/build/BuildLabelConfig';

export default SimpleLabel;

declare namespace SimpleLabel {
    interface IConfig extends BuildLabelConfig.IConfig {
    }

    interface ICreatorsConfig extends BuildLabelConfig.ICreators {
    }

    interface IResetDisplayContentConfig extends Label.IResetDisplayContentConfig {
    }
}

/**
 * Label wrapper that builds child elements from creators and config.
 * @remarks Adds helpers to toggle active/hover/disable states on children.
 */
declare class SimpleLabel extends Label {
    /**
     * Create a simple label.
     * @param scene - The Scene to which this object belongs.
     * @param config - Label configuration or build config.
     * @param creators - Element creators for building label parts.
     */
    constructor(
        scene: Phaser.Scene,
        config?: SimpleLabel.IConfig,
        creators?: SimpleLabel.ICreatorsConfig
    );

    /**
     * Toggle active state on all children that implement setActiveState.
     * @param enable - True to enable the active state.
     * @returns This instance.
     */
    setActiveState(enable?: boolean): this;
    /**
     * Toggle hover state on all children that implement setHoverState.
     * @param enable - True to enable the hover state.
     * @returns This instance.
     */
    setHoverState(enable?: boolean): this;
    /**
     * Toggle disable state on all children that implement setDisableState.
     * @param enable - True to enable the disable state.
     * @returns This instance.
     */
    setDisableState(enable?: boolean): this;
}
