import Factory from './gameobjects/dynamictext/bbcodedynamictext/Factory';
import Creator from './gameobjects/dynamictext/bbcodedynamictext/Creator.js';
import BBCodeDynamicText from './gameobjects/dynamictext/bbcodedynamictext/BBCodeDynamicText.js';

Phaser.GameObjects.GameObjectFactory.register('rexBBCodeDynamicText', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexBBCodeDynamicText', Creator);

export default BBCodeDynamicText;