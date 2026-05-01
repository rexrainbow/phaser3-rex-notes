
import LoaderCallback from './loader/scripttag/ScriptTagLoaderCallback.js';

import { Plugins as PhaserPlugins } from 'phaser';
class ScriptTagLoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexScriptTag', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load.rexScriptTag = LoaderCallback;
    }
}

export default ScriptTagLoaderPlugin;