// import * as Phaser from 'phaser';
import {
    ColorReplaceFilter,
    ColorReplaceController
} from './colorreplacefilter';
import FilterPluginBase from './utils/renderer/filterpluginbase/FilterPluginBase';

export default ColorReplaceFilterPlugin;

declare namespace ColorReplaceFilterPlugin {
}

declare class ColorReplaceFilterPlugin extends FilterPluginBase<ColorReplaceController, ColorReplaceController.IConfig> {
}

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addRexColorReplace: (config?: ColorReplaceController.IConfig) => ColorReplaceController
        }
    }
}