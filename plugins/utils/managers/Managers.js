import Extend from './Extend';

const EventEmitter = Phaser.Events.EventEmitter;

class Managers extends Extend(EventEmitter) {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.completeEventName = 'complete';

        if (!config.hasOwnProperty('layers')) {
            config.layers = undefined;
        }

        super();

        this.scene = scene;

        this.initManagers(scene, config);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.destroyManagers(fromScene);

        this.scene = undefined;

        super.destroy();
    }
}

export default Managers;