import Factory from './gameobjects/shape/customshapes/Factory.js';
import Creator from './gameobjects/shape/customshapes/Creator.js';
import CustomShapes from './gameobjects/shape/customshapes/CustomShapes.js';

Phaser.GameObjects.GameObjectFactory.register('rexCustomShapes', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexCustomShapes', Creator);

export default CustomShapes;