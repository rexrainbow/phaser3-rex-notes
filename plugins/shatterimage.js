import Factory from './gameobjects/shatterimage/Factory.js';
import Creator from './gameobjects/shatterimage/Creator.js';
import ShatterImage from './gameobjects/shatterimage/ShatterImage.js';

Phaser.GameObjects.GameObjectFactory.register('rexShatterImage', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexShatterImage', Creator);

export default ShatterImage;