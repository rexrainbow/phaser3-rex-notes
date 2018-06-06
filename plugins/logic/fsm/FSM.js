'use strict'

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class FSM extends EE {
    /*
    var config = {
        start: 'A',   // default: undefined
        states: {
            A: {
                next: 'B',  // function() { return 'B'; }
                enter: function() {},
                exit: function() {}
            },
            // ...
        },        
        init: function() {},
        extend: {
            i: 0,
            name: 'abc'
            // ...
        },
        enable: true
    };
    */
    constructor(config) {
        super();

        // attach get-next-state function
        if (config && config.hasOwnProperty('states')) {
            this.addStates(config.states);
        }

        // attach init function
        if (config && config.hasOwnProperty('init')) {
            this.init = config.init;
        }

        // attach extend members
        if (config && config.hasOwnProperty('extend')) {
            var extendMembers = config.extend;
            for (var name in extendMembers) {
                if (!this.hasOwnProperty(name) || this[name] === undefined) {
                    this[name] = extendMembers[name];
                }
            }
        }

        this._stateLock = false;
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, 'enable', true));
        this.start(GetValue(o, 'start', undefined));
        if (this.init) {
            this.init.call(this);
        }
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
        if (!this.enable || this._stateLock) {
            return;
        }
        if (this._state === newState) {
            return;
        }
        this._prevState = this._state;
        this._state = newState;

        this._stateLock = true; // lock state

        this.emit('statechange', this);

        if (this._prevState != null) {
            var exitEventName = 'exit_' + this._prevState;
            var exitCallback = this[exitEventName];
            if (exitCallback) {
                exitCallback.call(this);
            }
            this.emit(exitEventName, this);
        }

        this._stateLock = false;

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