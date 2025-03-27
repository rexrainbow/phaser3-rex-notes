// import * as Phaser from 'phaser';
import {
    HorrifiFilter,
    HorrifiController
} from './horrififilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default HorrifiFilterPlugin;

declare namespace HorrifiFilterPlugin {
}

declare class HorrifiFilterPlugin extends FilterPluginBase<HorrifiController, HorrifiController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexHorrifi: (config?: HorrifiController.IConfig) => HorrifiController
        }
    }
}