import FSMBase from './FSMBase';
import GetValue from '../../utils/object/GetValue';
import HasListener from '../../utils/eventemitter/HasListener';

const StateProperties = ['next', 'exit', 'enter', 'update', 'preupdate', 'postupdate'];

class FSM extends FSMBase {
    _scene: any;
    runMethod: any;

    /*
    var config = {
        start: 'A',   // default: undefined
        states: {
            A: {
                next: 'B',  // function() { return 'B'; }
                enter: function() {},
                exit: function() {},
                update: function(time?: any, delta?: any) {},
                preupdate: function(time?: any, delta?: any) {},
                postupdate: function(time?: any, delta?: any) {},
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
        scene: undefined,
        eventEmitter: true,
    };
    */
    shutdown() {
        this.stopUpdate();
        this.stopPreUpdate();
        this.stopPostUpdate();
        this._scene = undefined;

        super.shutdown();
    }

    resetFromJSON(o?: any) {
        super.resetFromJSON(o);
        this._scene = GetValue(o, 'scene', undefined);
        return this;
    }

    get stateProperties() {
        return StateProperties;
    }

    update(time?: any, delta?: any) {
        this.runMethod('update', time, delta);
    }

    preupdate(time?: any, delta?: any) {
        this.runMethod('preupdate', time, delta);
    }

    postupdate(time?: any, delta?: any) {
        this.runMethod('postupdate', time, delta);
    }

    startUpdate(scene?: any) {
        if (!scene) {
            scene = this._scene;
        }

        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'update', this.update, this)) {
            return this;
        }

        this._scene = scene;
        eventEmitter.on('update', this.update, this);
        return this;
    }

    stopUpdate() {
        if (!this._scene) {
            return this;
        }

        this._scene.sys.events.off('update', this.update, this);
        return this;
    }

    startPreUpdate(scene?: any) {
        if (!scene) {
            scene = this._scene;
        }

        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'preupdate', this.preupdate, this)) {
            return this;
        }

        this._scene = scene;
        eventEmitter.on('preupdate', this.preupdate, this);
        return this;
    }

    stopPreUpdate() {
        if (!this._scene) {
            return this;
        }

        this._scene.sys.events.off('preupdate', this.preupdate, this);
        return this;
    }

    startPostUpdate(scene?: any) {
        if (!scene) {
            scene = this._scene;
        }

        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'postupdate', this.postupdate, this)) {
            return this;
        }

        this._scene = scene;
        eventEmitter.on('postupdate', this.postupdate, this);
        return this;
    }

    stopPostUpdate() {
        if (!this._scene) {
            return this;
        }

        this._scene.sys.events.off('postupdate', this.postupdate, this);
        return this;
    }
}

export default FSM;