import DropDownList from '../../dropdownlist/DropDownList';
import BuildLabelConfig from './BuildLabelConfig';
import CreateBackground from './CreateBackground';
import Scrollable from '../scrollable/Scrollable';

export default BuildListConfig;

declare namespace BuildListConfig {
    interface IConfig extends DropDownList.IConfig {
        label?: BuildLabelConfig.IConfig,
        button?: BuildLabelConfig.IConfig,
        track?: CreateBackground.IConfig,
        thumb?: CreateBackground.IConfig,

        list?: {
            scroller?: Scrollable.IScrollerConfig;
            mouseWheelScroller?: Scrollable.IMouseWheelScroller;
            sliderAdaptThumbSize?: boolean;

            easeIn?: number;
            easeOut?: number;

            wrap?: boolean;
            maxHeight?: number;
            width?: number;
            height?: number;
            alignParent?: DropDownList.AlignParentType;
            expandDirection?: DropDownList.ExpandDirectionType;
            bounds?: Phaser.Geom.Rectangle;

            space?: DropDownList.SpaceType;

            draggable?: boolean;
        },
    }

    interface ICreators extends BuildLabelConfig.ICreators {
        label?: BuildLabelConfig.ICreators,
        button?: BuildLabelConfig.ICreators,
    }
}

declare function BuildListConfig(
    scene: Phaser.Scene,
    config?: BuildListConfig.IConfig,
    creators?: BuildListConfig.ICreators,
): DropDownList.IConfig