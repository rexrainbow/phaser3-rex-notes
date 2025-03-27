// import * as Phaser from 'phaser';
import {
    WarpFilter,
    WarpController
} from './warpfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default WarpFilterPlugin;

declare namespace WarpFilterPlugin {
}

declare class WarpFilterPlugin extends FilterPluginBase<WarpController, WarpController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexWarp: (config?: WarpController.IConfig) => WarpController
        }
    }
}