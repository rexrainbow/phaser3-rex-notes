// import * as Phaser from 'phaser';
import {
    DissolveFilter,
    DissolveController
} from './dissolvefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default DissolveFilterPlugin;

declare namespace DissolveFilterPlugin {
}

declare class DissolveFilterPlugin extends FilterPluginBase<DissolveController, DissolveController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexDissolve: (config?: DissolveController.IConfig) => DissolveController
        }
    }
}