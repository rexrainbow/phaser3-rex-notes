import Factory from './gameobjects/text/tagtext/Factory.js';
import Creator from './gameobjects/text/tagtext/Creator.js';
import TagText from './gameobjects/text/tagtext/TagText.js';

Phaser.GameObjects.GameObjectFactory.register('rexTagText', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexTagText', Creator);

export default TagText;