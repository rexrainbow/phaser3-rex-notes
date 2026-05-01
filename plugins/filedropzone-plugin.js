import Factory from './gameobjects/dom/filedropzone/Factory.js';
import Creator from './gameobjects/dom/filedropzone/Creator.js';
import FileDropZone from './gameobjects/dom/filedropzone/FileDropZone.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class FileDropZonePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexFileDropZone', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.FileDropZone', FileDropZone);

export default FileDropZonePlugin;