import Factory from './gameobjects/rendertexture/ninepatch/Factory.js';
import Creator from './gameobjects/rendertexture/ninepatch/Creator.js';
import NinePatch from './gameobjects/rendertexture/ninepatch/NinePatch.js';

Phaser.GameObjects.GameObjectFactory.register('rexNinePatch', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexNinePatch', Creator);

export default NinePatch;