import Factory from './gameobjects/bbocdetext/Factory.js';
import Creator from './gameobjects/bbocdetext/Creator.js';
import BBCodeText from './gameobjects/bbocdetext/BBCodeText.js'

Phaser.GameObjects.GameObjectFactory.register('rexBBCodeText', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexBBCodeText', Creator);

export default BBCodeText;