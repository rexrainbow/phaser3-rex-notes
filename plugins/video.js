import VideoDOMFactory from './gameobjects/video/videodom/Factory.js';
import VideoDOMCreator from './gameobjects/video/videodom/Creator.js';
import VideoCanvasFactory from './gameobjects/video/videocanvas/Factory.js';
import VideoCanvasCreator from './gameobjects/video/videocanvas/Creator.js';
import VideoDOM from './gameobjects/video/videodom/VideoDOM.js';
import VideoCanvas from './gameobjects/video/videocanvas/VideoCanvas.js';

Phaser.GameObjects.GameObjectFactory.register('rexVideo', VideoDOMFactory);
Phaser.GameObjects.GameObjectCreator.register('rexVideo', VideoDOMCreator);

Phaser.GameObjects.GameObjectFactory.register('rexVideoCanvas', VideoCanvasFactory);
Phaser.GameObjects.GameObjectCreator.register('rexVideoCanvas', VideoCanvasCreator);

export { VideoDOM, VideoCanvas };