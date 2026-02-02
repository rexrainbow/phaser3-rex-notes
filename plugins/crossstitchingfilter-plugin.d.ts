// import * as Phaser from 'phaser';
import {
    CrossStitchingFilter,
    CrossStitchingController
} from './crossstitchingfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default CrossStitchingFilterPlugin;

/**
 * Cross stitching filter plugin declarations.
 */
declare namespace CrossStitchingFilterPlugin {
}

/**
 * Plugin that registers cross stitching filter support.
 */
declare class CrossStitchingFilterPlugin extends FilterPluginBase<CrossStitchingController, CrossStitchingController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a cross stitching filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created cross stitching controller.
             */
            addRexCrossStitching: (config?: CrossStitchingController.IConfig) => CrossStitchingController
        }
    }
}
