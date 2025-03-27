// import * as Phaser from 'phaser';
import {
    CrossStitchingFilter,
    CrossStitchingController
} from './crossstitchingfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default CrossStitchingFilterPlugin;

declare namespace CrossStitchingFilterPlugin {
}

declare class CrossStitchingFilterPlugin extends FilterPluginBase<CrossStitchingController, CrossStitchingController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexCrossStitching: (config?: CrossStitchingController.IConfig) => CrossStitchingController
        }
    }
}