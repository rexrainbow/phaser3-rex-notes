// import * as Phaser from 'phaser';
import {
    HslAdjustFilter,
    HslAdjustController
} from './hsladjustfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default HslAdjustFilterPlugin;

/**
 * HSL adjust filter plugin declarations.
 */
declare namespace HslAdjustFilterPlugin {
}

/**
 * Plugin that registers HSL adjust filter support.
 */
declare class HslAdjustFilterPlugin extends FilterPluginBase<HslAdjustController, HslAdjustController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add an HSL adjust filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created HSL adjust controller.
             */
            addRexHslAdjust: (config?: HslAdjustController.IConfig) => HslAdjustController
        }
    }
}
