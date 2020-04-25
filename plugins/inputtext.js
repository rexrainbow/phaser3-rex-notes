import Factory from './gameobjects/dom/inputtext/Factory.js';
import Creator from './gameobjects/dom/inputtext/Creator.js';
import InputText from './gameobjects/dom/inputtext/InputText.js';

Phaser.GameObjects.GameObjectFactory.register('rexInputText', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexInputText', Creator);

export default InputText;