import FSM from '../../../plugins/fsm.js';
import EliminateChess from '../board/EliminateChess.js';
import FallingAllChess from '../board/FallingAllChess.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const SetStruct = Phaser.Structs.Set;

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent; // Bejeweled
        this.scene = parent.scene; // Bejeweled.scene
        this.board = parent.board; // Bejeweled.board
        this.totalMatchedLinesCount = 0;
        this.eliminatedChessArray;

        // callbacks
        // Eliminating action
        this.eliminatingAction = GetValue(config, 'eliminatingAction', EliminateChess);
        this.eliminatingActionScope = GetValue(config, 'eliminatingActionScope', undefined);
        // on falling chess
        this.fallingAction = GetValue(config, 'fallingAction', FallingAllChess);
        this.fallingActionScope = GetValue(config, 'fallingActionScope', undefined);

        var debug = GetValue(config, 'debug', false);
        if (debug) {
            this.on('statechange', this.printState, this);
        }
    }

    shutdown() {
        super.shutdown();

        this.parent = undefined;
        this.scene = undefined;
        this.board = undefined;

        this.eliminatedChessArray = undefined;
        // Actions
        this.eliminatingAction = undefined;
        this.eliminatingActionScope = undefined;
        this.fallingAction = undefined;
        this.fallingActionScope = undefined;
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    // START
    enter_START() {
        this.totalMatchedLinesCount = 0;

        this.parent.emit('match-start', this.board.board, this.parent);

        this.next();
    }
    next_START() {
        return 'MATCH3';
    }
    // START

    // MATCH3
    enter_MATCH3() {
        var matchedLines = this.board.getAllMatch();

        var board = this.board.board;
        this.parent.emit('match', matchedLines, this.board.board, this.parent);

        var matchedLinesCount = matchedLines.length;
        this.totalMatchedLinesCount += matchedLinesCount;
        switch (matchedLinesCount) {
            case 0:
                this.eliminatedChessArray = [];
                break;
            case 1:
                this.eliminatedChessArray = matchedLines[0].entries;
                break;
            default:
                // Put all chess to a set
                var newSet = new SetStruct();
                for (var i = 0; i < matchedLinesCount; i++) {
                    matchedLines[i].entries.forEach(function (value) {
                        newSet.set(value);
                    });
                }
                this.eliminatedChessArray = newSet.entries;
                break;
        }
        this.next();
    }
    next_MATCH3() {
        var nextState;
        if (this.eliminatedChessArray.length === 0) {
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
            chessArray = this.eliminatedChessArray,
            callback = this.eliminatingAction,
            scope = this.eliminatingActionScope;

        this.parent.emit('eliminate', chessArray, board, this.parent);

        if (scope) {
            callback.call(scope, chessArray, board, this.parent);
        } else {
            callback(chessArray, board, this.parent);
        }

        // Remove eliminated chess
        chessArray.forEach(board.removeChess, board);

        // To next state when all completed
        var waitEvents = this.parent.waitEvents;
        if (waitEvents.noWaitEvent) {
            this.next();
        } else {
            waitEvents.setCompleteCallback(this.next, this);
        }
    }
    next_ELIMINATING() {
        return 'FALLING';
    }
    exit_ELIMINATING() {
        this.eliminatedChessArray = undefined;
    }
    // ELIMINATING

    // FALLING
    enter_FALLING() {
        var board = this.board.board,
            callback = this.fallingAction,
            scope = this.fallingActionScope;

        this.parent.emit('fall', board, this.parent);

        if (scope) {
            callback.call(scope, board, this.parent);
        } else {
            callback(board, this.parent);
        }

        // To next state when all completed
        var waitEvents = this.parent.waitEvents;
        if (waitEvents.noWaitEvent) {
            this.next();
        } else {
            waitEvents.setCompleteCallback(this.next, this);
        }
    }
    next_FALLING() {
        return 'FILL';
    }
    // FALLING

    // FILL
    enter_FILL() {
        this.board.fill();

        this.parent.emit('fill', this.board.board, this.parent);

        this.next();
    }
    next_FILL() {
        return 'MATCH3';
    }
    // FILL

    // END
    enter_END() {
        this.parent.emit('match-end', this.board.board, this.parent);

        this.emit('complete');
    }
    // END

    printState() {
        console.log('Match state: ' + this.prevState + ' -> ' + this.state);
    }
}
export default State;