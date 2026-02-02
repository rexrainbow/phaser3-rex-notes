// import * as Phaser from 'phaser';
import {
    WarpFilter,
    WarpController
} from './warpfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default WarpFilterPlugin;

/**
 * Warp filter plugin declarations.
 */
declare namespace WarpFilterPlugin {
}

/**
 * Plugin that registers warp filter support.
 */
declare class WarpFilterPlugin extends FilterPluginBase<WarpController, WarpController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a warp filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created warp controller.
             */
            addRexWarp: (config?: WarpController.IConfig) => WarpController
        }
    }
}
