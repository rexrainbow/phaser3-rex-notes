// import * as Phaser from 'phaser';
import {
    HorrifiFilter,
    HorrifiController
} from './horrififilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default HorrifiFilterPlugin;

/**
 * Horrifi filter plugin declarations.
 */
declare namespace HorrifiFilterPlugin {
}

/**
 * Plugin that registers horrifi filter support.
 */
declare class HorrifiFilterPlugin extends FilterPluginBase<HorrifiController, HorrifiController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a horrifi filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created horrifi controller.
             */
            addRexHorrifi: (config?: HorrifiController.IConfig) => HorrifiController
        }
    }
}
