import LoaderCallback from './loader/yamlloader/YAMLLoaderCallback.js';

class YAMLLoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexYAML', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load.rexYAML = LoaderCallback;
    }
}

export default YAMLLoaderPlugin;