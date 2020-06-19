import Factory from './gameobjects/effectlayer/outline/Factory.js';
import Creator from './gameobjects/effectlayer/outline/Creator.js';
import OutlineEffectLayer from './gameobjects/effectlayer/outline/OutlineEffectLayer.js';

Phaser.GameObjects.GameObjectFactory.register('rexOutlineEffectLayer', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexOutlineEffectLayer', Creator);

export default OutlineEffectLayer;