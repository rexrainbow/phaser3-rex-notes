// import * as Phaser from 'phaser';
import {
    SplitFilter,
    SplitController
} from './splitfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default SplitFilterPlugin;

/**
 * Split filter plugin declarations.
 */
declare namespace SplitFilterPlugin {
}

/**
 * Plugin that registers split filter support.
 */
declare class SplitFilterPlugin extends FilterPluginBase<SplitController, SplitController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a split filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created split controller.
             */
            addRexSplit: (config?: SplitController.IConfig) => SplitController
        }
    }
}
