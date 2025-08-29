import BaseState from './BaseState.js';
// Actions
import Eliminate from '../actions/Eliminate.js';
import MovingAllPieces from '../actions/Move.js';
import IsPromise from '../../../plugins/utils/object/IsPromise.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const SetStruct = Phaser.Structs.Set;

class State extends BaseState {
    constructor(bejeweled, config) {
        super(bejeweled, config);
        // this.bejeweled = bejeweled;                // Bejeweled
        // this.boardWrapper = bejeweled.boardWrapper;// Bejeweled.boardWrapper

        this.totalMatchedLinesCount = 0;
        this.eliminatedPieceArray;
        this.continueFilling = false;

        // Actions
        // Eliminating action
        this.eliminatingAction = GetValue(config, 'eliminatingAction', Eliminate);
        // On moving pieces
        this.movingAction = GetValue(config, 'movingAction', MovingAllPieces);

        var debug = GetValue(config, 'debug', false);
        if (debug) {
            this.on('statechange', this.printState, this);
        }
    }

    shutdown() {
        super.shutdown();

        this.eliminatedPieceArray = undefined;
        // Actions
        this.eliminatingAction = undefined;
        this.movingAction = undefined;
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    // START
    enter_START() {
        this.totalMatchedLinesCount = 0;

        this.bejeweled.emit('match-start', this.boardWrapper.board, this.bejeweled);

        this.next();
    }
    next_START() {
        return 'MATCH3';
    }
    // START

    // MATCH3
    enter_MATCH3() {
        var matchedLines = this.boardWrapper.getAllMatch();

        this.bejeweled.emit('match', matchedLines, this.boardWrapper.board, this.bejeweled);

        var matchedLinesCount = matchedLines.length;
        this.totalMatchedLinesCount += matchedLinesCount;
        switch (matchedLinesCount) {
            case 0:
                this.eliminatedPieceArray = [];
                break;
            case 1:
                this.eliminatedPieceArray = matchedLines[0].entries;
                break;
            default:
                // Put all chess to a set
                var newSet = new SetStruct();
                for (var i = 0; i < matchedLinesCount; i++) {
                    matchedLines[i].entries.forEach(function (value) {
                        newSet.set(value);
                    });
                }
                this.eliminatedPieceArray = newSet.entries;
                break;
        }
        this.next();
    }
    next_MATCH3() {
        var nextState;
        if (this.eliminatedPieceArray.length === 0) {
            nextState = 'END'
        } else {
            nextState = 'ELIMINATING';
        }
        return nextState;
    }
    // MATCH3

    // ELIMINATING
    enter_ELIMINATING() {
        var board = this.boardWrapper.board,
            bejeweled = this.bejeweled,
            chessArray = this.eliminatedPieceArray;

        this.bejeweled.emit('eliminate', chessArray, board, bejeweled);

        var result = this.eliminatingAction(chessArray, board, bejeweled);
        if (IsPromise(result)) {
            bejeweled.waitEvent(bejeweled, 'eliminate.complete');
            result
                .then(function () {
                    bejeweled.emit('eliminate.complete');
                })
        }

        // Remove eliminated chess
        chessArray.forEach(board.removeChess, board);

        // To next state when all completed
        this.next();
    }
    next_ELIMINATING() {
        return 'FILLSTART';
    }
    exit_ELIMINATING() {
        this.eliminatedPieceArray = undefined;
    }
    // ELIMINATING

    // FILLSTART
    enter_FILLSTART() {
        var board = this.boardWrapper.board,
            bejeweled = this.bejeweled;
        this.bejeweled.emit('fill.start', board, bejeweled);
        this.next();
    }
    next_FILLSTART() {
        return 'MOVING';
    }
    // FILLSTART

    // MOVING
    enter_MOVING() {
        var board = this.boardWrapper.board,
            bejeweled = this.bejeweled;
        var movingDirection = this.boardWrapper.movingDirection;

        this.bejeweled.emit('move', board, bejeweled);

        var result = this.movingAction(movingDirection, board, bejeweled);
        if (IsPromise(result)) {
            bejeweled.waitEvent(bejeweled, 'move.complete');
            result
                .then(function () {
                    bejeweled.emit('move.complete');
                })
        }

        this.continueFilling = !this.waitEvents.noWaitEvent;

        // To next state when all completed
        this.next();
    }
    next_MOVING() {
        return (this.continueFilling) ? 'PREPARE' : 'FILLEND';
    }
    // MOVING

    // PREPARE
    enter_PREPARE() {
        var board = this.boardWrapper.board,
            bejeweled = this.bejeweled;
        var movingDirection = this.boardWrapper.movingDirection;

        this.continueFilling = this.boardWrapper.fillPrepareRows();

        this.bejeweled.emit('prepare', this.boardWrapper.board, this.bejeweled);

        this.next();
    }
    next_PREPARE() {
        return (this.continueFilling) ? 'MOVING' : 'FILLEND';
    }
    // PREPARE

    // FILLEND
    enter_FILLEND() {
        var board = this.boardWrapper.board,
            bejeweled = this.bejeweled;
        this.bejeweled.emit('fill.end', board, bejeweled);
        this.next();
    }
    next_FILLEND() {
        return 'MATCH3';
    }
    // FILLEND


    // END
    enter_END() {
        this.bejeweled.emit('match-end', this.boardWrapper.board, this.bejeweled);

        this.emit('complete');
    }
    // END

    printState() {
        console.log('Match state: ' + this.prevState + ' -> ' + this.state);
    }
}
export default State;