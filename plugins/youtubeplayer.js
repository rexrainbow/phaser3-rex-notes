import Factory from './gameobjects/youtubeplayer/Factory.js';
import Creator from './gameobjects/youtubeplayer/Creator.js';
import YoutubePlayer from './gameobjects/youtubeplayer/YoutubePlayer.js';

Phaser.GameObjects.GameObjectFactory.register('rexYoutubePlayer',Factory);
Phaser.GameObjects.GameObjectCreator.register('rexYoutubePlayer', Creator);

export default YoutubePlayer;