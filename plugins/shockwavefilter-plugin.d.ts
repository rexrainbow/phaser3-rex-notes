// import * as Phaser from 'phaser';
import {
    ShockwaveFilter,
    ShockwaveController
} from './shockwavefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default ShockwaveFilterPlugin;

declare namespace ShockwaveFilterPlugin {
}

declare class ShockwaveFilterPlugin extends FilterPluginBase<ShockwaveController, ShockwaveController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexShockwave: (config?: ShockwaveController.IConfig) => ShockwaveController
        }
    }
}