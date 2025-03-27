// import * as Phaser from 'phaser';
import {
    SwirlFilter,
    SwirlController
} from './swirlfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default SwirlFilterPlugin;

declare namespace SwirlFilterPlugin {
}

declare class SwirlFilterPlugin extends FilterPluginBase<SwirlController, SwirlController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexSwirl: (config?: SwirlController.IConfig) => SwirlController
        }
    }
}