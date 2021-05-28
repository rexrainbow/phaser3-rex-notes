import Factory from './gameobjects/shader/effectlayer/Factory.js';
import Creator from './gameobjects/shader/effectlayer/Creator.js';
import EffectLayer from './gameobjects/shader/effectlayer/EffectLayer.js';

Phaser.GameObjects.GameObjectFactory.register('rexEffectLayer', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexEffectLayer', Creator);

export default EffectLayer;