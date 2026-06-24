// import * as Phaser from 'phaser';
import {
    RectangleMaskFilter,
    RectangleMaskController
} from './rectanglemaskfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default RectangleMaskFilterPlugin;

/**
 * RectangleMask filter plugin declarations.
 */
declare namespace RectangleMaskFilterPlugin {
}

/**
 * Plugin that registers shockwave filter support.
 */
declare class RectangleMaskFilterPlugin extends FilterPluginBase<RectangleMaskController, RectangleMaskController.IConfig> {
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
            addRexRectangleMask: (config?: RectangleMaskController.IConfig) => RectangleMaskController
        }
    }
}
