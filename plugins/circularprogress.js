import Factory from './gameobjects/canvas/circularprogress/Factory.js';
import Creator from './gameobjects/canvas/circularprogress/Creator.js';
import CircularProgress from './gameobjects/canvas/circularprogress/CircularProgress.js';

Phaser.GameObjects.GameObjectFactory.register('rexCircularProgress', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexCircularProgress', Creator);

export default CircularProgress;