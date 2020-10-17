import Factory from './gameobjects/canvas/circlemaskimage/Factory.js';
import Creator from './gameobjects/canvas/circlemaskimage/Creator.js';
import CircleMaskImage from './gameobjects/canvas/circlemaskimage/CircleMaskImage.js';

Phaser.GameObjects.GameObjectFactory.register('rexCircleMaskImage', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexCircleMaskImage', Creator);

export default CircleMaskImage;