import Factory from './gameobjects/shape/circularprogress/Factory.js';
import Creator from './gameobjects/shape/circularprogress/Creator.js';
import CircularProgress from './gameobjects/shape/circularprogress/CircularProgress.js';

Phaser.GameObjects.GameObjectFactory.register('rexCircularProgress', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexCircularProgress', Creator);

export default CircularProgress;