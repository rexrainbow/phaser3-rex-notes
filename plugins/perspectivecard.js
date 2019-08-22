import Factory from './gameobjects/perspectivecard/Factory.js';
import Creator from './gameobjects/perspectivecard/Creator.js';
import PerspectiveCard from './gameobjects/perspectivecard/PerspectiveCard.js';

Phaser.GameObjects.GameObjectFactory.register('rexPerspectiveCard', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexPerspectiveCard', Creator);

export default PerspectiveCard;