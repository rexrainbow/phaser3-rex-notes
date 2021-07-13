import FSM from '../../../plugins/fsm.js';
import MatchState from './MatchState.js';
import SwapChess from '../board/actions/SwapChess.js'

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

        // Actions
        // Swap action
        this.swapAction = GetValue(config, 'swapAction', SwapChess);
        this.swapActionScope = GetValue(config, 'swapActionScope', undefined);
        // UndoSwap action
        this.undoSwapAction = GetValue(config, 'undoSwapAction', this.swapAction);
        this.undoSwapActionScope = GetValue(config, 'undoSwapActionScope', this.swapActionScope);

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

        this.parent.emit('select1', this.board.board, this.parent);
    }
    next_SELECT1() {
        var nextState;
        if (this.selectedChess1) {
            nextState = 'SELECT2';
        }
        return nextState;
    }
    // SELECT1


    // SELECT2
    enter_SELECT2() {
        this.parent.emit('select2', this.board.board, this.parent);
    }
    next_SELECT2() {
        var nextState;
        if (this.selectedChess2 &&
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
        var board = this.board.board,
            chess1 = this.selectedChess1,
            chess2 = this.selectedChess2,
            callback = this.swapAction,
            scope = this.swapActionScope;

        this.parent.emit('swap', chess1, chess2, board, this.parent);

        if (scope) {
            callback.call(scope, chess1, chess2, board, this.parent);
        } else {
            callback(chess1, chess2, board, this.parent);
        }

        // To next state when all completed
        var waitEvents = this.parent.waitEvents;
        if (waitEvents.noWaitEvent) {
            this.next();
        } else {
            waitEvents.setCompleteCallback(this.next, this);
        }
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
        var board = this.board.board,
            chess1 = this.selectedChess1,
            chess2 = this.selectedChess2,
            callback = this.undoSwapAction,
            scope = this.undoSwapActionScope;

        this.parent.emit('undo-swap', chess1, chess2, board, this.parent);

        if (scope) {
            callback.call(scope, chess1, chess2, board, this.parent);
        } else {
            callback(chess1, chess2, board, this.parent);
        }

        // To next state when all completed
        var waitEvents = this.parent.waitEvents;
        if (waitEvents.noWaitEvent) {
            this.next();
        } else {
            waitEvents.setCompleteCallback(this.next, this);
        }
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
    selectChess1(chess) {
        this.selectedChess1 = chess;
        this.next();
        return this;
    }

    selectChess2(chess) {
        this.selectedChess2 = chess;
        this.next();
        return this;
    }
}

export default State;