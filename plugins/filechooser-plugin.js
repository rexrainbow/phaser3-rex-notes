import OpenFileChooser from './behaviors/filechooser/Open.js';
import Factory from './gameobjects/dom/filechooser/Factory.js';
import Creator from './gameobjects/dom/filechooser/Creator.js';
import FileChooser from './gameobjects/dom/filechooser/FileChooser.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class FileChooserPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexFileChooser', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    // Note: Not working in iOS9+
    open(config) {
        return OpenFileChooser(this.game, config);
    }
}

SetValue(window, 'RexPlugins.GameObjects.FileChooser', FileChooser);

export default FileChooserPlugin;