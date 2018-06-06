'use strict'

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class FSM extends EE {
    constructor(config) {
        super();
        this.setEnable(GetValue(config, 'enable', true))
        this.start(GetValue(config, 'start', undefined));
        var states = GetValue(config, 'states', undefined);
        if (states) {
            this.addStates(states);
        }
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }
        this.enable = e;
    }

    set state(newState) {
        if (!this.enable) {
            return;
        }
        if (this._state === newState) {
            return;
        }
        this._prevState = this._state;
        this._state = newState;
        this.enable = false;
        this.emit('exit_' + this._prevState, this);
        this.enable = true;
        this.emit('enter_' + this._state, this);
        this.emit('statechange', this);
    }

    get state() {
        return this._state;
    }

    get prevState() {
        return this._prevState;
    }

    start(state) {
        this._prevState = undefined;
        this._state = state; // won't fire statechange events
    }

    next() {
        var nextState;
        var getNextState = this['next_' + this.state];
        if (getNextState) {
            if (typeof (getNextState) === 'string') {
                nextState = getNextState;
            } else {
                nextState = getNextState.call(this);
            }
        }

        if (nextState != null) {
            this.state = nextState;
        }
    }

    addState(name, config) {
        var getNextState = GetValue(config, 'next', undefined);
        if (getNextState) {
            this['next_' + name] = getNextState;
        }

        var scope = GetValue(config, 'scope', this);
        var exitCallback = GetValue(config, 'exit', undefined);
        if (exitCallback) {
            var exitScope = GetValue(config, 'exitScope', scope);
            this.on('exit_' + name, exitCallback, exitScope);
        }
        var enterCallback = GetValue(config, 'enter', undefined);
        if (enterCallback) {
            var enterScope = GetValue(config, 'enterScope', scope);
            this.on('enter_' + name, enterCallback, enterScope);
        }
    }

    addStates(states) {
        for (var name in states) {
            this.addState(name, states[name]);
        }
    }
}
export default FSM;