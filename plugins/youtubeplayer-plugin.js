import Factory from './gameobjects/dom/youtubeplayer/Factory.js';
import Creator from './gameobjects/dom/youtubeplayer/Creator.js';
import YoutubePlayer from './gameobjects/dom/youtubeplayer/YoutubePlayer.js';
import SetValue from './utils/object/SetValue.js';

import { Plugins as PhaserPlugins } from 'phaser';
class YoutubePlayerPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexYoutubePlayer', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.YoutubePlayer', YoutubePlayer);

export default YoutubePlayerPlugin;