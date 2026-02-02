// import * as Phaser from 'phaser';
import {
    DissolveFilter,
    DissolveController
} from './dissolvefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default DissolveFilterPlugin;

/**
 * Dissolve filter plugin declarations.
 */
declare namespace DissolveFilterPlugin {
}

/**
 * Plugin that registers dissolve filter support.
 */
declare class DissolveFilterPlugin extends FilterPluginBase<DissolveController, DissolveController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a dissolve filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created dissolve controller.
             */
            addRexDissolve: (config?: DissolveController.IConfig) => DissolveController
        }
    }
}
