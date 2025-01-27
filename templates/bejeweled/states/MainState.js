import BaseState from './BaseState.js';
import MatchState from './MatchState.js';
// Actions
import PlaceChess from '../actions/PlaceChess.js';
import SelectChess from '../actions/SelectChess.js';
import SwapChess from '../actions/SwapChess.js'
import IsPromise from '../../../plugins/utils/object/IsPromise.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class State extends BaseState {
    constructor(bejeweled, config) {
        super(bejeweled, config);
        // this.bejeweled = bejeweled;      // Bejeweled
        // this.board = bejeweled.board; // Bejeweled.board

        this.selectedChess1;
        this.selectedChess2;
        this.matchState = new MatchState(bejeweled, config); // sub-state

        // Actions
        this.placeAction = GetValue(config, 'placeAction', PlaceChess);
        // select1 action
        this.select1Action = GetValue(config, 'select1Action', SelectChess);
        // select2 action
        this.select2Action = GetValue(config, 'select2Action', this.select1Action);
        // Swap action
        this.swapAction = GetValue(config, 'swapAction', SwapChess);
        // UndoSwap action
        this.undoSwapAction = GetValue(config, 'undoSwapAction', this.swapAction);

        var debug = GetValue(config, 'debug', false);
        if (debug) {
            this.on('statechange', this.printState, this);
        }
    }

    shutdown() {
        super.shutdown();

        this.matchState.shutdown();

        this.matchState = undefined;
        this.selectedChess1 = undefined;
        this.selectedChess2 = undefined;
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
        var board = this.board;

        var done = false;
        while (!done) {
            board.reset(); // Refill chess
            done = board.preTest();
        }

        this.next();
    }
    next_RESET() {
        return 'PLACE';
    }
    // RESET

    // PLACE
    enter_PLACE() {
        var board = this.board.board,
            bejeweled = this.bejeweled;

        bejeweled.emit('place', board, bejeweled);

        var chessArray = this.board.getChessArray('lower');
        var result = this.placeAction(chessArray, board, bejeweled);
        if (IsPromise(result)) {
            bejeweled.waitEvent(bejeweled, 'place.complete');
            result
                .then(function () {
                    bejeweled.emit('place.complete');
                })
        }

        this.next();
    }
    next_PLACE() {
        return 'SELECT1START';
    }
    // PLACE

    // SELECT1START
    enter_SELECT1START() {
        this.selectedChess1 = undefined;
        this.selectedChess2 = undefined;

        this.bejeweled.emit('select1-start', this.board.board, this.bejeweled);
    }
    selectChess1(chess) {
        if (this.state === 'SELECT1START') {
            this.selectedChess1 = chess;
            this.next();
        }
        return this;
    }
    next_SELECT1START() {
        var nextState;
        if (this.selectedChess1) {
            nextState = 'SELECT1';
        }
        return nextState;
    }
    // SELECT1START

    // SELECT1
    enter_SELECT1() {
        var board = this.board.board,
            bejeweled = this.bejeweled,
            chess = this.selectedChess1;

        this.bejeweled.emit('select1', chess, board, bejeweled);

        var result = this.select1Action(chess, board, bejeweled);
        if (IsPromise(result)) {
            bejeweled.waitEvent(bejeweled, 'select1.complete');
            result
                .then(function () {
                    bejeweled.emit('select1.complete');
                })
        }

        // To next state when all completed
        this.next();
    }
    next_SELECT1() {
        return 'SELECT2START';
    }
    // SELECT1

    // SELECT2START
    enter_SELECT2START() {
        this.bejeweled.emit('select2-start', this.board.board, this.bejeweled);
    }
    selectChess2(chess) {
        if (this.state === 'SELECT2START') {
            this.selectedChess2 = chess;
            this.next();
        }
        return this;
    }
    next_SELECT2START() {
        var nextState;
        if (this.selectedChess2 &&
            this.board.board.areNeighbors(this.selectedChess1, this.selectedChess2)) {
            nextState = 'SELECT2';
        } else {
            nextState = 'SELECT1START';
        }
        return nextState;
    }
    // SELECT2START

    // SELECT2
    enter_SELECT2() {
        var board = this.board.board,
            bejeweled = this.bejeweled,
            chess = this.selectedChess2;

        this.bejeweled.emit('select2', chess, board, bejeweled);

        var result = this.select2Action(chess, board, bejeweled);
        if (IsPromise(result)) {
            bejeweled.waitEvent(bejeweled, 'select2.complete');
            result
                .then(function () {
                    bejeweled.emit('select2.complete');
                })
        }

        // To next state when all completed
        this.next();
    }
    next_SELECT2() {
        return 'SWAP';
    }
    // SELECT2

    // SWAP
    enter_SWAP() {
        var board = this.board.board,
            bejeweled = this.bejeweled,
            chess1 = this.selectedChess1,
            chess2 = this.selectedChess2;

        this.bejeweled.emit('swap', chess1, chess2, board, bejeweled);

        var result = this.swapAction(chess1, chess2, board, bejeweled);
        if (IsPromise(result)) {
            bejeweled.waitEvent(bejeweled, 'swap.complete');
            result
                .then(function () {
                    bejeweled.emit('swap.complete');
                })
        }

        // To next state when all completed
        this.next();
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
        } else if (this.board.preTest()) {
            nextState = 'SELECT1START';
        } else {
            nextState = 'RESET';
        }
        return nextState;
    }
    // MATCH3

    // UNDOSWAP
    enter_UNDOSWAP() {
        var board = this.board.board,
            bejeweled = this.bejeweled,
            chess1 = this.selectedChess1,
            chess2 = this.selectedChess2;

        this.bejeweled.emit('undo-swap', chess1, chess2, board, bejeweled);

        var result = this.undoSwapAction(chess1, chess2, board, bejeweled);
        if (IsPromise(result)) {
            bejeweled.waitEvent(bejeweled, 'undo-swap.complete');
            result
                .then(function () {
                    bejeweled.emit('undo-swap.complete');
                })
        }

        // To next state when all completed
        this.next();
    }
    next_UNDOSWAP() {
        return 'SELECT1START';
    }
    // UNDOSWAP

    // debug
    printState() {
        console.log('Main state: ' + this.prevState + ' -> ' + this.state);
    }

}

export default State;