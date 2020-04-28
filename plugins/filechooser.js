import OpenFileChooser from './behaviors/filechooser/Open.js';

import Factory from './gameobjects/dom/filechooser/Factory.js';
import Creator from './gameobjects/dom/filechooser/Creator.js';
import FileChooser from './gameobjects/dom/filechooser/FileChooser.js';

Phaser.GameObjects.GameObjectFactory.register('rexFileChooser', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexFileChooser', Creator);

export { OpenFileChooser, FileChooser };