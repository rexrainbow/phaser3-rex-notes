import FSM from 'rexPlugins/fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent; // Bejeweled
        this.scene = parent.scene; // Bejeweled.scene
        this.board = parent.board; // Bejeweled.board

        var debug = GetValue(config, 'debug', false);
        if (debug) {
            this.on('statechange', this.printState, this);
        }
    }

    // START
    enter_START() {
        this.board.init(); // Fill background tiles
        this.next();
    }
    next_START() {
        return 'RESET';
    }
    // START

    // RESET
    enter_RESET() {
        this.board.reset(); // Refill chess
        this.next();
    }
    next_RESET() {
        return 'PRETEST';
    }
    // RESET


    // PRETEST
    enter_PRETEST() {
        this.next();
    }
    next_PRETEST() {
        var nextState;
        if (this.board.preTest()) {
            nextState = 'SELECT1';
        } else {
            nextState = 'RESET';
        }
        return nextState;
    }

    // SELECT1
    next_SELECT1() {
        return 'SELECT2';
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

    // debug
    printState() {
        console.log('Main state: ' + this.prevState + ' -> ' + this.state);
    }

    // select chess
    selectChess(chess) {
        switch (this.state) {
            case 'SELECT1':
                this.selectedChess1 = chess; // TODO:
                this.next();
                break;
            case 'SELECT2':
                this.selectedChess2 = chess; // TODO:
                this.next();
                break;
        }
    }
}

export default State;