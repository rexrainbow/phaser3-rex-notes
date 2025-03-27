// import * as Phaser from 'phaser';
import {
    SplitFilter,
    SplitController
} from './splitfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default SplitFilterPlugin;

declare namespace SplitFilterPlugin {
}

declare class SplitFilterPlugin extends FilterPluginBase<SplitController, SplitController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexSplit: (config?: SplitController.IConfig) => SplitController
        }
    }
}