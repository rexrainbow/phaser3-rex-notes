import Factory from './gameobjects/canvas/dynamictext/Factory';
import Creator from './gameobjects/canvas/dynamictext/Creator.js';
import DynamicText from './gameobjects/canvas/dynamictext/DynamicText.js';

Phaser.GameObjects.GameObjectFactory.register('rexDynamicText', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexDynamicText', Creator);

export default DynamicText;