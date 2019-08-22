import Factory from './gameobjects/perspectivequad/Factory.js';
import Creator from './gameobjects/perspectivequad/Creator.js';
import PerspectiveQuad from './gameobjects/perspectivequad/PerspectiveQuad.js';

Phaser.GameObjects.GameObjectFactory.register('rexPerspectiveQuad', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexPerspectiveQuad', Creator);

export default PerspectiveQuad;