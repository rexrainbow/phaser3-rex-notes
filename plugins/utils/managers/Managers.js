import Extend from './Extend';
import GetValue from '../object/GetValue.js';
import WaitMethods from './WaitMethods';

const EventEmitter = Phaser.Events.EventEmitter;

class Managers extends Extend(EventEmitter) {
    constructor(scene, config) {
        super();

        this.scene = scene;

        this.initManagers(scene, config);

        this.waitCompleteEventName = GetValue(config, 'completeEventName', 'complete');
        this.clickEE = GetValue(config, 'clickTarget', scene.input);
        this.targetCamera = GetValue(config, 'camera', scene.cameras.main);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.removeWaitEvents();

        super.destroy();

        this.destroyManagers(fromScene);

        this.scene = undefined;
    }
}

Object.assign(
    Managers.prototype,
    WaitMethods,
)

export default Managers;