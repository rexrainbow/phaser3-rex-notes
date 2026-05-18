import OpenFileChooser from './behaviors/filechooser/Open';
import Factory from './gameobjects/dom/filechooser/Factory';
import Creator from './gameobjects/dom/filechooser/Creator';
import FileChooser from './gameobjects/dom/filechooser/FileChooser';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class FileChooserPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexFileChooser', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    // Note: Not working in iOS9+
    open(config?: any) {
        return OpenFileChooser(this.game, config);
    }
}

SetValue(window, 'RexPlugins.GameObjects.FileChooser', FileChooser);

export default FileChooserPlugin;