import Factory from './gameobjects/perspective/image/Factory.js';
import Creator from './gameobjects/perspective/image/Creator.js';
import PerspectiveImage from './gameobjects/perspective/image/Image.js';

Phaser.GameObjects.GameObjectFactory.register('rexPerspectiveImage', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexPerspectiveImage', Creator);

export default PerspectiveImage;