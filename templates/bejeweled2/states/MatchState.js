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
        // this.bejeweled = bejeweled;            // Bejeweled
        // this.board = bejeweled.board;       // Bejeweled.board

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

        this.bejeweled.emit('match-start', this.board.board, this.bejeweled);

        this.next();
    }
    next_START() {
        return 'MATCH3';
    }
    // START

    // MATCH3
    enter_MATCH3() {
        var matchedLines = this.board.getAllMatch();

        this.bejeweled.emit('match', matchedLines, this.board.board, this.bejeweled);

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
        var board = this.board.board,
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
        return 'MOVING';
    }
    exit_ELIMINATING() {
        this.eliminatedPieceArray = undefined;
    }
    // ELIMINATING

    // MOVING
    enter_MOVING() {
        var board = this.board.board,
            bejeweled = this.bejeweled;
        var directionFlags = this.board.fallingDirectionFlags;

        if (this.prevState === 'ELIMINATING') {
            this.bejeweled.emit('fill.start', board, bejeweled);
        }

        this.bejeweled.emit('move', board, bejeweled);

        var result = this.movingAction(directionFlags, board, bejeweled);
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
        return (this.continueFilling) ? 'FILL' : 'MATCH3';
    }
    // MOVING

    // FILL
    enter_FILL() {
        var board = this.board.board,
            bejeweled = this.bejeweled;
        var directionFlags = this.board.fallingDirectionFlags;

        this.continueFilling = this.board.fillPrepareRows();

        this.bejeweled.emit('fill', this.board.board, this.bejeweled);

        this.next();
    }
    next_FILL() {
        return (this.continueFilling) ? 'MOVING' : 'MATCH3';
    }
    // FILL

    // END
    enter_END() {
        this.bejeweled.emit('match-end', this.board.board, this.bejeweled);

        this.emit('complete');
    }
    // END

    printState() {
        console.log('Match state: ' + this.prevState + ' -> ' + this.state);
    }
}
export default State;