
import LoaderCallback from './loader/imageuri/ImageURILoaderCallback';

import { Plugins as PhaserPlugins } from 'phaser';
class ImageURILoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager?: any) {
        super(pluginManager);

        pluginManager.registerFileType('rexImageURI', LoaderCallback);
    }

    addToScene(scene?: any) {
        scene.sys.load['rexImageURI'] = LoaderCallback;
    }
}

export default ImageURILoaderPlugin;