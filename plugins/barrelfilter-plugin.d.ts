// import * as Phaser from 'phaser';
import {
    BarrelFilter,
    BarrelController
} from './barrelfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default BarrelFilterPlugin;

/**
 * Barrel filter plugin declarations.
 */
declare namespace BarrelFilterPlugin {
}

/**
 * Plugin that registers barrel filter support.
 */
declare class BarrelFilterPlugin extends FilterPluginBase<BarrelController, BarrelController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a barrel filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created barrel controller.
             */
            addRexBarrel: (config?: BarrelController.IConfig) => BarrelController
        }
    }
}
