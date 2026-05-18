import StateManagerBase from './StateManagerBase';
import GetValue from '../../utils/object/GetValue';
import HasListener from '../../utils/eventemitter/HasListener';

class StateManager extends StateManagerBase {
    _scene: any;
    runMethod: any;
    stopPreUpdate: any;

    constructor(config?: any) {
        super(config);

        this._scene = GetValue(config, 'scene', undefined);
    }

    shutdown() {
        this.stopUpdate();
        this.stopPreUpdate();
        this.stopPostUpdate();
        this._scene = undefined;

        super.shutdown();
    }

    getScene() {
        return this._scene;
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

    stopOreUpdate() {
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

export default StateManager;