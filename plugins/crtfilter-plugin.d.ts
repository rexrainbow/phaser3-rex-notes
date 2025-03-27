// import * as Phaser from 'phaser';
import {
    CrtFilter,
    CrtController
} from './crtfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default CrtFilterPlugin;

declare namespace CrtFilterPlugin {
}

declare class CrtFilterPlugin extends FilterPluginBase<CrtController, CrtController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexCrt: (config?: CrtController.IConfig) => CrtController
        }
    }
}