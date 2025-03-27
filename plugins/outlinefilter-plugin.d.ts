// import * as Phaser from 'phaser';
import {
    OutlineFilter,
    OutlineController
} from './outlinefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default OutlineFilterPlugin;

declare namespace OutlineFilterPlugin {
}

declare class OutlineFilterPlugin extends FilterPluginBase<OutlineController, OutlineController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexOutline: (config?: OutlineController.IConfig) => OutlineController
        }
    }
}