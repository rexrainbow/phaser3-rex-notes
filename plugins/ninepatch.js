import Factory from './gameobjects/ninepatch/Factory.js';
import Creator from './gameobjects/ninepatch/Creator.js';
import NinePatch from './gameobjects/ninepatch/NinePatch.js';

Phaser.GameObjects.GameObjectFactory.register('rexNinePatch', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexNinePatch', Creator);

export default NinePatch;