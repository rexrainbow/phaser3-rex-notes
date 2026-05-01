import LoaderCallback from './loader/yamlloader/YAMLLoaderCallback.js';

import { Plugins as PhaserPlugins } from 'phaser';
class YAMLLoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexYAML', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load.rexYAML = LoaderCallback;
    }
}

export default YAMLLoaderPlugin;