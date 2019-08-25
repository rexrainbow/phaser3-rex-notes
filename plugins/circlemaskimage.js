import Factory from './gameobjects/circlemaskimage/Factory.js';
import Creator from './gameobjects/circlemaskimage/Creator.js';
import CircleMaskImage from './gameobjects/circlemaskimage/CircleMaskImage.js';

Phaser.GameObjects.GameObjectFactory.register('rexCircleMaskImage', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexCircleMaskImage', Creator);

export default CircleMaskImage;