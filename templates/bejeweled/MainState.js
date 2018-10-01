import FSM from 'rexPlugins/fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;

        var debug = GetValue(config, 'debug', false);
        if (debug) {
            this.on('statechange', this.printState, this);
        }
    }

    // START
    enter_START() {
        this.parent.board.init();
        this.next();
    }
    next_START() {
        return 'RESET';
    }
    // START

    // RESET
    enter_RESET() {
        this.parent.board.reset();
    }    
    next_RESET() {
        return 'PRETEST';
    }
    // RESET


    // PRETEST
    next_PRETEST() {
        var nextState;
        if (HAS_POSSIBLE_MATCH3) {
            nextState = 'SELECT1';
        } else {
            nextState = 'RESET';
        }
        return nextState;
    }

    enter_PRETEST() {

    }

    // SELECT1
    next_SELECT1() {
        return 'SELECT2';
    }

    enter_PRETEST() {

    }

    // SELECT2
    next_SELECT2() {
        return 'SWAP';
    }

    // SWAP
    next_SWAP() {
        return 'MATCH3';
    }

    // MATCH3
    next_MATCH3() {
        var nextState;
        if (matchedCnt === 0) {
            nextState = 'UNDOSWAP';
        } else {
            nextState = 'PRETEST';
        }
        return nextState;
    }

    // UNDO_SWAP
    next_UNDOSWAP() {
        return 'SELECT1';
    }

    printState() {
        console.log('Main state: ' + this.prevState + ' -> ' + this.state);
    }
}

export default State;