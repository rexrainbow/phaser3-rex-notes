import Factory from './gameobjects/line/Factory.js';
import Creator from './gameobjects/line/Creator.js';
import Line from './gameobjects/line/Line.js';

Phaser.GameObjects.GameObjectFactory.register('rexLine', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexLine', Creator);

export default Line;