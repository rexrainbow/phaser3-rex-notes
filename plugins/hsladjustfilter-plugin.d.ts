// import * as Phaser from 'phaser';
import {
    HslAdjustFilter,
    HslAdjustController
} from './hsladjustfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default HslAdjustFilterPlugin;

declare namespace HslAdjustFilterPlugin {
}

declare class HslAdjustFilterPlugin extends FilterPluginBase<HslAdjustController, HslAdjustController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexHslAdjust: (config?: HslAdjustController.IConfig) => HslAdjustController
        }
    }
}