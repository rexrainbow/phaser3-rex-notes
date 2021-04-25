import Factory from './gameobjects/rendertexture/line/Factory.js';
import Creator from './gameobjects/rendertexture/line/Creator.js';
import Line from './gameobjects/rendertexture/line/Line.js';

Phaser.GameObjects.GameObjectFactory.register('rexLine', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexLine', Creator);

export default Line;