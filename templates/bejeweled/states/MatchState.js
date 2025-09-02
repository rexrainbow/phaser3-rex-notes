import BaseState from './BaseState.js';
// Actions
import EliminateChess from '../actions/EliminateChess.js';
import FallingAllChess from '../actions/FallingAllChess.js';
import IsPromise from '../../../plugins/utils/object/IsPromise.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const SetStruct = Phaser.Structs.Set;

class State extends BaseState {
    constructor(bejeweled, config) {
        super(bejeweled, config);
        // this.bejeweled = bejeweled;                // Bejeweled
        // this.boardWrapper = bejeweled.boardWrapper;// Bejeweled.boardWrapper

        this.totalMatchedLinesCount = 0;
        this.eliminatedPieceArray = undefined;

        // Actions
        // Eliminating action
        this.eliminatingAction = GetValue(config, 'eliminatingAction', EliminateChess);
        // on falling chess
        this.fallingAction = GetValue(config, 'fallingAction', FallingAllChess);

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
        this.fallingAction = undefined;
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setEliminatedPieces(pieces) {
        if (Array.isArray(pieces)) {
            pieces = [...new Set(pieces)];
        }
        this.eliminatedPieceArray = pieces;
        return this;
    }

    getEliminatedPieces() {
        return this.eliminatedPieceArray;
    }

    // START
    enter_START() {
        this.totalMatchedLinesCount = 0;

        this.bejeweled.emit('match-start', this.boardWrapper.board, this.bejeweled);

        this.next();
    }
    next_START() {
        var pieces = this.getEliminatedPieces();
        return (!pieces) ? 'MATCH3' : 'ELIMINATING';
    }
    // START

    // MATCH3
    enter_MATCH3() {
        var matchedLines = this.boardWrapper.getAllMatch();

        this.bejeweled.emit('match', matchedLines, this.boardWrapper.board, this.bejeweled);

        var matchedLinesCount = matchedLines.length;
        this.totalMatchedLinesCount += matchedLinesCount;
        var pieces;
        switch (matchedLinesCount) {
            case 0:
                pieces = [];
                break;
            case 1:
                pieces = matchedLines[0].entries;
                break;
            default:
                pieces = [];
                for (var i = 0; i < matchedLinesCount; i++) {
                    pieces.push(...matchedLines[i].entries);
                }
                break;
        }

        this.setEliminatedPieces(pieces);
        this.next();
    }
    next_MATCH3() {
        var nextState;
        var pieces = this.getEliminatedPieces();
        if (pieces && (pieces.length === 0)) {
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
            pieces = this.getEliminatedPieces();

        this.bejeweled.emit('eliminate', pieces, board, bejeweled);

        var result = this.eliminatingAction(pieces, board, bejeweled);
        if (IsPromise(result)) {
            bejeweled.waitEvent(bejeweled, 'eliminate.complete');
            result
                .then(function () {
                    bejeweled.emit('eliminate.complete');
                })
        }

        // Remove eliminated chess
        pieces.forEach(board.removeChess, board);

        // To next state when all completed
        this.next();
    }
    next_ELIMINATING() {
        return 'FALLING';
    }
    exit_ELIMINATING() {
        this.setEliminatedPieces();
    }
    // ELIMINATING

    // FALLING
    enter_FALLING() {
        var board = this.boardWrapper.board,
            bejeweled = this.bejeweled;

        this.bejeweled.emit('fall', board, bejeweled);

        var result = this.fallingAction(board, bejeweled);
        if (IsPromise(result)) {
            bejeweled.waitEvent(bejeweled, 'fall.complete');
            result
                .then(function () {
                    bejeweled.emit('fall.complete');
                })
        }

        // To next state when all completed
        this.next();
    }
    next_FALLING() {
        return 'FILL';
    }
    // FALLING

    // FILL
    enter_FILL() {
        this.boardWrapper.fillPrepareRows();

        this.bejeweled.emit('fill', this.boardWrapper.board, this.bejeweled);

        this.next();
    }
    next_FILL() {
        return 'MATCH3';
    }
    // FILL

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