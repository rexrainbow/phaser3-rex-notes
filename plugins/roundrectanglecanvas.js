import Factory from './gameobjects/canvas/roundrectangle/Factory.js';
import Creator from './gameobjects/canvas/roundrectangle/Creator.js';
import RoundRecrangle from './gameobjects/canvas/roundrectangle/RoundRectangle.js';

Phaser.GameObjects.GameObjectFactory.register('rexRoundRectangleCanvas', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexRoundRectangleCanvas', Creator);

export default RoundRecrangle;