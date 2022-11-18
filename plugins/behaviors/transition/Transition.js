import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import NOOP from '../../utils/object/NOOP.js';
import State from './State.js';
import PostUpdateDelayCall from '../../utils/time/PostUpdateDelayCall.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Transition extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;
        // this.scene

        this.setTransitInTime(GetValue(config, 'duration.in', 200));
        this.setTransitOutTime(GetValue(config, 'duration.out', 200));
        this.setTransitInCallback(GetValue(config, 'transitIn'));
        this.setTransitOutCallback(GetValue(config, 'transitOut'));
        this.destroyParent = GetValue(config, 'destroy', true);

        this.delayCallTimer = undefined;
        this._state = new State(this, { eventEmitter: false });
        this.closeEventData = undefined;        
    }

    start() {
        this._state.next();
    }

    get state() {
        return this._state.state;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.transitInCallback = undefined;
        this.transitOutCallback = undefined;
        this.closeEventData = undefined;

        this.removeDelayCall();

        super.shutdown(fromScene);
    }

    transitionIn() {
        var duration = this.transitInTime;
        this.transitInCallback(this.parent, duration);
        return this;
    }

    transitionOut() {
        var duration = this.transitOutTime;
        this.transitOutCallback(this.parent, duration);
        return this;
    }

    onOpen() {
    }

    onClose() {
        if (this.destroyParent) {
            this.parent.destroy();
            // Will invoke `this.destroy()`
        } else {
            this.destroy();
        }
    }

    delayCall(delay, callback, scope) {
        // Invoke callback under scene's 'postupdate' event
        this.delayCallTimer = PostUpdateDelayCall(this, delay, callback, scope);
        return this;
    }

    removeDelayCall() {
        if (this.delayCallTimer) {
            this.delayCallTimer.remove(false);
            this.delayCallTimer = undefined;
        }
        return this;
    }

    setTransitInTime(time) {
        this.transitInTime = time;
        return this;
    }

    setTransitOutTime(time) {
        this.transitOutTime = time;
        return this;
    }

    setTransitInCallback(callback) {
        if (!callback) {
            callback = NOOP;
        }

        this.transitInCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    }

    setTransitOutCallback(callback) {
        if (!callback) {
            callback = NOOP;
        }

        this.transitOutCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    }

    requestClose(closeEventData) {
        // Only can close modal in OPEN state
        if (this._state.state === 'OPEN') {
            this.closeEventData = (arguments.length > 0) ? closeEventData : this.parent;
            this._state.next(); // OPEN -> TRANS_CLOSE 
        }
        return this;
    }
}

export default Transition;