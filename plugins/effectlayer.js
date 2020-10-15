import Factory from './gameobjects/effectlayer/Factory.js';
import Creator from './gameobjects/effectlayer/Creator.js';
import EffectLayer from './gameobjects/effectlayer/EffectLayer.js';

Phaser.GameObjects.GameObjectFactory.register('rexEffectLayer', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexEffectLayer', Creator);

export default EffectLayer;