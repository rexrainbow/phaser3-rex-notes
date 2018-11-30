import FSM from '../../../plugins/fsm.js';
import MatchState from './MatchState.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent; // Bejeweled
        this.scene = parent.scene; // Bejeweled.scene
        this.board = parent.board; // Bejeweled.board
        this.selectedChess1;
        this.selectedChess2;
        this.matchState = new MatchState(parent, config); // sub-state        

        var debug = GetValue(config, 'debug', false);
        if (debug) {
            this.on('statechange', this.printState, this);
        }
    }

    shutdown() {
        super.shutdown();
        this.matchState.shutdown();

        this.parent = undefined;
        this.scene = undefined;
        this.board = undefined;
        this.selectedChess1 = undefined;
        this.selectedChess2 = undefined;
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
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
    // PRETEST

    // SELECT1
    enter_SELECT1() {
        this.selectedChess1 = undefined;
        this.selectedChess2 = undefined;
    }
    next_SELECT1() {
        var nextState;
        if (this.selectedChess1 !== undefined) {
            nextState = 'SELECT2';
        }
        return nextState;
    }
    // SELECT1


    // SELECT2    
    next_SELECT2() {
        var nextState;
        if ((this.selectedChess2 !== undefined) &&
            this.board.board.areNeighbors(this.selectedChess1, this.selectedChess2)) {
            nextState = 'SWAP';
        } else {
            nextState = 'SELECT1';
        }
        return nextState;
    }
    // SELECT2

    // SWAP
    enter_SWAP() {
        this.board.swapChess(this.selectedChess1, this.selectedChess2, this.next, this);
    }
    next_SWAP() {
        return 'MATCH3';
    }
    // SWAP

    // MATCH3
    enter_MATCH3() {
        this.matchState
            .once('complete', this.next, this)
            .goto('START');
    }
    next_MATCH3() {
        var nextState;
        if (this.matchState.totalMatchedLinesCount === 0) {
            nextState = 'UNDOSWAP';
        } else {
            nextState = 'PRETEST';
        }
        return nextState;
    }
    // MATCH3

    // UNDO_SWAP
    enter_UNDOSWAP() {
        this.board.swapChess(this.selectedChess1, this.selectedChess2, this.next, this);
    }
    next_UNDOSWAP() {
        return 'SELECT1';
    }
    // UNDO_SWAP

    // debug
    printState() {
        console.log('Main state: ' + this.prevState + ' -> ' + this.state);
    }

    // Select chess
    selectChess(chess) {
        switch (this.state) {
            case 'SELECT1':
                this.selectedChess1 = chess;
                this.next();
                break;
            case 'SELECT2':
                this.selectedChess2 = chess;
                this.next();
                break;
        }
    }
}

export default State;