import Factory from './gameobjects/inputtext/Factory.js';
import Creator from './gameobjects/inputtext/Creator.js';
import InputText from './gameobjects/inputtext/InputText.js';

Phaser.GameObjects.GameObjectFactory.register('rexInputText', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexInputText', Creator);

export default InputText;