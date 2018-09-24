import PathFinder from './PathFinder.js';
import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('pathFinder', function (gameObject, config) {
    return new PathFinder(gameObject, config);
});

if (Phaser.rexBoard === undefined) {
    Phaser.rexBoard = {};
}
Phaser.rexBoard.PathFinder = PathFinder;

export default PathFinder;