// import * as Phaser from 'phaser';
import {
    CrtFilter,
    CrtController
} from './crtfilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default CrtFilterPlugin;

/**
 * CRT filter plugin declarations.
 */
declare namespace CrtFilterPlugin {
}

/**
 * Plugin that registers CRT filter support.
 */
declare class CrtFilterPlugin extends FilterPluginBase<CrtController, CrtController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a CRT filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created CRT controller.
             */
            addRexCrt: (config?: CrtController.IConfig) => CrtController
        }
    }
}
