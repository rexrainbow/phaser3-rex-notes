import FSM from 'rexPlugins/fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;
        this.matchedLines = 0;

        var debug = GetValue(config, 'debug', false);
        if (debug) {
            this.on('statechange', this.printState, this);
        }
    }

    // START
    enter_START() {
        this.matchedLines = 0;
    }
    next_START() {
        return 'MATCH3';
    }
    // START

    // MATCH3
    next_MATCH3() {
        var nextState;
        if (matchedCnt === 0) {
            nextState = 'END'
        } else {
            nextState = 'ELIMINATION';
        }
        return nextState;
    }
    // MATCH3

    // ELIMINATION
    next_ELIMINATION() {
        return 'FALL';
    }
    // ELIMINATION

    // FALL
    next_FALL() {
        return 'FILL';
    }
    // FALL

    // FILL
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