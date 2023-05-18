import Extend from './Extend';
import WaitEventManager from './WaitEventManager.js';

const EventEmitter = Phaser.Events.EventEmitter;

class Managers extends Extend(EventEmitter) {
    constructor(scene, config) {
        super();

        this.scene = scene;

        this.initManagers(scene, config);

        // TODO: Merge WaitEventManager into Extend
        this.waitEventManager = new WaitEventManager(this, config);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.waitEventManager.removeWaitEvents();

        this.destroyManagers(fromScene);

        this.scene = undefined;
        
        super.destroy();
    }
}

export default Managers;