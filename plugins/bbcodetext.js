import Factory from './gameobjects/text/bbocdetext/Factory.js';
import Creator from './gameobjects/text/bbocdetext/Creator.js';
import BBCodeText from './gameobjects/text/bbocdetext/BBCodeText.js'

Phaser.GameObjects.GameObjectFactory.register('rexBBCodeText', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexBBCodeText', Creator);

export default BBCodeText;