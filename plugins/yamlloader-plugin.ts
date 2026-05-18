import LoaderCallback from './loader/yamlloader/YAMLLoaderCallback';

import { Plugins as PhaserPlugins } from 'phaser';
class YAMLLoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager?: any) {
        super(pluginManager);

        pluginManager.registerFileType('rexYAML', LoaderCallback);
    }

    addToScene(scene?: any) {
        scene.sys.load.rexYAML = LoaderCallback;
    }
}

export default YAMLLoaderPlugin;