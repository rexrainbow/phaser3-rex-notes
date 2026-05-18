import Factory from './gameobjects/dom/filedropzone/Factory';
import Creator from './gameobjects/dom/filedropzone/Creator';
import FileDropZone from './gameobjects/dom/filedropzone/FileDropZone';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class FileDropZonePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
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