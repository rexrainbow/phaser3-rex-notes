
import LoaderCallback from './loader/scripttag/ScriptTagLoaderCallback';

import { Plugins as PhaserPlugins } from 'phaser';
class ScriptTagLoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager?: any) {
        super(pluginManager);

        pluginManager.registerFileType('rexScriptTag', LoaderCallback);
    }

    addToScene(scene?: any) {
        scene.sys.load.rexScriptTag = LoaderCallback;
    }
}

export default ScriptTagLoaderPlugin;