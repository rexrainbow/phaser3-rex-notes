// import * as Phaser from 'phaser';
import {
    ToonifyFilter,
    ToonifyController
} from './toonifyfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default ToonifyFilterPlugin;

/**
 * Toonify filter plugin declarations.
 */
declare namespace ToonifyFilterPlugin {
}

/**
 * Plugin that registers toonify filter support.
 */
declare class ToonifyFilterPlugin extends FilterPluginBase<ToonifyController, ToonifyController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a toonify filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created toonify controller.
             */
            addRexToonify: (config?: ToonifyController.IConfig) => ToonifyController
        }
    }
}
