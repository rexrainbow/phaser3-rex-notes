// import * as Phaser from 'phaser';
import {
    ShockwaveFilter,
    ShockwaveController
} from './shockwavefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default ShockwaveFilterPlugin;

/**
 * Shockwave filter plugin declarations.
 */
declare namespace ShockwaveFilterPlugin {
}

/**
 * Plugin that registers shockwave filter support.
 */
declare class ShockwaveFilterPlugin extends FilterPluginBase<ShockwaveController, ShockwaveController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a shockwave filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created shockwave controller.
             */
            addRexShockwave: (config?: ShockwaveController.IConfig) => ShockwaveController
        }
    }
}
