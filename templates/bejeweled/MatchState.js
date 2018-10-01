import FSM from 'rexPlugins/fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;

        var debug = GetValue(config, 'debug', false);
        if (debug) {
            this.on('statechange', this.printState, this);
        }
    }

    // START
    next_START() {
        return 'MATCH3';
    }

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

    // ELIMINATION
    next_ELIMINATION() {
        return 'FALL';
    }

    // FALL
    next_FALL() {
        return 'FILL';
    }

    // FILL
    next_FILL() {
        return 'MATCH3';
    }

    // END


    printState() {
        console.log('Match state: ' + this.prevState + ' -> ' + this.state);
    }
}
export default State;