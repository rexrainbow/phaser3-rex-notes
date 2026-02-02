// import * as Phaser from 'phaser';
import {
    FishEyeFilter,
    FishEyeController
} from './fisheyefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default FishEyeFilterPlugin;

/**
 * Fish eye filter plugin declarations.
 */
declare namespace FishEyeFilterPlugin {
}

/**
 * Plugin that registers fish eye filter support.
 */
declare class FishEyeFilterPlugin extends FilterPluginBase<FishEyeController, FishEyeController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a fish eye filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created fish eye controller.
             */
            addRexFishEye: (config?: FishEyeController.IConfig) => FishEyeController
        }
    }
}
