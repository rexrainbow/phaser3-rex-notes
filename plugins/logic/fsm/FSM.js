import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';

class FSM {
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
        extend: {
            i: 0,
            name: 'abc'
            // ...
        },
        init: function() {},
        enable: true,
        eventEmitter: true,
    };
    */
    constructor(config) {
        // Attach get-next-state function
        var states = GetValue(config, 'states', undefined);
        if (states) {
            this.addStates(states);
        }

        // Attach extend members
        var extend = GetValue(config, 'extend', undefined);
        if (extend) {
            for (var name in extend) {
                if (!this.hasOwnProperty(name) || this[name] === undefined) {
                    this[name] = extend[name];
                }
            }
        }

        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this._stateLock = false;
        this.resetFromJSON(config);
    }

    shutdown() {
        this.destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, 'enable', true));
        this.start(GetValue(o, 'start', undefined));
        var init = GetValue(o, 'init', undefined);
        if (init) {
            init.call(this);
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
        this._state = state; // Won't fire statechange events
        return this;
    }

    goto(nextState) {
        if (nextState != null) {
            this.state = nextState;
        }
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

        this.goto(nextState);
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

    update(time, delta, key) {
        if (key === undefined) {
            key = 'update';
        }
        var fn = this[key + '_' + this.state];
        if (fn) {
            fn.call(this, time, delta);
        }
    }

    preupdate(time, delta) {
        this.update(time, delta, 'preupdate');
    }

    postupdate(time, delta) {
        this.update(time, delta, 'postupdate');
    }
}

Object.assign(
    FSM.prototype,
    EventEmitterMethods
);

export default FSM;