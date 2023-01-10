import Extend from './Extend';

const EventEmitter = Phaser.Events.EventEmitter;

class Managers extends Extend(EventEmitter) {
    constructor(scene, config) {
        super();

        this.scene = scene;

        this.initManagers(scene, config);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        ClearEvents(this);

        super.destroy();

        this.destroyManagers(fromScene);

        this.scene = undefined;
    }
}

export default Managers;