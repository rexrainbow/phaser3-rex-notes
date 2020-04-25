import Factory from './gameobjects/dom/youtubeplayer/Factory.js';
import Creator from './gameobjects/dom/youtubeplayer/Creator.js';
import YoutubePlayer from './gameobjects/dom/youtubeplayer/YoutubePlayer.js';

Phaser.GameObjects.GameObjectFactory.register('rexYoutubePlayer',Factory);
Phaser.GameObjects.GameObjectCreator.register('rexYoutubePlayer', Creator);

export default YoutubePlayer;