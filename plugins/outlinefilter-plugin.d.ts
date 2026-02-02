// import * as Phaser from 'phaser';
import {
    OutlineFilter,
    OutlineController
} from './outlinefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default OutlineFilterPlugin;

/**
 * Outline filter plugin declarations.
 */
declare namespace OutlineFilterPlugin {
}

/**
 * Plugin that registers outline filter support.
 */
declare class OutlineFilterPlugin extends FilterPluginBase<OutlineController, OutlineController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add an outline filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created outline controller.
             */
            addRexOutline: (config?: OutlineController.IConfig) => OutlineController
        }
    }
}
