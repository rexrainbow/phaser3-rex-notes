import Factory from './gameobjects/shader/effectlayer/outline/Factory.js';
import Creator from './gameobjects/shader/effectlayer/outline/Creator.js';
import OutlineEffectLayer from './gameobjects/shader/effectlayer/outline/OutlineEffectLayer.js';

Phaser.GameObjects.GameObjectFactory.register('rexOutlineEffectLayer', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexOutlineEffectLayer', Creator);

export default OutlineEffectLayer;