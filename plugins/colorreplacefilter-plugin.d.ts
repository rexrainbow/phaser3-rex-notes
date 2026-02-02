// import * as Phaser from 'phaser';
import {
    ColorReplaceFilter,
    ColorReplaceController
} from './colorreplacefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default ColorReplaceFilterPlugin;

/**
 * Color replace filter plugin declarations.
 */
declare namespace ColorReplaceFilterPlugin {
}

/**
 * Plugin that registers color replace filter support.
 */
declare class ColorReplaceFilterPlugin extends FilterPluginBase<ColorReplaceController, ColorReplaceController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            /**
             * Add a color replace filter controller to this filter list.
             *
             * @param config - Optional controller configuration.
             * @returns The created color replace controller.
             */
            addRexColorReplace: (config?: ColorReplaceController.IConfig) => ColorReplaceController
        }
    }
}
