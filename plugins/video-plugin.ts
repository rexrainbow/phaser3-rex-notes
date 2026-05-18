import VideoDOMFactory from './gameobjects/video/videodom/Factory';
import VideoDOMCreator from './gameobjects/video/videodom/Creator';
import VideoCanvasFactory from './gameobjects/video/videocanvas/Factory';
import VideoCanvasCreator from './gameobjects/video/videocanvas/Creator';
import VideoDOM from './gameobjects/video/videodom/VideoDOM';
import VideoCanvas from './gameobjects/video/videocanvas/VideoCanvas';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class VideoPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexVideo', VideoDOMFactory, VideoDOMCreator);
        pluginManager.registerGameObject('rexVideoCanvas', VideoCanvasFactory, VideoCanvasCreator);        
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Video', VideoDOM);
SetValue(window, 'RexPlugins.GameObjects.VideoCanvas', VideoCanvas);

export default VideoPlugin;