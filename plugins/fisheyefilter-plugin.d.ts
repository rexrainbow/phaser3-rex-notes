// import * as Phaser from 'phaser';
import {
    FishEyeFilter,
    FishEyeController
} from './fisheyefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default FishEyeFilterPlugin;

declare namespace FishEyeFilterPlugin {
}

declare class FishEyeFilterPlugin extends FilterPluginBase<FishEyeController, FishEyeController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexFishEye: (config?: FishEyeController.IConfig) => FishEyeController
        }
    }
}