// import * as Phaser from 'phaser';
import {
    SwirlFilter,
    SwirlController
} from './swirlfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default SwirlFilterPlugin;

/**
 * Swirl filter plugin declarations.
 */
declare namespace SwirlFilterPlugin {
}

/**
 * Plugin that registers swirl filter support.
 */
declare class SwirlFilterPlugin extends FilterPluginBase<SwirlController, SwirlController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a swirl filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created swirl controller.
             */
            addRexSwirl: (config?: SwirlController.IConfig) => SwirlController
        }
    }
}
