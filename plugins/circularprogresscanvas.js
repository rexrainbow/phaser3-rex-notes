import Factory from './gameobjects/canvas/circularprogress/Factory.js';
import Creator from './gameobjects/canvas/circularprogress/Creator.js';
import CircularProgressCanvas from './gameobjects/canvas/circularprogress/CircularProgress.js';

Phaser.GameObjects.GameObjectFactory.register('rexCircularProgressCanvas', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexCircularProgressCanvas', Creator);

export default CircularProgressCanvas;