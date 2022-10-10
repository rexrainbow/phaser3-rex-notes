import FSMBase from './FSMBase.js';
import GetValue from '../../utils/object/GetValue.js';

const StateProperties = ['next', 'exit', 'enter', 'update', 'preupdate', 'postupdate'];

class FSM extends FSMBase {
    /*
    var config = {
        start: 'A',   // default: undefined
        states: {
            A: {
                next: 'B',  // function() { return 'B'; }
                enter: function() {},
                exit: function() {},
                update: function(time, delta) {},
                preupdate: function(time, delta) {},
                postupdate: function(time, delta) {},
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

    destroy() {
        this.shutdown();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this._scene = GetValue(o, 'scene', undefined);
        return this;
    }

    get stateProperties() {
        return StateProperties;
    }

    update(time, delta) {
        this.runMethod('update', time, delta);
    }

    preupdate(time, delta) {
        this.runMethod('preupdate', time, delta);
    }

    postupdate(time, delta) {
        this.runMethod('postupdate', time, delta);
    }

    startUpdate(scene) {
        this.stopUpdate();
        if (!scene) {
            scene = this._scene;
        }
        this._scene = scene;
        scene.sys.events.on('update', this.update, this);
        return this;
    }

    stopUpdate() {
        if (!this._scene) {
            return this;
        }

        this._scene.sys.events.off('update', this.update, this);
        return this;
    }

    startPreUpdate(scene) {
        this.stopPreUpdate();
        if (!scene) {
            scene = this._scene;
        }
        this._scene = scene;
        scene.sys.events.on('preupdate', this.preupdate, this);
        return this;
    }

    stopPreUpdate() {
        if (!this._scene) {
            return this;
        }

        this._scene.sys.events.off('preupdate', this.preupdate, this);
        return this;
    }

    startPostUpdate(scene) {
        this.stopPostUpdate();
        if (!scene) {
            scene = this._scene;
        }
        this._scene = scene;
        scene.sys.events.on('postupdate', this.postupdate, this);
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