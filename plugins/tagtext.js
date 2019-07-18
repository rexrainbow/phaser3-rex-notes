import Factory from './gameobjects/tagtext/Factory.js';
import Creator from './gameobjects/tagtext/Creator.js';
import TagText from './gameobjects/tagtext/TagText.js';

Phaser.GameObjects.GameObjectFactory.register('rexTagText', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexTagText', Creator);

export default TagText;