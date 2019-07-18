import Factory from './gameobjects/persistenceeffect/Factory.js';
import Creator from './gameobjects/persistenceeffect/Creator.js';
import PersistenceEffect from './gameobjects/persistenceeffect/PersistenceEffect.js';

Phaser.GameObjects.GameObjectFactory.register('rexPersistenceEffect', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexPersistenceEffect', Creator);

export default PersistenceEffect;