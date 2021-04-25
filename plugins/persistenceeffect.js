import Factory from './gameobjects/blitter/persistenceeffect/Factory.js';
import Creator from './gameobjects/blitter/persistenceeffect/Creator.js';
import PersistenceEffect from './gameobjects/blitter/persistenceeffect/PersistenceEffect.js';

Phaser.GameObjects.GameObjectFactory.register('rexPersistenceEffect', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexPersistenceEffect', Creator);

export default PersistenceEffect;