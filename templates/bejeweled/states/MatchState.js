import FSM from 'rexPlugins/fsm.js';

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
        // on matched lines
        this.onMatchLinesCallback = GetValue(config, 'onMatchLinesCallback', undefined);
        this.onMatchLinesCallbackScope = GetValue(config, 'onMatchLinesCallbackScope', undefined);
        // on eliminating chess
        this.onEliminatingChessCallback = GetValue(config, 'onEliminatingChessCallback', undefined);
        this.onEliminatingChessCallbackScope = GetValue(config, 'onEliminatingChessCallbackScope', undefined);
        // on falling chess
        this.onFallingChessCallback = GetValue(config, 'onFallingChessCallback', undefined);
        this.onFallingChessCallbackScope = GetValue(config, 'onFallingChessCallback', undefined);

        var debug = GetValue(config, 'debug', false);
        if (debug) {
            this.on('statechange', this.printState, this);
        }
    }

    // START
    enter_START() {
        this.totalMatchedLinesCount = 0;
        this.next()
    }
    next_START() {
        return 'MATCH3';
    }
    // START

    // MATCH3
    enter_MATCH3() {
        var matchedLines = this.board.getAllMatch();
        this.totalMatchedLinesCount += matchedLines.length;
        // callback
        var eliminatedLines;
        var callback = this.onMatchLinesCallback,
            scope = this.onMatchLinesCallbackScope;
        if (callback) {
            var board = this.board.board;
            if (scope) {
                eliminatedLines = callback.call(scope, matchedLines, board);
            } else {
                eliminatedLines = callback(matchedLines, board);
            }
            // add or remove more eliminated chess
        }
        if (eliminatedLines === undefined) {
            eliminatedLines = matchedLines;
        }
        // Put all chess to a set
        var newSet = new SetStruct();
        for (var i = 0, cnt = eliminatedLines.length; i < cnt; i++) {
            eliminatedLines[i].entries.forEach(function (value) {
                newSet.set(value);
            });
        }
        this.eliminatedChessArray = newSet.entries;
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
        // callback
        var task;
        var chessArray = this.eliminatedChessArray,
            callback = this.onEliminatingChessCallback,
            scope = this.onEliminatingChessCallbackScope;
        if (callback) {
            var board = this.board.board;
            if (scope) {
                task = callback.call(scope, chessArray, board);
            } else {
                task = callback(chessArray, board);
            }
        }
        // remove eliminated chess
        var board = this.board.board;
        chessArray.forEach(board.removeChess, board);
        // run eliminating task
        if (task) {
            // custom eliminating task, wait for 'complete' event
            task.once('complete', this.next, this);
        } else {
            // default eliminating task
            this.board.eliminateChess(chessArray, this.next, this);
        }
    }
    next_ELIMINATING() {
        return 'FALLING';
    }
    exit_ELIMINATING() {
        this.eliminatedChessArray.length = 0;
    }
    // ELIMINATING

    // FALLING
    enter_FALLING() {
        // callback
        var task;
        var callback = this.onFallingChessCallback,
            scope = this.onFallingChessCallbackScope;
        if (callback) {
            var board = this.board.board;
            if (scope) {
                task = callback.call(scope, board);
            } else {
                task = callback(board);
            }
        }
        // run falling task
        if (task) {
            // custom falling task, wait for 'complete' event
            task.once('complete', this.next, this);
        } else {
            // default falling task
            this.board.falling(this.next, this);
        }
    }
    next_FALLING() {
        return 'FILL';
    }
    // FALLING

    // FILL
    enter_FILL() {
        this.board.fill();
        this.next();
    }
    next_FILL() {
        return 'MATCH3';
    }
    // FILL

    // END
    enter_END() {
        this.emit('complete');
    }
    // END

    printState() {
        console.log('Match state: ' + this.prevState + ' -> ' + this.state);
    }
}
export default State;