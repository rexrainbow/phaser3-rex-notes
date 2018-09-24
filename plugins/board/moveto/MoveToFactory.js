import MoveTo from './MoveTo.js';
import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('moveTo', function (gameObject, config) {
    return new MoveTo(gameObject, config);
});

if (Phaser.rexBoard === undefined) {
    Phaser.rexBoard = {};
}
Phaser.rexBoard.MoveTo = MoveTo;

export default MoveTo;