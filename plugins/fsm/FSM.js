'use strict'

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class FSM extends EE {
    constructor(config) {
        super();

        // attach get-next-state logic
        var states = GetValue(config, 'states', undefined);
        if (states) {
            this.addStates(states);
        }

        this.isStateChanging = false;
        this.resetFromJSON(config);

        // attach init function
        var init = GetValue(config, 'init', undefined);
        if (init !== undefined) {
            this.init = init;
        }

        if (this.init) {
            this.init.call(this);
        }
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, 'enable', true));
        this.start(GetValue(o, 'start', undefined));
        return this;
    }

    toJSON() {
        return {
            curState: this.state,
            prevState: this.prevState,

            enable: this.enable,
            start: this._start
        };
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    set state(newState) {
        if (!this.enable || this.isStateChanging) {
            return;
        }
        if (this._state === newState) {
            return;
        }
        this._prevState = this._state;
        this._state = newState;

        this.isStateChanging = true;

        this.emit('statechange', this);

        if (this._prevState != null) {
            var exitEventName = 'exit_' + this._prevState;
            var exitCallback = this[exitEventName];
            if (exitCallback) {
                exitCallback.call(this);
            }
            this.emit(exitEventName, this);
        }

        this.isStateChanging = false;

        if (this._state != null) {
            var enterEventName = 'enter_' + this._state;
            var enterCallback = this[enterEventName];
            if (enterCallback) {
                enterCallback.call(this);
            }
            this.emit(enterEventName, this);
        }
    }

    get state() {
        return this._state;
    }

    get prevState() {
        return this._prevState;
    }

    start(state) {
        this._start = state;
        this._prevState = undefined;
        this._state = state; // won't fire statechange events
        return this;
    }

    goto(nextState) {
        this.state = nextState;
        return this;
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
        return this;
    }

    addState(name, config) {
        var getNextStateCallback = GetValue(config, 'next', undefined);
        if (getNextStateCallback) {
            this['next_' + name] = getNextStateCallback;
        }

        var exitCallback = GetValue(config, 'exit', undefined);
        if (exitCallback) {
            this['exit_' + name] = exitCallback;
        }

        var enterCallback = GetValue(config, 'enter', undefined);
        if (enterCallback) {
            this['enter_' + name] = enterCallback;
        }
        return this;
    }

    addStates(states) {
        for (var name in states) {
            this.addState(name, states[name]);
        }
        return this;
    }
}
export default FSM;