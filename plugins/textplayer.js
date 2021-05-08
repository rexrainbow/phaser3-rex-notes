import Factory from './gameobjects/dynamictext/textplayer/Factory';
import Creator from './gameobjects/dynamictext/textplayer/Creator.js';
import TextPlayer from './gameobjects/dynamictext/textplayer/TextPlayer.js';

Phaser.GameObjects.GameObjectFactory.register('rexTextPlayer', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexTextPlayer', Creator);

export default TextPlayer;