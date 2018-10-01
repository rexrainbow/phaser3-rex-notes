import MainState from './MainState.js';
import MatchState from './MatchState.js';
import Board from './Board.js';

const EE = Phaser.Events.EventEmitter;

class Bejeweled extends EE {
    constructor(scene, config) {
        super();

        this.scene = scene;
        this.mainState = new MainState(this, config);
        this.matchState = new MatchState(this, config);
        this.board = new Board(scene, config);
    }

    start() {
        this.mainState.goto('START');
    }
}
export default Bejeweled;