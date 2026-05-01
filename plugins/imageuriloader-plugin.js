
import LoaderCallback from './loader/imageuri/ImageURILoaderCallback.js';

import { Plugins as PhaserPlugins } from 'phaser';
class ImageURILoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexImageURI', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load['rexImageURI'] = LoaderCallback;
    }
}

export default ImageURILoaderPlugin;