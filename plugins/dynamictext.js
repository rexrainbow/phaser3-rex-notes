import Factory from './gameobjects/dynamictext/dynamictext/Factory';
import Creator from './gameobjects/dynamictext/dynamictext/Creator.js.js';
import DynamicText from './gameobjects/dynamictext/dynamictext/DynamicText.js';

Phaser.GameObjects.GameObjectFactory.register('rexDynamicText', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexDynamicText', Creator);

export default DynamicText;