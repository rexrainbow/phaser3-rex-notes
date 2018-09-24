import Match from './Match.js';
import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('match', function (config) {
    return new Match(config);
});

if (Phaser.rexBoard === undefined) {
    Phaser.rexBoard = {};
}
Phaser.rexBoard.Match = Match;

export default Match;