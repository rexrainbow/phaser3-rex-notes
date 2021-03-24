import Factory from './gameobjects/shape/shapes/Factory.js';
import Creator from './gameobjects/shape/shapes/Creator.js';
import Shapes from './gameobjects/shape/shapes/Shapes.js';

Phaser.GameObjects.GameObjectFactory.register('rexShapes', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexShapes', Creator);

export default Shapes;