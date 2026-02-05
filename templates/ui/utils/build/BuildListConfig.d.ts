import DropDownList from '../../dropdownlist/DropDownList';
import BuildLabelConfig from './BuildLabelConfig';
import CreateBackground from './CreateBackground';
import Scrollable from '../scrollable/Scrollable';

export default BuildListConfig;

declare namespace BuildListConfig {
    /**
     * Configuration options for building a dropdown list config.
     */
    interface IConfig extends DropDownList.IConfig {
        /**
         * Label style configuration.
         */
        label?: BuildLabelConfig.IConfig,
        /**
         * Button style configuration.
         */
        button?: BuildLabelConfig.IConfig,
        /**
         * Slider track style configuration.
         */
        track?: CreateBackground.IConfig,
        /**
         * Slider thumb style configuration.
         */
        thumb?: CreateBackground.IConfig,

        list?: {
            /**
             * Scroller behavior configuration.
             */
            scroller?: Scrollable.IScrollerConfig;
            /**
             * Mouse wheel scroller behavior configuration.
             */
            mouseWheelScroller?: Scrollable.IMouseWheelScroller;
            /**
             * Set to true to adapt thumb size to content.
             */
            sliderAdaptThumbSize?: boolean;

            /**
             * Ease-in duration in milliseconds.
             */
            easeIn?: number;
            /**
             * Ease-out duration in milliseconds.
             */
            easeOut?: number;

            /**
             * Set to true to use wrapped layout.
             */
            wrap?: boolean;
            /**
             * Maximum panel height.
             */
            maxHeight?: number;
            /**
             * Panel width.
             */
            width?: number;
            /**
             * Panel height.
             */
            height?: number;
            /**
             * Parent alignment mode.
             */
            alignParent?: DropDownList.AlignParentType;
            /**
             * Panel expand direction.
             */
            expandDirection?: DropDownList.ExpandDirectionType;
            /**
             * Bounds rectangle for panel placement.
             */
            bounds?: Phaser.Geom.Rectangle;

            /**
             * List spacing configuration.
             */
            space?: DropDownList.SpaceType;

            /**
             * Set to true to allow dragging list panel.
             */
            draggable?: boolean;
        },
    }

    /**
     * Factory callbacks used to create list-related objects.
     */
    interface ICreators extends BuildLabelConfig.ICreators {
        /**
         * Label creators.
         */
        label?: BuildLabelConfig.ICreators,
        /**
         * Button creators.
         */
        button?: BuildLabelConfig.ICreators,
    }
}

/**
 * Build a normalized dropdown list configuration from style configs and creators.
 *
 * @param scene - Scene that owns created objects.
 * @param config - Optional source configuration.
 * @param creators - Optional factory callbacks.
 * @returns Normalized dropdown list configuration.
 */
declare function BuildListConfig(
    scene: Phaser.Scene,
    config?: BuildListConfig.IConfig,
    creators?: BuildListConfig.ICreators
): DropDownList.IConfig;
